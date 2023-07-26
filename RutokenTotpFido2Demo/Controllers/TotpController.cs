using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OtpNet;
using RutokenTotpFido2Demo.Extensions;
using RutokenTotpFido2Demo.Models;
using RutokenTotpFido2Demo.Services;

namespace RutokenTotpFido2Demo.Controllers;

[Route("totp")]
// [Authorize]
public class TotpController : ControllerBase
{
    private readonly UserService _userService;
    private readonly QrCodeService _qrCodeService;

    public TotpController(UserService userService, QrCodeService qrCodeService)
    {
        _userService = userService;
        _qrCodeService = qrCodeService;
    }

    [HttpGet]
    [Route("getsecret")]
    public IActionResult GenerateSecret()
    {
        var key = KeyGeneration.GenerateRandomKey(20);

        var base32String = Base32Encoding.ToString(key);

        return Ok(base32String);
    }

    [HttpPost]
    [Route("qr")]
    public IActionResult Qr([FromBody] TotpParamsDTO totpParams)
    {
        var qrCode = _qrCodeService.GenerateQRCore("", totpParams);
        var image = Convert.ToBase64String(qrCode);

        return Ok("data:image/png;base64," + image);
    }

    // GET
    [HttpPost]
    [Route("check")]
    public IActionResult TotpCheck([FromBody] TotpParamsDTO totpParams)
    {
        var secretKey = totpParams.Secret;
        var base32Bytes = Base32Encoding.ToBytes(secretKey);
        var totp = new Totp(base32Bytes, step: totpParams.TimeStep, mode: totpParams.HashMode);

        var checkResult
            = totp.VerifyTotp(totpParams.TotpPassword, out _, new VerificationWindow(previous: 3));

        if (!checkResult) return BadRequest();

        return Ok();
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> RegisterTotp([FromBody] TotpParamsDTO totpParams)
    {
        await _userService.RegisterTotp(User.UserId(), totpParams);
        return Ok();
    }

    [HttpGet]
    [Route("remove/{id}")]
    public async Task<IActionResult> RemoveTotp([FromRoute] int id)
    {
        await _userService.RemoveTotp(User.UserId(), id);
        return Ok();
    }
}