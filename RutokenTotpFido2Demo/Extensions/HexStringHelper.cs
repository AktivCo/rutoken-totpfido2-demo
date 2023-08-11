namespace RutokenTotpFido2Demo.Extensions;

public static class HexStringHelper
{
    public static string ByteArrayToHexString(this byte[] ba)
    {
        return BitConverter.ToString(ba);
    }

    public static byte[] HexStringToByteArray(this string hex)
    {
        return Convert.FromHexString(hex.Replace("-", ""));
    }
}