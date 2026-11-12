using System.ComponentModel.DataAnnotations;

namespace Jamatho.Api.Models.DTOs
{
    public class RegisterStudentDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Username { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = null!;
    }
}
