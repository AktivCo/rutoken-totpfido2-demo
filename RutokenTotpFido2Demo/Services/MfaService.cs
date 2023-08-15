using Fido2NetLib.Objects;
using Fido2NetLib;
using Microsoft.EntityFrameworkCore;
using RutokenTotpFido2Demo.Entities;
using RutokenTotpFido2Demo.Models;
using System.Security.Cryptography;
using static Fido2NetLib.Fido2;
using Microsoft.IdentityModel.Tokens;
using RutokenTotpFido2Demo.Exceptions;
using RutokenTotpFido2Demo.Extensions;

namespace RutokenTotpFido2Demo.Services;

public class MfaService
{
    private readonly EfDbContext _context;
    private readonly Fido2Configuration _config;
    private readonly IMetadataService? _metadataService;

    public MfaService(EfDbContext context, Fido2Configuration config, IMetadataService? metadataService = null)
    {
        _context = context;
        _config = config;
        _metadataService = metadataService;
    }


    public string MakeCredentialOptions(int userId, bool isPasswordLess)
    {
        var user = _context.Users.FirstOrDefault(usr => usr.Id == userId);

        if (user == null)
            throw new RTFDException("Пользователь не найден");

        var fidoUser = new Fido2User
            { Id = BitConverter.GetBytes(user.Id), DisplayName = user.UserName, Name = user.UserName };

        var existingKeys = GetCredentialsByUser(user)
            .Select(c => new PublicKeyCredentialDescriptor(c.CredentialId.HexStringToByteArray()))
            .ToList();

        var attestation = new AttestationResponse();

        var authenticatorSelection = new AuthenticatorSelection
        {
            RequireResidentKey = isPasswordLess,
            UserVerification =
                isPasswordLess ? 
                    UserVerificationRequirement.Required : 
                    UserVerificationRequirement.Preferred
        };

        if (!string.IsNullOrEmpty(attestation.AuthType))
            authenticatorSelection.AuthenticatorAttachment = attestation.AuthType.ToEnum<AuthenticatorAttachment>();

        var exts = new AuthenticationExtensionsClientInputs()
        {
            Extensions = true,
            UserVerificationMethod = true,
        };

        var options = RequestNewCredential(fidoUser, existingKeys, authenticatorSelection,
            attestation.AttType.ToEnum<AttestationConveyancePreference>(), exts);

        return options.ToJson();
    }

    public async Task<CredentialMakeResult> MakeCredential(int userId, LabelData labelData, string? jsonOptions,
        CancellationToken cancellationToken)
    {
        var options = CredentialCreateOptions.FromJson(jsonOptions);

        IsCredentialIdUniqueToUserAsyncDelegate callback = async (args, cancellationToken) =>
        {
            return await GetUsersByCredentialIdAsync(args.CredentialId);
        };

        var success = await MakeNewCredentialAsync(labelData.AttestationResponse, options, callback,
            cancellationToken: cancellationToken);

        var credentialId = AddCredentialToUser(new FidoKey
        {
            UserId = userId,
            CredentialId = success?.Result.CredentialId.ByteArrayToHexString(),
            PublicKey = success?.Result.PublicKey.ByteArrayToHexString(),
            SignatureCounter = success.Result.Counter,
            RegDate = DateTime.UtcNow,
            Label = labelData.Label,
            LastLogin = DateTime.UtcNow,
            IsPasswordLess = labelData.IsWithoutLogin
        });

        return success;
    }

    public AssertionOptions AssertionOptionsPost(int? userId)
    {
        var credentials = new List<PublicKeyCredentialDescriptor>();
        var isPasswordLess = !userId.HasValue;

        if (!isPasswordLess)
        {
            credentials =
                _context.FidoKeys.Where(c => c.UserId == userId)
                    .Select(c => new PublicKeyCredentialDescriptor(c.CredentialId.HexStringToByteArray()))
                    .ToList();
        }
        

        var extensions = new AuthenticationExtensionsClientInputs()
        {
            UserVerificationMethod = true,
            Extensions = true
        };

        var uv = isPasswordLess ? UserVerificationRequirement.Required : UserVerificationRequirement.Preferred;

        var options = GetAssertionOptions(
            credentials,
            uv,
            extensions
        );

        return options;
    }

    public async Task<int> MakeAssertion(string? jsonOptions,
        AuthenticatorAssertionRawResponse clientResponse, CancellationToken cancellationToken)
    {
        var options = AssertionOptions.FromJson(jsonOptions);

        var fidoKey = GetCredentialById(clientResponse.Id) ?? throw new RTFDException("Неизвестный токен");

        var storedCounter = fidoKey.SignatureCounter;

        IsUserHandleOwnerOfCredentialIdAsync callback = async (args, token) =>
        {
            var storedCreds = await GetCredentialsByUserHandleAsync(args.UserHandle);
            var hexCredentialId = args.CredentialId.ByteArrayToHexString();
            return storedCreds.Exists(c => c.CredentialId == hexCredentialId);
        };

        var res =
            await MakeAssertionAsync(
                clientResponse,
                options,
                fidoKey.PublicKey.HexStringToByteArray(),
                storedCounter,
                callback,
                cancellationToken: cancellationToken);

        UpdateCounter(fidoKey, res.Counter);

        return fidoKey.UserId;
    }


    public CredentialCreateOptions RequestNewCredential(
        Fido2User user,
        List<PublicKeyCredentialDescriptor> excludeCredentials,
        AuthenticatorSelection authenticatorSelection,
        AttestationConveyancePreference attestationPreference,
        AuthenticationExtensionsClientInputs? extensions = null)
    {
        var challenge = new byte[_config.ChallengeSize];
        RandomNumberGenerator.Fill(challenge);

        var options = CredentialCreateOptions.Create(_config, challenge, user, authenticatorSelection,
            attestationPreference, excludeCredentials, extensions);
        return options;
    }

    public async Task<CredentialMakeResult> MakeNewCredentialAsync(
        AuthenticatorAttestationRawResponse attestationResponse,
        CredentialCreateOptions origChallenge,
        IsCredentialIdUniqueToUserAsyncDelegate isCredentialIdUniqueToUser,
        byte[]? requestTokenBindingId = null,
        CancellationToken cancellationToken = default)
    {
        var parsedResponse = AuthenticatorAttestationResponse.Parse(attestationResponse);

        var success = await parsedResponse.VerifyAsync(origChallenge,
            _config,
            isCredentialIdUniqueToUser,
            _metadataService,
            requestTokenBindingId, cancellationToken);
        return new CredentialMakeResult(
            status: "ok",
            errorMessage: string.Empty,
            result: success
        );
    }

    public AssertionOptions GetAssertionOptions(
        IEnumerable<PublicKeyCredentialDescriptor> allowedCredentials,
        UserVerificationRequirement? userVerification,
        AuthenticationExtensionsClientInputs? extensions = null)
    {
        var challenge = new byte[_config.ChallengeSize];
        RandomNumberGenerator.Fill(challenge);

        var options = AssertionOptions.Create(_config, challenge, allowedCredentials, userVerification, extensions);
        return options;
    }

    public async Task<AssertionVerificationResult> MakeAssertionAsync(
        AuthenticatorAssertionRawResponse assertionResponse,
        AssertionOptions originalOptions,
        byte[] storedPublicKey,
        uint storedSignatureCounter,
        IsUserHandleOwnerOfCredentialIdAsync isUserHandleOwnerOfCredentialIdCallback,
        byte[]? requestTokenBindingId = null,
        CancellationToken cancellationToken = default)
    {
        var parsedResponse = AuthenticatorAssertionResponse.Parse(assertionResponse);

        var result = await parsedResponse.VerifyAsync(originalOptions,
            _config.FullyQualifiedOrigins,
            storedPublicKey,
            storedSignatureCounter,
            isUserHandleOwnerOfCredentialIdCallback,
            requestTokenBindingId,
            cancellationToken);
        return result;
    }

    public void ValidateLabelFidoKey(int userId, string label)
    {
        var findFidoKey = _context.FidoKeys.FirstOrDefault(x => x.UserId == userId && x.Label.Equals(label));

        var errorMsg = string.Empty;
        if (findFidoKey != null) errorMsg = "Ключ с таким названием уже создан";
        else if (string.IsNullOrWhiteSpace(label)) errorMsg = "Назавние ключа не может быть пустым";

        if (!errorMsg.IsNullOrEmpty())
            throw new RTFDException(errorMsg);
    }

    public IEnumerable<FidoKey> GetCredentialsByUser(User user)
    {
        var keys = 
            _context.FidoKeys.Where(key => key.UserId == user.Id).ToList();

        return keys;
    }

    public FidoKey? GetCredentialById(byte[] id)
    {
        var hexCredentialId = id.ByteArrayToHexString();
        
        var key =
            _context.FidoKeys
                .FirstOrDefault(c => c.CredentialId == hexCredentialId);

        return key;
    }

    public async Task<List<FidoKey>> GetCredentialsByUserHandleAsync(byte[] userId)
    {
        var id = BitConverter.ToInt32(userId);

        return await _context.FidoKeys.Where(c => c.UserId == id).ToListAsync();
    }


    public async Task<bool> GetUsersByCredentialIdAsync(byte[] credentialId)
    {
        var hexCredentialId = credentialId.ByteArrayToHexString();
        
        var exist =
            await _context.FidoKeys.AnyAsync(_ => _.CredentialId == hexCredentialId);

        return !exist;
    }

    public void UpdateCounter(FidoKey key, uint counter)
    {
        key.SignatureCounter = counter;
        key.LastLogin = DateTime.UtcNow;
        _context.FidoKeys.Update(key);
        _context.SaveChanges();
    }

    public int AddCredentialToUser(FidoKey credential)
    {
        _context.FidoKeys.Add(credential);
        _context.SaveChanges();
        return credential.Id;
    }

    public bool RenameFidoKey(IdLabelDTO data)
    {
        var fidoKey = _context.FidoKeys
            .SingleOrDefault(x => x.Id == data.Id);
        if (fidoKey != null)
        {
            fidoKey.Label = data.Label;
        }

        return _context.SaveChanges() > 0;
    }

    public bool DeleteFidoKey(int id)
    {
        var fidoKey = _context.FidoKeys
            .SingleOrDefault(x => x.Id == id);
        if (fidoKey != null)
            _context.FidoKeys.Remove(fidoKey);
        
        return _context.SaveChanges() > 0;
    }
}