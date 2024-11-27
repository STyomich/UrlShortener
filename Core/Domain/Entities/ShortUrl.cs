using Core.Domain.IdentityEntities;

namespace Core.Domain.Entities
{
    public class ShortUrl
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? OriginalUrl { get; set; }
        public string? UrlKey { get; set; }
        public DateTime? CreatedAt { get; set; }
        public ApplicationUser? User { get; set; }
    }
}