using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Newtonsoft.Json;

namespace RutokenTotpFido2Demo.Exceptions;

public class RTFDExceptionHandler
{
    public static void HandleError(IApplicationBuilder options)
    {
        options.Run(
            async context =>
            {
                context.Response.ContentType = "application/json; charset=utf-8";
                var e = context.Features.Get<IExceptionHandlerFeature>();
                if (e != null)
                {
                    var ex = e.Error;
                    while (ex.InnerException != null) ex = ex.InnerException;

                    RTFDException exceptionToSend;

                    if (ex.GetType() != typeof(RTFDException))
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        exceptionToSend = new RTFDException("Произошла ошибка");
                    }
                    else
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        exceptionToSend = (RTFDException)ex;
                    }


                    await context.Response.WriteAsync(JsonConvert.SerializeObject(
                        new
                        {
                            message = exceptionToSend.Message,
                            payload = exceptionToSend.Payload
                        }
                    )).ConfigureAwait(false);
                }
            });
    }
}