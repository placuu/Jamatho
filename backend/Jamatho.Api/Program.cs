using Jamatho.Api.Data;
using Jamatho.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDbContext<JamathoDbContext>("jamathodb");

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<QuizSeederService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<JamathoDbContext>();
    await dbContext.Database.MigrateAsync();

    var seeder = scope.ServiceProvider.GetRequiredService<QuizSeederService>();
    await seeder.SeedAsync();
}

app.MapDefaultEndpoints();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
