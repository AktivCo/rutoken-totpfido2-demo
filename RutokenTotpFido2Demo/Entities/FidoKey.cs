namespace RutokenTotpFido2Demo.Entities;

public class FidoKey
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string CredentialId { get; set; }
    public string PublicKey { get; set; }
    public uint SignatureCounter { get; set; }
    public DateTime RegDate { get; set; }

    public string Label { get; set; }
    public DateTime LastLogin { get; set; }
    public bool IsPasswordLess { get; set; }
}