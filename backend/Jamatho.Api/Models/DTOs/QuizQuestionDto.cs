namespace Jamatho.Api.Models.DTOs
{
    // klasa całego egzaminu po kliknięciu w dokładny kafelek 
    public class QuizQuestionDto
    {
        public Guid Id { get; set; }
        public string QuestionText { get; set; } = null!;
        public string QuestionType { get; set; } = null!;
        public int Points { get; set; }
        public string? ImageUrl { get; set; }
        public List<QuizAnswerDto> QuizAnswers { get; set; } = [];
    }
}
