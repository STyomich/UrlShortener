using System.Security.Claims;
using Application.Services.UserService;
using Core.Domain.IdentityEntities;
using Core.DTOs.Identity;
using Core.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IMediator _mediator;
        public UserController(UserManager<ApplicationUser> userManager, TokenService tokenService, IMediator mediator)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _mediator = mediator;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
            if (user == null) return Unauthorized();
            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized();
            if (result)
            {
                return new UserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };
            }
            return Unauthorized();
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "This username is already taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "This email is already taken");
                return ValidationProblem();
            }
            var user = new ApplicationUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                Id = Guid.NewGuid()
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await _mediator.Send(new AppendUserToRole.Command { UserGroup = registerDto.UserGroup, User = user });
                return new UserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };
            }
            return BadRequest(result.Errors);
        }
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            if (user != null)
                return new UserDto
                {
                    Username = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
                };
            else
                return null;
        }
    }
}