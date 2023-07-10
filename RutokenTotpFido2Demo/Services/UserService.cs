using Microsoft.EntityFrameworkCore;
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
            throw new RTFDException("Имя пользователя не может быть пустым");

        if (string.IsNullOrEmpty(model.Password))
            throw new RTFDException("Пароль не может быть пустым");

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
            throw new RTFDException("Имя пользователя не может быть пустым");

        if (string.IsNullOrEmpty(model.Password))
            throw new RTFDException("Пароль не может быть пустым");

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
            Password = hashedPassword,
        });

        await _context.SaveChangesAsync();
    }
}