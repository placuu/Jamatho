using System.ComponentModel.DataAnnotations;

namespace Jamatho.Api.Models.DTOs
{
    public class RegisterParentDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;

        [MaxLength(30)]
        public string? DisplayName { get; set; }
    }
}
