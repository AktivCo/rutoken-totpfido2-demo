using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace RutokenTotpFido2Demo.Extensions;

public static class SignInExtension
{
    public static async Task SignInByUserHandleAsync(this HttpContext context, int userId)
    {
        var claims = new List<Claim>();

        claims.AddRange(new List<Claim>
        {
            new("Id", userId.ToString())
        });

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await
            context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity));
    }

    public static async Task SignInTwoFactorAsync(this HttpContext context, int userId)
    {
        var claims = new List<Claim>();

        claims.AddRange(new List<Claim>
        {
            new("Id", userId.ToString()),
            new("twoFactor", "")
        });

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await
            context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity));
    }
}