namespace Jamatho.Api.Models.Entities
{
    public class QuizAttempt
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public int Score { get; set; }
        public int TimeSpentSeconds { get; set; }
        public DateTime CompletedAt { get; set; } = DateTime.UtcNow;

        public Student Student { get; set; } = null!;
        public Guid StudentId { get; set; }
        public Quiz Quiz { get; set; } = null!;
        public Guid QuizId { get; set; }

        public List<QuizAttemptDetail> AttemptDetails { get; set; } = [];
    }
}
