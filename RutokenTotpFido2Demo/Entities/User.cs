namespace RutokenTotpFido2Demo.Entities;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    public DateTime RegisterDate { get; set; }
    public ICollection<TotpKey> TotpKeys { get; } = new List<TotpKey>();
    public ICollection<FidoKey> FidoKeys { get; } = new List<FidoKey>();
}