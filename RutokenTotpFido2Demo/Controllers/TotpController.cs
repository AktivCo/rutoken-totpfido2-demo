using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OtpNet;
using RutokenTotpFido2Demo.Extensions;
using RutokenTotpFido2Demo.Services;

namespace RutokenTotpFido2Demo.Controllers;

[Route("totp")]
[Authorize]
public class TotpController : ControllerBase
{
    private readonly UserService _userService;

    public TotpController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Route("secret")]
    public async Task<IActionResult> GenerateSecret()
    {
        return Ok();
    }

    // GET
    [HttpGet]
    [Route("/{id}")]
    public async Task<IActionResult> TotpTest([FromRoute] string id)
    {
        var secretKey = "PTCSFHAAXGA44KIEPYY5GVBCH7SZXCDA";
        var base32Bytes = Base32Encoding.ToBytes(secretKey);
        var totp = new Totp(base32Bytes, step: 30, mode: OtpHashMode.Sha1);
        var window = new VerificationWindow(previous: 3);
        long timeWindowUsed;
        var x = totp.VerifyTotp(id, out timeWindowUsed, new VerificationWindow(previous: 3));

        return Ok();
    }

    [HttpGet]
    [Route("register")]
    public async Task<IActionResult> RegisterTotp()
    {
        await _userService.RegisterTotp(User.UserId());
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