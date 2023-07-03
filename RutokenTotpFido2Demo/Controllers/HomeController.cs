using Microsoft.AspNetCore.Mvc;
using OtpNet;

namespace RutokenTotpFido2Demo.Controllers;

[ApiController]
[Route("test")]
public class TestController : ControllerBase
{
    [HttpGet]
    [Route("index")]
    public IActionResult Index()
    {
        var bytes = Base32Encoding.ToBytes("JBSWY3DPEHPK3PXP");

        var totp = new Totp(bytes, mode: OtpHashMode.Sha1);

        var result = totp.ComputeTotp();
        return Ok(bytes);
    }
}

