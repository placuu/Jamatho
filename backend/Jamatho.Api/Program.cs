using Jamatho.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDbContext<JamathoDbContext>("jamathodb");

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<JamathoDbContext>();
    await dbContext.Database.MigrateAsync();
}

app.MapDefaultEndpoints();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
