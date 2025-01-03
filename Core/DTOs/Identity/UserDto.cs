using Core.Enums;

namespace Core.DTOs.Identity
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Token { get; set; }
        public string? UserGroup { get; set; } = UserGroupsEnum.User.ToString();
    }
}