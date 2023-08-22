using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OtpNet;
using RutokenTotpFido2Demo.Extensions;
using RutokenTotpFido2Demo.Models;
using RutokenTotpFido2Demo.Services;

namespace RutokenTotpFido2Demo.Controllers;

[Route("totp")]
public class TotpController : ControllerBase
{
    private readonly TotpService _totpService;
    private readonly QrCodeService _qrCodeService;

    public TotpController(TotpService totpService, QrCodeService qrCodeService)
    {
        _totpService = totpService;
        _qrCodeService = qrCodeService;
    }

    [HttpGet]
    [Route("getsecret")]
    [Authorize(Policy = "twoFactor")]
    public IActionResult GenerateSecret()
    {
        var key = KeyGeneration.GenerateRandomKey(20);

        var base32String = Base32Encoding.ToString(key);

        return Ok(base32String);
    }

    [HttpPost]
    [Route("qr")]
    [Authorize(Policy = "twoFactor")]
    public IActionResult Qr([FromBody] TotpParamsDTO totpParams)
    {
        var qrCode = _qrCodeService.GenerateQRCore("", totpParams);
        var image = Convert.ToBase64String(qrCode);

        return Ok("data:image/png;base64," + image);
    }

    [HttpPost]
    [Route("check")]
    [Authorize(Policy = "twoFactor")]
    public IActionResult TotpCheck([FromBody] TotpParamsDTO totpParams)
    {
        var checkResult = _totpService.CheckTotp(totpParams);
        
        if (!checkResult) return BadRequest();

        return Ok();
    }

    [HttpPost]
    [Route("register")]
    [Authorize(Policy = "twoFactor")]
    public async Task<IActionResult> RegisterTotp([FromBody] TotpParamsDTO totpParams)
    {
        await _totpService.RegisterTotp(User.UserId(), totpParams);
        return Ok();
    }

    [HttpGet]
    [Route("remove/{id}")]
    [Authorize(Policy = "twoFactor")]
    public async Task<IActionResult> RemoveTotp([FromRoute] int id)
    {
        await _totpService.RemoveTotp(User.UserId(), id);
        return Ok();
    }

    [HttpPost]
    [Route("verify")]
    public async Task<IActionResult> VerifyTotp([FromBody] TotpVerifyDTO totpVerify,
        CancellationToken cancellationToken)
    {
        var userId = User.UserId();

        var isVerified = await _totpService.VerifyTotp(userId, totpVerify, cancellationToken);

        if (isVerified)
            await HttpContext.SignInTwoFactorAsync(userId);

        return Ok(isVerified);
    }
}