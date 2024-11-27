using AutoMapper;
using Core.Domain.Entities;
using Core.DTOs.Entities;

namespace Application.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ShortUrl, ShortUrl>();
            CreateMap<ShortUrl, ShortUrlDto>();
        }
    }
}