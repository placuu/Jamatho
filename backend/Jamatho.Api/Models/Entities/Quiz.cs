namespace Jamatho.Api.Models.Entities
{
    public class Quiz
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = null!;
        public int PassingScore { get; set; } = 70;

        public Lesson? Lesson { get; set; }
        public Guid? LessonId { get; set; }

        public string QuizType { get; set; } = "TOPIC"; // lub enum QuizType
        public int? Year { get; set; }
        public int? TimeLimitMinutes { get; set; }

        public List<QuizQuestion> QuizQuestions { get; set; } = [];
        public List<QuizAttempt> QuizAttempts { get; set; } = [];
    }
}
