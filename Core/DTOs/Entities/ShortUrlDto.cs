using Core.DTOs.Identity;

namespace Core.DTOs.Entities
{
    public class ShortUrlDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? OriginalUrl { get; set; }
        public string? UrlKey { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}