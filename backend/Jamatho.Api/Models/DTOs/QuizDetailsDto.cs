namespace Jamatho.Api.Models.DTOs
{
    // klasa całego egzaminu po kliknięciu w dokładny kafelek 
    public class QuizDetailsDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public int? Year { get; set; }
        public int? TimeLimitMinutes { get; set; }
        public int PassingScore { get; set; }
        public List<QuizQuestionDto> QuizQuestions { get; set; } = [];
    }
}
