using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace RutokenTotpFido2Demo.Models;

[ValidateNever]
public class UserRegisterDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string RepeatPassword { get; set; }
}