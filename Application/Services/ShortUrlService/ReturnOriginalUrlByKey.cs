using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.ShortUrlService
{
    public class ReturnOriginalUrlByKey
    {
        public class Query : IRequest<string>
        {
            public string UrlKey { get; set; }
        }

        public class Handler : IRequestHandler<Query, string>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }
            public async Task<string> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortUrl = await _dataContext.ShortUrls.Where(su => su.UrlKey == request.UrlKey).FirstOrDefaultAsync();
                if (shortUrl != null)
                    return shortUrl.OriginalUrl;
                else
                    return null;
            }
        }
    }
}