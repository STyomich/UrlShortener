using Core.Domain.IdentityEntities;
using Core.Enums;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Services.UserService
{
    public class AppendUserToRole
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string? UserGroup { get; set; }
            public ApplicationUser? User { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly RoleManager<IdentityRole<Guid>> _roleManager;
            public Handler(DataContext dataContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
            {
                _dataContext = dataContext;
                _userManager = userManager;
                _roleManager = roleManager;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (request.UserGroup == UserGroupsEnum.Admin.ToString())
                {
                    if (await _roleManager.FindByNameAsync(UserGroupsEnum.Admin.ToString()) is null)
                    {
                        IdentityRole<Guid> applicationRole = new IdentityRole<Guid>() { Name = UserGroupsEnum.Admin.ToString() };
                        await _roleManager.CreateAsync(applicationRole);
                    }

                    await _userManager.AddToRoleAsync(request.User, UserGroupsEnum.Admin.ToString());
                    return Result<Unit>.Success(Unit.Value);
                }
                if (request.UserGroup == UserGroupsEnum.User.ToString())
                {
                    if (await _roleManager.FindByNameAsync(UserGroupsEnum.User.ToString()) is null)
                    {
                        IdentityRole<Guid> applicationRole = new IdentityRole<Guid>() { Name = UserGroupsEnum.User.ToString() };
                        await _roleManager.CreateAsync(applicationRole);
                    }

                    await _userManager.AddToRoleAsync(request.User, UserGroupsEnum.User.ToString());
                    return Result<Unit>.Success(Unit.Value);
                }
                return Result<Unit>.Failure("Failed to append user to role");
            }
        }
    }
}