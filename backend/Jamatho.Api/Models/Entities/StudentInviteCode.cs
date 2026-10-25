namespace Jamatho.Api.Models.Entities
{
    public class StudentInviteCode
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid StudentId { get; set; }
        public Student Student { get; set; } = null!;
        public string Code { get; set; } = null!;
        public bool IsUsed { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; }
    }
}
