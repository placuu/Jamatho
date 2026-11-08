namespace Jamatho.Api.Models.DTOs
{
    public class AuthResponseDto
    {
        public Guid Id { get; set; } 
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Token { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}
