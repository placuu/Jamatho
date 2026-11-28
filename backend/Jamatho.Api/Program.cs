using System.Text;
using Jamatho.Api.Data;
using Jamatho.Api.Services;
using Jamatho.Api.Services.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddNpgsqlDbContext<JamathoDbContext>("jamathodb");

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<CategorySeederService>();
builder.Services.AddScoped<QuizSeederService>();
builder.Services.AddScoped<LessonSeederService>();

builder.Services.AddScoped<IPasswordService, PasswordService>();
builder.Services.AddScoped<ITokenService,  TokenService>();
builder.Services.AddScoped<QuizEvaluationService>();
builder.Services.AddScoped<IParentLinkService, ParentLinkService>();
builder.Services.AddScoped<StudentProgressService>();

var secretKey = builder.Configuration["JwtSettings:SecretKey"]
    ?? throw new InvalidOperationException("Brak klucza JwtSettings:SecretKey w konfiguracji.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000"
            ).AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<JamathoDbContext>();
    await dbContext.Database.MigrateAsync();

    var categorySeeder = scope.ServiceProvider.GetRequiredService<CategorySeederService>();
    await categorySeeder.SeedAsync();

    var quizSeeder = scope.ServiceProvider.GetRequiredService<QuizSeederService>();
    await quizSeeder.SeedAsync();

    var lessonSeeder = scope.ServiceProvider.GetRequiredService<LessonSeederService>();
    await lessonSeeder.SeedAsync();
}

app.MapDefaultEndpoints();

app.UseStaticFiles();

app.UseCors("FrontendPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
