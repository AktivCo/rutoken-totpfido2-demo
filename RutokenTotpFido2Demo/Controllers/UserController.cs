using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RutokenTotpFido2Demo.Models;
using RutokenTotpFido2Demo.Services;

namespace RutokenTotpFido2Demo.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Route("loginstate")]
    [Authorize]
    public IActionResult LoginState()
    {
        return Ok();
    }

    [HttpGet]
    [Route("logout")]
    public async Task<IActionResult> SignOut()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto model)
    {
        await _userService.Register(model);
        return Ok();
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] UserRegisterDto model)
    {
        var claims = new List<Claim>();

        var user = await _userService.Login(model);

        claims.AddRange(new List<Claim>
        {
            new Claim("Login", user.UserName),
        });

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await
            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity));

        return Ok();
    }
}