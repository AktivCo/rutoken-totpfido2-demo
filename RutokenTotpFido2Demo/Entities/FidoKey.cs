namespace RutokenTotpFido2Demo.Entities;

public class FidoKey
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string Label { get; set; }
    public bool IsPasswordLess { get; set; }
}