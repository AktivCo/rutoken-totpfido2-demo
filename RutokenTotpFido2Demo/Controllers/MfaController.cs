using System.Data;
using Fido2NetLib;
using Microsoft.AspNetCore.Authentication;
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

    [HttpGet]
    [Route("makecredentialoptions")]
    [Authorize]
    public JsonResult MakeCredentialOptions()
    {
        var options = _mfaService.MakeCredentialOptions(User.UserId());
        HttpContext.Session.SetString("fido2.attestationOptions", options);
        return new JsonResult(options);
    }

    [HttpPost]
    [Route("makecredential")]
    [Authorize]
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
    [Authorize]
    public JsonResult AssertionOptionsPost([FromForm] string username, [FromForm] string userVerification)
    {
        var options = _mfaService.AssertionOptionsPost(username, userVerification);

        HttpContext.Session.SetString("fido2.assertionOptions", options.ToJson());
        return new JsonResult(options);
    }

    [HttpPost]
    [Route("makeassertion")]
    [Authorize]
    public async Task<JsonResult> MakeAssertion([FromBody] AuthenticatorAssertionRawResponse clientResponse, CancellationToken cancellationToken)
    {
        var jsonOptions = HttpContext.Session.GetString("fido2.assertionOptions");
        var res = await _mfaService.MakeAssertion(jsonOptions, clientResponse, cancellationToken);

        return new JsonResult(res);
    }

    [HttpPost]
    [Route("renamedevice")]
    [Authorize]
    public JsonResult RenameDevice(IdLabelDTO data)
    {
        _mfaService.ValidateLabelFidoKey(User.UserId(), data.Label);
        var succes = _mfaService.RenameFidoKey(data);
        return new JsonResult(succes);
    }

    [HttpPost]
    [Route("deletefidokey")]
    [Authorize]
    public JsonResult DeleteFidoKey(int id)
    {
        var succes = _mfaService.DeleteFidoKey(id);
        return new JsonResult(succes);
    }
}