using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using OtpNet;
using RutokenTotpFido2Demo.Entities;
using RutokenTotpFido2Demo.Exceptions;
using RutokenTotpFido2Demo.Extensions;
using RutokenTotpFido2Demo.Models;

namespace RutokenTotpFido2Demo.Services;

public class UserService
{
    private readonly EfDbContext _context;

    public UserService(EfDbContext context)
    {
        _context = context;
    }

    public async Task<User> Login(UserRegisterDto model)
    {
        if (string.IsNullOrEmpty(model.UserName))
            throw new RTFDException("Заполните логин");

        if (string.IsNullOrEmpty(model.Password))
            throw new RTFDException("Заполните пароль");

        var user = await
            _context.Users.FirstOrDefaultAsync(usr => usr.UserName == model.UserName.ToLower());

        if (user == null)
            throw new RTFDException("Неверное имя пользователя или пароль");

        var password = model.Password.GenerateSHA256Hash();

        if (!string.Equals(user.Password, password))
            throw new RTFDException("Неверное имя пользователя или пароль");

        return user;
    }

    public async Task Register(UserRegisterDto model)
    {
        if (string.IsNullOrEmpty(model.UserName))
            throw new RTFDException("Заполните логин");

        if (string.IsNullOrEmpty(model.Password))
            throw new RTFDException("Заполните пароль");

        var user = await
            _context.Users.FirstOrDefaultAsync(usr => usr.UserName == model.UserName.ToLower());

        if (user != null) throw new RTFDException("Пользователь существует");

        if (!string.Equals(model.Password, model.RepeatPassword))
        {
            throw new RTFDException("Подтверждение не совпадает с паролем");
        }

        var hashedPassword = model.Password.GenerateSHA256Hash();

        await _context.Users.AddAsync(new User
        {
            UserName = model.UserName,
            Password = hashedPassword
        });

        await _context.SaveChangesAsync();
    }


    public async Task<UserInfoDTO> GetUserInfo(int userId)
    {
        var userInfo =
            await _context.Users
                .Where(x => x.Id == userId)
                .Select(x => new UserInfoDTO
                {
                    UserName = x.UserName,
                    FidoKeys = x.FidoKeys,
                    TotpKeys = x.TotpKeys
                })
                .FirstOrDefaultAsync();


        return userInfo;
    }

    public async Task RegisterTotp(int userId, TotpParamsDTO totpParamsDto)
    {
        var totpKey = new TotpKey
        {
            UserId = userId,
            Secret = totpParamsDto.Secret,
            HashMode = totpParamsDto.HashMode,
            TimeStep = totpParamsDto.TimeStep
        };
        
        _context.TotpKeys.Add(totpKey);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveTotp(int userId, int keyId)
    {
        var key = await
            _context.TotpKeys.FirstOrDefaultAsync(_ => _.UserId == userId && _.Id == keyId);
        
        if (key == null) throw new RTFDException("Ключ не найден");
        
        _context.TotpKeys.Remove(key);
        await _context.SaveChangesAsync();
    }

}