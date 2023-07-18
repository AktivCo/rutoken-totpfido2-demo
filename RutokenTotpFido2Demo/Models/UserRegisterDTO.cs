using Fido2NetLib;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Text.Json.Serialization;

namespace RutokenTotpFido2Demo.Models;

[ValidateNever]
public class UserRegisterDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string RepeatPassword { get; set; }
}

public class AttestationResponse
{
    public string AttType { get; set; } = "none";
    public string AuthType { get; set; } = string.Empty;
    public bool RequireResidentKey { get; set; } = false;
    public string UserVerification { get; set; } = "preferred";
}

public class LabelData
{
    public string Label { get; set; }
    public bool IsWithoutLogin { get; set; }
    public AuthenticatorAttestationRawResponse AttestationResponse { get; set; }
}