namespace Jamatho.Api.Models.Entities
{
    public class QuizAttemptDetail
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public QuizAttempt QuizAttempt { get; set; } = null!;
        public Guid AttemptId { get; set; }
        public QuizQuestion QuizQuestion { get; set; } = null!;
        public Guid QuestionId { get; set; }
        public QuizAnswer? QuizAnswer { get; set; }
        public Guid? QuizAnswerId { get; set; }

        public int AwardedPoints { get; set; } = 0;

    }
}
