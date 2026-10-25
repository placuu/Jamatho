namespace Jamatho.Api.Models.Entities
{
    public class Parent
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Email { get; set; } = null!;
        public string PasswordHashed { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // DisplayName do zwrotów grzecznościowych na panelu głównym np. Witaj Bogumiła!
        public string? DisplayName { get; set;  }

        // Relacje
        public List<ParentStudent> ParentStudents { get; set; } = [];
        public List<RefreshToken> RefreshTokens { get; set; } = [];
        public List<PasswordResetToken> PasswordResetTokens { get; set; } = [];
    }
}
