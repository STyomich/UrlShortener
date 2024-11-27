using Application.Services.ShortUrlService;
using Core.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShortUrlController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ShortUrlController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet] //api/shorturl
        public async Task<ActionResult<List<ShortUrl>>> GetAllShortUrls()
        {
            return await _mediator.Send(new List.Query());
        }
        [HttpPost]
        public async Task<IActionResult> CreateShortUrl(string originalUrl)
        {
            return Ok(await Mediator.Send(new Create.Command { OriginalUrl = originalUrl }));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShortUrlDetails(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
    }
}