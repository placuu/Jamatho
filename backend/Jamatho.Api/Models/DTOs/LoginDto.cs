using System.ComponentModel.DataAnnotations;

namespace Jamatho.Api.Models.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Password { get; set; } = null!;
    }
}
