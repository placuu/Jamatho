namespace Jamatho.Api.Models.Entities
{
    public class QuizQuestion
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string QuestionText { get; set; } = null!;
        public int Points { get; set; } = 1;
        public string QuestionType { get; set; } = "SINGLE_CHOICE"; // lub enum QuestionType
        public string? ImageUrl { get; set; }
        public string? Explanation { get; set; }

        public Quiz Quiz { get; set; } = null!;
        public Guid QuizId { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public List<QuizAnswer> QuizAnswers { get; set; } = [];
        public List<QuizAttemptDetail> AttemptDetails { get; set; } = [];
    }
}
