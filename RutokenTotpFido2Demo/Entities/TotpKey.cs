namespace RutokenTotpFido2Demo.Entities;

public class TotpKey
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}