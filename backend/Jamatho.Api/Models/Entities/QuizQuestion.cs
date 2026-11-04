namespace Jamatho.Api.Models.Entities
{
    public class QuizQuestion
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string QuestionText { get; set; } = null!;
        public int Points { get; set; } = 1;

        public Quiz Quiz { get; set; } = null!;
        public Guid QuizId { get; set; }

        public List<QuizAnswer> QuizAnswers { get; set; } = [];
        public List<QuizAttemptDetail> AttemptDetails { get; set; } = [];
    }
}
