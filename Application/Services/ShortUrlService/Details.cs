using AutoMapper;
using Core.Domain.Entities;
using Core.DTOs.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class Details
    {
        public class Query : IRequest<Result<ShortUrlDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ShortUrlDto>>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }
            public async Task<Result<ShortUrlDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortUrl = await _dataContext.ShortUrls.Where(su => su.Id == request.Id).Include(su => su.User).FirstOrDefaultAsync();
                if (shortUrl != null)
                    return Result<ShortUrlDto>.Success(_mapper.Map<ShortUrlDto>(shortUrl));
                else
                    return Result<ShortUrlDto>.Failure("Short url don't found");
            }
        }
    }
}