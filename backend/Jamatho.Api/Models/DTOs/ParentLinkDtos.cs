namespace Jamatho.Api.Models.DTOs
{
    public class InviteCodeResponseDto
    {
        public string Code { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
    }

    public class LinkChildRequestDto
    {
        public string Code { get; set; } = null!;
    }

    public class LinkedChildDto 
    {
        public Guid LinkId { get; set; }
        public Guid StudentId { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int Level { get; set; } 
        public int Experience { get; set; }
        public int Streak { get; set; }
        public DateTime? LastActivityDate { get; set; }
        public bool IsConfirmed { get; set; }
        public DateTime LinkedAt { get; set; }
    }
}
