using QRCoder;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OtpNet;
using RutokenTotpFido2Demo.Exceptions;
using RutokenTotpFido2Demo.Models;

namespace RutokenTotpFido2Demo.Services;


public class QrCodeService
{
    public byte[] GenerateQRCore(string userName, TotpParamsDTO totpParams)
    {
        var secret = totpParams.Secret;
        var user = userName;
        var issuer = "Rutoken";
        var hashMode = totpParams.HashMode;
        var digits = 6;
        var timeStep = totpParams.TimeStep;
        var qrGenerator = new QRCodeGenerator();

        var uriString = 
            new OtpUri(OtpType.Totp, secret, user, issuer, hashMode, digits, timeStep)
                .ToString();
        
        var qrCodeData = qrGenerator.CreateQrCode(uriString, QRCodeGenerator.ECCLevel.Q);
        
        var qrCode = new BitmapByteQRCode(qrCodeData);
        var qrCodeAsBitmapByteArr = qrCode.GetGraphic(20);

        return qrCodeAsBitmapByteArr;
    }
}