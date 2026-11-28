using Jamatho.Api.Models.Entities;

namespace Jamatho.Api.Models.DTOs
{
    public class LessonDetailsDto
    {
        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;
        public int OrderIndex { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string WorkedExample { get; set; } = null!;
        public bool IsCompleted { get; set; }
        public List<PracticeProblemDto> PracticeProblems { get; set; } = [];
    }

    public class PracticeProblemDto
    {
        public Guid Id { get; set; }
        public int OrderIndex { get; set; }
        public string QuestionText { get; set; } = null!;
        public string CorrectAnswere { get; set; } = null!;
        public List<PracticeHintDto> PracticeHints { get; set; } = [];
    }

    public class PracticeHintDto
    {
        public Guid Id { get; set; }
        public int StepOrder { get; set; }
        public string HintText {  get; set; } = null!;
    }
}
