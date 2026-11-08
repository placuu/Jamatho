namespace Jamatho.Api.Models.DTOs
{
    // klasa całego egzaminu po kliknięciu w dokładny kafelek 
    public class QuizAnswerDto
    {
        public Guid Id { get; set; }
        public string AnswerText { get; set; } = null!;
        public int SubQuestionGroup { get; set; } = 0;
    }
}
