namespace Jamatho.Api.Models.Entities
{
    public class Student
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; } = null!;
        public string PasswordHashed { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastActivityDate { get; set; }

        // Grywalizacja
        public int Streak { get; set; } = 0;
        public int Experience { get; set; } = 0;
        public int Level { get; set; } = 1;

        // Relacje
        public List<ParentStudent> ParentStudents { get; set; } = [];
        public List<StudentInviteCode> StudentInviteCodes { get; set; } = [];
        public List<RefreshToken> RefreshTokens { get; set; } = [];
        public List<PasswordResetToken> PasswordResetTokens { get; set; } = [];
    }
}
