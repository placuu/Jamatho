namespace Jamatho.Api.Models.Entities
{
    public class PasswordResetToken
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string TokenHashed { get; set; } = null!;
        public bool IsUsed { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; }

        public Guid? StudentId { get; set; }
        public Student? Student { get; set; }

        public Guid? ParentId { get; set; }
        public Parent? Parent { get; set; }
    }
}
