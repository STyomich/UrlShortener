using Application.Interfaces;
using Application.Services;
using Application.Services.ShortUrlService;
using Core.DTOs.Entities;
using FluentAssertions;
using Infrastructure.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Application.Tests.Services.ShortUrlsTests
{
    public class ShortUrls_CreateTests
    {
        private static DataContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var dbContext = new DataContext(options);
            dbContext.Database.EnsureCreated();
            return dbContext;
        }

        [Fact]
        public async void Create_CreateShortUrlWithNullOriginalUrl_ReturnsFailure()
        {
            // Arrange
            var mock = new Mock<IUserAccessor>();
            mock.Setup(x => x.GetUserIdentifier()).Returns(Guid.NewGuid().ToString()); // Mocking a method call
            mock.Setup(x => x.GetUserName()).Returns("Some name"); // Mocking a method call

            var shortUrl = new OriginalUrlDto
            {
                OriginalUrl = null,
            };
            var dataContext = GetDbContext();

            // Act
            var createCommand = new Create.Command
            {
                OriginalUrl = shortUrl
            };

            var handler = new Create.Handler(dataContext, mock.Object);

            var result = await handler.Handle(createCommand, CancellationToken.None);

            // Assert
            result.Should().BeEquivalentTo(Result<Unit>.Failure("Failed to create a short URL."));
        }
    }
}