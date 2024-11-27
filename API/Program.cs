using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

app.MapControllers();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();


app.Run();

