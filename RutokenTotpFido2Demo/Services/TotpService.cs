using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using OtpNet;
using RutokenTotpFido2Demo.Entities;
using RutokenTotpFido2Demo.Exceptions;
using RutokenTotpFido2Demo.Extensions;
using RutokenTotpFido2Demo.Models;

namespace RutokenTotpFido2Demo.Services
{
    public class TotpService
    {
        private readonly EfDbContext _context;

        public TotpService(EfDbContext context)
        {
            _context = context;
        }

        public async Task RegisterTotp(int userId, TotpParamsDTO totpParamsDto)
        {
            var user =
                await _context.Users
                    .Where(x => x.Id == userId)
                    .Select(x => new
                    {
                        FidoKeys = x.FidoKeys,
                        TotpKeys = x.TotpKeys,
                    })
                    .FirstOrDefaultAsync();

            if (user == null || (user != null && (user.FidoKeys.Any() || user.TotpKeys.Any())))
            {
                throw new RTFDException("К учетной записи уже привязан ключ другого типа.");
            }

            var verifier = new TotpSecretVerifier(totpParamsDto.Secret);

            var secret = verifier.GetBase32String();


            var totpKey = new TotpKey
            {
                UserId = userId,
                Secret = secret,
                HashMode = totpParamsDto.HashMode,
                TimeStep = totpParamsDto.TimeStep
            };

            _context.TotpKeys.Add(totpKey);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveTotp(int userId, int keyId)
        {
            var key = await
                _context.TotpKeys.FirstOrDefaultAsync(_ => _.UserId == userId && _.Id == keyId);

            if (key == null) throw new RTFDException("Ключ не найден");

            _context.TotpKeys.Remove(key);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> VerifyTotp(int userId, TotpVerifyDTO totpVerify, CancellationToken cancellationToken)
        {
            var key =
                await _context.TotpKeys
                    .Include(x => x.TimeStepLogined)
                    .FirstOrDefaultAsync(_ => _.UserId == userId, cancellationToken) ??
                throw new RTFDException("Ключ не подключен");

            var isMatch = CheckTotp(true, totpVerify.Code, key.Secret, key.TimeStep, key.HashMode, out long timeStepMatched);
            var isTimeStepContains = key.TimeStepLogined.Any(x => x.TimeStepMatched == timeStepMatched);

            if (isTimeStepContains)
            {
                throw new RTFDException("Одноразовый пароль уже был использован для входа в учетную запись");
            }

            var checkMatch = isMatch && !isTimeStepContains;
            if (checkMatch)
            {
                key.TimeStepLogined.Add(new TotpTimeStepLogined { TotpId = key.Id, TimeStepMatched = timeStepMatched });
                _context.SaveChanges();
            }

            return checkMatch;
        }

        public bool CheckTotp(TotpParamsDTO totpCheck)
        {
            return CheckTotp(false, totpCheck.TotpPassword, totpCheck.Secret, totpCheck.TimeStep, totpCheck.HashMode, out _);
        }

        private bool CheckTotp(bool isDrift, string code, string secret, int timeStep, OtpHashMode hashMode, out long timeStepMatched)
        {
            var verifier = new TotpSecretVerifier(secret);

            var secretByteArr = verifier.GetBytes();

            var totp = new Totp(secretByteArr, timeStep, hashMode);

            var verificationWindow = isDrift ? VerificationWindow.RfcSpecifiedNetworkDelay : new VerificationWindow();
            return totp.VerifyTotp(code, out timeStepMatched, verificationWindow);
        }
    }
}