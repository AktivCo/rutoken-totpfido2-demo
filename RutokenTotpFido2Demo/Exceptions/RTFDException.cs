namespace RutokenTotpFido2Demo.Exceptions;

public class RTFDException : Exception
{
    public override string Message { get; }
    public object Payload { get; }
    public RTFDException(string message, object payload = null)
    {
        Message = message;
        Payload = payload;
    }

}