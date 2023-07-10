using System.Security.Cryptography;
using System.Text;

namespace RutokenTotpFido2Demo.Extensions;

public static class HashHelper
{
    public static string GenerateSHA256Hash(this string value)
    {
        var builder = new StringBuilder();

        using (var hash = SHA256Managed.Create())
        {
            var enc = Encoding.UTF8;
            var result = hash.ComputeHash(enc.GetBytes(value));

            foreach (var b in result) builder.Append(b.ToString("x2"));
        }

        return builder.ToString();
    }
}