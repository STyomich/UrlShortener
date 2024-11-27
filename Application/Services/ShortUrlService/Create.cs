using Application.Helpers;
using Application.Interfaces;
using Core.Domain.Entities;
using Core.DTOs.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public OriginalUrlDto? OriginalUrl { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _dataContext = dataContext;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var shortUrl = await _dataContext.ShortUrls.SingleOrDefaultAsync(su => su.OriginalUrl == request.OriginalUrl.OriginalUrl);

                if (shortUrl != null)
                    return Result<Unit>.Failure("This original link is already existed in system.");
                else
                {
                    string asda = _userAccessor.GetUserIdentifier();
                    string asdaasd = _userAccessor.GetUserName();
                    string key = RandomStringGenerator.GenerateRandomString(16);
                    var newShortUrl = new ShortUrl
                    {
                        OriginalUrl = request.OriginalUrl.OriginalUrl,
                        UrlKey = key,
                        CreatedAt = DateTime.Now,
                        UserId = Guid.Parse(_userAccessor.GetUserIdentifier())
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