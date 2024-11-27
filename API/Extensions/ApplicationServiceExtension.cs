using Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly();
            });

            services.AddHttpContextAccessor();
            return services;
        }
    }
}