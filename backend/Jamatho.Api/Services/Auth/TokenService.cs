using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Jamatho.Api.Models.Entities;
using Microsoft.IdentityModel.Tokens;

namespace Jamatho.Api.Services.Auth;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateStudentToken(Student student)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, student.Id.ToString()),
            new(ClaimTypes.Name, student.Username),
            new(ClaimTypes.Email, student.Email),
            new(ClaimTypes.Role, "Student")
        };

        return CreateJwtToken(claims);
    }

    public string GenerateParenToken(Parent parent)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, parent.Id.ToString()),
            new(ClaimTypes.Email, parent.Email),
            new(ClaimTypes.Role, "Parent"),
            new("displayName", parent.DisplayName ?? string.Empty)
        };

        return CreateJwtToken(claims);
    }

    private string CreateJwtToken(IEnumerable<Claim> claims)
    {
        var secretKey = _configuration["JwtSettings:SecretKey"]
            ?? throw new InvalidOperationException("Brak klucza JwtSettings:SecretKey w konfiguracji.");

        var issuer = _configuration["JwtSettings:Issuer"];
        var audience = _configuration["JwtSettings:Audience"];
        var expiryMinutes = int.Parse(_configuration["JwtSettings:ExpiryMinutes"] ?? "1440");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}