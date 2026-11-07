namespace Jamatho.Api.Data.Seeds.SeedDto
{
    public class QuizExamSeedDto
    {
        public string QuizTitle { get; set; } = null!;
        public string QuizType { get; set; } = "FULL_EXAM";
        public int Year { get; set; }
        public int TimeLimitMinutes { get; set; }
        public int PassingScore { get; set; }
        public List<QuizQuestionSeedDto> Questions { get; set; } = [];
    }

    public class QuizQuestionSeedDto
    {
        public int QuestionNumber { get; set; }
        public string CategorySlug { get; set; } = null!;
        public string QuestionType { get; set; } = "SINGLE_CHOICE";
        public string QuestionText { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public int Points { get; set; } = 1;
        public string? Explanation { get; set; }
        public List<QuizAnswerSeedDto> Answers { get; set; } = [];
    }

    public class QuizAnswerSeedDto
    {
        public string AnswerText { get; set; } = null!;
        public bool IsCorrect { get; set; }
        public int SubQuestionGroup { get; set; }
    }
}
