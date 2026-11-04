namespace Jamatho.Api.Models.Entities
{
    public class RefreshToken
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string TokenHashed { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
        public bool IsRevoked { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Guid? StudentId { get; set; }
        public Student? Student { get; set; }

        public Guid? ParentId { get; set; }
        public Parent? Parent { get; set; }
    }
}
