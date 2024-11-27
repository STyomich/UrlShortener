using AutoMapper;
using Core.Domain.Entities;
using Core.DTOs.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class List
    {
        public class Query : IRequest<List<ShortUrlDto>> { }
        public class Handler : IRequestHandler<Query, List<ShortUrlDto>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<List<ShortUrlDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortUrls = await _dataContext.ShortUrls.ToListAsync();
                return _mapper.Map<List<ShortUrlDto>>(shortUrls);
            }
        }
    }
}