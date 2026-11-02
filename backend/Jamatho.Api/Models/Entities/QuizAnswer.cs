namespace Jamatho.Api.Models.Entities
{
    public class QuizAnswer
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string AnswerText { get; set; } = null!;
        public bool IsCorrect { get; set; } = false;

        public QuizQuestion QuizQuestion { get; set; } = null!;
        public Guid QuestionId { get; set; }

        public List<QuizAttemptDetail> AttemptDetails { get; set; } = [];
    }
}
