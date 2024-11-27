using Core.Domain.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class Details
    {
        public class Query : IRequest<Result<ShortUrl>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ShortUrl>>
        {
            private readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Result<ShortUrl>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortUrl = await _dataContext.ShortUrls.Where(su => su.Id == request.Id).Include(su => su.User).FirstOrDefaultAsync();
                if (shortUrl != null)
                    return Result<ShortUrl>.Success(shortUrl);
                else
                    return Result<ShortUrl>.Failure("Short url don't found");
            }
        }
    }
}