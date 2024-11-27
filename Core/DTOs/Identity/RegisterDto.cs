using Core.Enums;

namespace Core.DTOs.Identity
{
    public class RegisterDto
    {
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? UserGroup { get; set; } = UserGroupsEnum.User.ToString();
    }
}