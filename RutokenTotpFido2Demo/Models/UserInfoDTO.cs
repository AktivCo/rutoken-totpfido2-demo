using RutokenTotpFido2Demo.Entities;

namespace RutokenTotpFido2Demo.Models;

public class UserInfoDTO
{
    public string UserName { get; set; }
    public IEnumerable<TotpKey> TotpKeys { get; set; }
    public IEnumerable<FidoKey> FidoKeys { get; set; }
}