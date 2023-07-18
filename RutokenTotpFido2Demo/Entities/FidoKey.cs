using Fido2NetLib.Objects;

namespace RutokenTotpFido2Demo.Entities;

public class FidoKey
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public byte[] CredentialId { get; set; }
    public byte[] PublicKey { get; set; }
    public uint SignatureCounter { get; set; }
    public string CredType { get; set; }
    public DateTime RegDate { get; set; }
    public Guid AaGuid { get; set; }

    public string Label { get; set; }
    public DateTime LastLogin { get; set; }
    public bool IsPasswordLess { get; set; }
}