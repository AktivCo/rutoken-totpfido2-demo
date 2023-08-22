using Fido2NetLib.Objects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RutokenTotpFido2Demo.Entities;
using System.Net;

namespace RutokenTotpFido2Demo;

public class EfDbContext : DbContext
{
    public EfDbContext(DbContextOptions config) : base(config)
    {
        
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<User>()
            .HasKey(el => el.Id);

        modelBuilder
            .Entity<User>()
            .HasIndex(el => el.UserName)
            .IsUnique();

        modelBuilder
            .Entity<FidoKey>()
            .HasKey(el => el.Id);
        
        modelBuilder
            .Entity<TotpKey>()
            .HasKey(el => el.Id);
        
        modelBuilder.Entity<User>()
            .HasMany(e => e.FidoKeys)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .IsRequired();
        
        modelBuilder.Entity<User>()
            .HasMany(e => e.TotpKeys)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .IsRequired();
        
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<TotpKey> TotpKeys { get; set; }
    public DbSet<FidoKey> FidoKeys { get; set; }
}
