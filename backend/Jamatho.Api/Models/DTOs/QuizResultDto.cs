namespace Jamatho.Api.Models.DTOs
{
    public class QuizResultDto
    {
        public int TotalPointsEarned { get; set; }
        public int MaxPossiblePoints { get; set; }
        public double Percentage { get; set; }
        public bool? IsPassed { get; set; }
        public List<QuestionResultDto> QuestionResults { get; set; } = [];

        // Expienie
        public int XpEarned { get; set; }
        public int TotalXp { get; set; }
        public int NewLevel { get; set; }
        public bool IsLevelUp { get; set; }
    }

    public class QuestionResultDto
    {
        public Guid QuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsEarned { get; set; }
        public int MaxPoints { get; set; }
        public string? Explanation { get; set; }
        public List<Guid> SelectedAnswerIds { get; set; } = [];
        public List<Guid> CorrectAnswerIds { get; set; } = [];
    }
}
