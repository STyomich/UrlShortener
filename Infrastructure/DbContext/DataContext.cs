using Core.Domain.Entities;
using Core.Domain.IdentityEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DbContext
{
    public class DataContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<ShortUrl> ShortUrls { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ShortUrl>()
                .HasOne(su => su.User)
                .WithMany(u => u.ShortUrls)
                .HasForeignKey(su => su.UserId);
        }
    }
}