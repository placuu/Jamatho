namespace Jamatho.Api.Models.DTOs
{
    public class SubmitQuizRequestDto
    {
        public Guid? QuizId { get; set; }
        public List<SubmittedAnswerDto> Answers { get; set; } = [];
    }

    public class SubmittedAnswerDto
    {
        public Guid QuestionId { get; set; }
        public List<Guid> SelectedAnswers { get; set; } = [];
        public int? SelfAssessedPoints { get; set; }
    }
}
