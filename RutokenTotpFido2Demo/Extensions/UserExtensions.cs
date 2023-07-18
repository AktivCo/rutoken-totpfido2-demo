using System.Security.Claims;
using RutokenTotpFido2Demo.Exceptions;

namespace RutokenTotpFido2Demo.Extensions
{
    public static class UserExtensions
    {
        public static int UserId(this ClaimsPrincipal user)
        {
            var userIdString = user.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;

            if (!int.TryParse(userIdString, out var userId))
            {
                throw new RTFDException("Ошибка идентификации");
            }
            return userId;
        }

        public static string UserLogin(this ClaimsPrincipal user)
        {
            var userName = user.Claims.FirstOrDefault(c => c.Type == "Login")?.Value;

            return userName;
        }
    }
}
