using Fido2NetLib;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RutokenTotpFido2Demo.Extensions;
using RutokenTotpFido2Demo.Models;
using RutokenTotpFido2Demo.Services;

namespace RutokenTotpFido2Demo.Controllers;

[ApiController]
[Route("mfa")]
public class MfaController : ControllerBase
{
    private readonly MfaService _mfaService;

    public MfaController(MfaService mfaService)
    {
        _mfaService = mfaService;
    }

    [HttpPost]
    [Route("makecredentialoptions")]
    [Authorize(Policy = "twoFactor")]
    public JsonResult MakeCredentialOptions([FromBody] IsWithoutLoginDTO data)
    {
        var options = _mfaService.MakeCredentialOptions(User.UserId(), data.IsWithoutLogin);
        HttpContext.Session.SetString("fido2.attestationOptions", options);
        return new JsonResult(options);
    }

    [HttpPost]
    [Route("makecredential")]
    [Authorize(Policy = "twoFactor")]
    public async Task<JsonResult> MakeCredential([FromBody] LabelData data, CancellationToken cancellationToken)
    {
        var userId = User.UserId();
        _mfaService.ValidateLabelFidoKey(userId, data.Label);

        var jsonOptions = HttpContext.Session.GetString("fido2.attestationOptions");
        var succes = await _mfaService.MakeCredential(userId, data, jsonOptions, cancellationToken);

        return new JsonResult(succes);
    }

    [HttpGet]
    [Route("assertionoptions")]
    public JsonResult AssertionOptionsPost()
    {
        int? userId = User.Identity is { IsAuthenticated: true } ? User.UserId() : null;

        var options = _mfaService.AssertionOptionsPost(userId);

        HttpContext.Session.SetString("fido2.assertionOptions", options.ToJson());
        return new JsonResult(options);
    }

    [HttpPost]
    [Route("makeassertion")]
    public async Task<IActionResult> MakeAssertion([FromBody] AuthenticatorAssertionRawResponse clientResponse,
        CancellationToken cancellationToken)
    {
        var jsonOptions = HttpContext.Session.GetString("fido2.assertionOptions");
        var userId = await _mfaService.MakeAssertion(jsonOptions, clientResponse, cancellationToken);
        await HttpContext.SignInTwoFactorAsync(userId);
        return Ok();
    }

    [HttpPost]
    [Route("renamedevice")]
    [Authorize(Policy = "twoFactor")]
    public JsonResult RenameDevice(IdLabelDTO data)
    {
        _mfaService.ValidateLabelFidoKey(User.UserId(), data.Label);
        var succes = _mfaService.RenameFidoKey(data);
        return new JsonResult(succes);
    }

    [HttpPost]
    [Route("deletefidokey")]
    [Authorize(Policy = "twoFactor")]
    public JsonResult DeleteFidoKey(int id)
    {
        var succes = _mfaService.DeleteFidoKey(id);
        return new JsonResult(succes);
    }
}
