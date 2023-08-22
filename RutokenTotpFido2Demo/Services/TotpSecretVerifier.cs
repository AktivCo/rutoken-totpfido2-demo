using System.Text.RegularExpressions;
using OtpNet;
using RutokenTotpFido2Demo.Exceptions;
using RutokenTotpFido2Demo.Extensions;

namespace RutokenTotpFido2Demo.Services;

public class TotpSecretVerifier
{
    const string _isBase32 = @"^[a-zA-Z2-7]{1,}$";
    const string _isHex = @"^[0-9A-Fa-f]{1,}$";

    private readonly string _secret;

    public TotpSecretVerifier(string secret)
    {
        _secret = secret;
    }

    private bool IsBase32()
    {
        return Regex.IsMatch(_secret, _isBase32, RegexOptions.IgnoreCase);
    }

    private bool IsHex()
    {
        return Regex.IsMatch(_secret, _isHex, RegexOptions.IgnoreCase);
    }

    public byte[] GetBytes()
    {
        if (IsBase32())
        {
            return Base32Encoding.ToBytes(_secret);
        }

        if (IsHex() && _secret.Length % 2 == 0)
        {
            return _secret.HexStringToByteArray();
        }

        throw new RTFDException("Ключ неверного формата");
    }

    public string GetBase32String()
    {
        if (IsBase32()) return _secret;
        if (IsHex())
        {
            var bytes = _secret.HexStringToByteArray();
            return Base32Encoding.ToString(bytes);
        }

        throw new RTFDException("Ключ неверного формата");
    }
}