using Application.Helpers;
using Core.Domain.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string? OriginalUrl { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var shortUrl = _dataContext.ShortUrls.SingleOrDefaultAsync(su => su.OriginalUrl == request.OriginalUrl);

                if (shortUrl != null)
                    return Result<Unit>.Failure("This original link is already existed in system.");
                else
                {
                    string key = RandomStringGenerator.GenerateRandomString(16);
                    var newShortUrl = new ShortUrl
                    {
                        OriginalUrl = request.OriginalUrl,
                        UrlKey = key
                    };

                    await _dataContext.ShortUrls.AddAsync(newShortUrl);
                    var result = await _dataContext.SaveChangesAsync() > 0;
                    if (!result)
                        return Result<Unit>.Failure("Failed to create an short url.");
                    return Result<Unit>.Success(Unit.Value);
                }
            }
        }
    }
}