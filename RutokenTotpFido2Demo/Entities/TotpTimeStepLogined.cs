namespace RutokenTotpFido2Demo.Entities;

public class TotpTimeStepLogined
{
    public int Id { get; set; }
    public int TotpId { get; set; }
    public TotpKey TotpKey { get; set; }
    public long TimeStepMatched { get; set; }
}