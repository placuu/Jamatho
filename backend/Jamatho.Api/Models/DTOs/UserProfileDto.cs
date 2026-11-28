namespace Jamatho.Api.Models.DTOs
{
    public class UserProfileDto
    {
        public string Id { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Role { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
        public int Level { get; set; }
        public int Experience { get; set; }
        public int Streak { get; set; }
    }
}
