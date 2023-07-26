using OtpNet;

namespace RutokenTotpFido2Demo.Models;

public class TotpParamsDTO
{
    public string Secret { get; set; }
    public int TimeStep { get; set; }
    public OtpHashMode HashMode { get; set; }
    public string TotpPassword { get; set; }
}