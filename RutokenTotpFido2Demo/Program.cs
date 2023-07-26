using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using RutokenTotpFido2Demo;
using RutokenTotpFido2Demo.Exceptions;
using RutokenTotpFido2Demo.Services;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => options.Events.OnRedirectToLogin = opt =>
    {
        opt.Response.StatusCode = 403;
        return Task.FromResult(0);
    });

// builder.Services.AddDbContext<EfDbContext>(config => config.UseInMemoryDatabase("test"));
builder.Services
    .AddDbContext<EfDbContext>(config =>
        config.UseNpgsql(builder.Configuration.GetConnectionString("Default")));


builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<QrCodeService>();


var app = builder.Build();

using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<EfDbContext>();
db.Database.Migrate();

app.UseExceptionHandler(options => { RTFDExceptionHandler.HandleError(options); });
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
;

app.Run();