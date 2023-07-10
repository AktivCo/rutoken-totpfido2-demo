using Microsoft.EntityFrameworkCore;
using RutokenTotpFido2Demo.Entities;

namespace RutokenTotpFido2Demo;

public class EfDbContext : DbContext
{
    public EfDbContext(DbContextOptions config) : base(config)
    {
    }

    public DbSet<User> Users { get; set; }
}

