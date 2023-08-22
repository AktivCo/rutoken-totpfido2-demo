using System.Text.RegularExpressions;
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
        {
            throw new RTFDException("Логин не может быть пустым", new { name = "login" });
        }

        if (string.IsNullOrEmpty(model.Password))
        {
            throw new RTFDException("Пароль не может быть пустым", new { name = "password" });
        }

        var userName = model.UserName.ToLower();

        var user = await
            _context.Users.FirstOrDefaultAsync(usr => usr.UserName.ToLower() == userName);

        if (user == null)
        {
            throw new RTFDException("Учетной записи с таким логином не существует", new { name = "login" });
        }
        
        var password = model.Password.GenerateSHA256Hash();

        if (!string.Equals(user.Password, password))
        {
            throw new RTFDException("Введен неверный пароль", new { name = "password" });
        }


        return user;
    }

    public async Task Register(UserRegisterDto model)
    {
        if (string.IsNullOrEmpty(model.UserName))
        {
            throw new RTFDException("Логин не может быть пустым", new { name = "login" });
        }

        var regex = @"^[a-zA-Z0-9_.-]{1,64}$";

        var match = Regex.IsMatch(model.UserName, regex, RegexOptions.IgnoreCase);

        if (!match)
        {
            throw new RTFDException(
                "Логин должен содержать только цифры, латинские буквы и символы \". - _\"",
                new { name = "login" }
            );
        }

        if (string.IsNullOrEmpty(model.Password))
        {
            throw new RTFDException("Пароль не может быть пустым", new { name = "password" });
        }

        if (!string.Equals(model.Password, model.RepeatPassword))
        {
            throw new RTFDException("Пароли не совпадают", new { name = "repeatPassword" });
        }

        var userName = model.UserName.ToLower();
        
        var user = await
            _context.Users.FirstOrDefaultAsync(usr => usr.UserName.ToLower() == userName);

        if (user != null)
        {
            throw new RTFDException("Пользователь с таким логином уже зарегистрирован", new { name = "login" });
        }

        var hashedPassword = model.Password.GenerateSHA256Hash();

        await _context.Users.AddAsync(new User
        {
            UserName = model.UserName,
            Password = hashedPassword,
            RegisterDate = DateTime.UtcNow
        });

        await _context.SaveChangesAsync();
    }


    public async Task<UserInfoDTO> GetUserInfo(int userId)
    {
        var user =
            await _context.Users
                .Where(x => x.Id == userId)
                .Select(x => new
                {
                    UserName = x.UserName,
                    FidoKeys = x.FidoKeys,
                    TotpKeys = x.TotpKeys,
                    RegisterDate = x.RegisterDate
                })
                .FirstOrDefaultAsync();

        if (user == null) return null;

        var endOfRegistrations = user.RegisterDate.AddDays(2);

        var diff = endOfRegistrations - DateTime.UtcNow;

        var minutes = diff.Minutes;
        var hours = diff.Hours + diff.Days * 24;

        if (diff.TotalMinutes <= 0)
        {
            minutes = 0;
            hours = 0;
        }

        return new UserInfoDTO
        {
            UserName = user.UserName,
            FidoKeys = user.FidoKeys,
            TotpKeys = user.TotpKeys,
            HoursLeft = hours,
            MinutesLeft = minutes
        };
    }
}