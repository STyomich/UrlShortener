using Core.Domain.Entities;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class List
    {
        public class Query : IRequest<List<ShortUrl>> { }
        public class Handler : IRequestHandler<Query, List<ShortUrl>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<List<ShortUrl>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortUrls = _dataContext.ShortUrls.Include(su => su.User).ToListAsync();
                return await shortUrls;
            }
        }
    }
}