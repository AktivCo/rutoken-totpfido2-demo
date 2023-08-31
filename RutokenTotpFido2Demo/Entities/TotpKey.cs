using OtpNet;

namespace RutokenTotpFido2Demo.Entities;

public class TotpKey
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string Secret { get; set; }
    public OtpHashMode HashMode { get; set; }
    public int TimeStep { get; set; }

    public ICollection<TotpTimeStepLogined> TimeStepLogined { get; } = new List<TotpTimeStepLogined>();
}