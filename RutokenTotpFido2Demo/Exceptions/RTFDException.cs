namespace RutokenTotpFido2Demo.Exceptions;

public class RTFDException : Exception
{
    public override string Message { get; }
    public RTFDException(string message)
    {
        Message = message;
    }
}