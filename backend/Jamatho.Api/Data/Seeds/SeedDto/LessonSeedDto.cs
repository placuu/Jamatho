using System.Text.Json.Serialization;

namespace Jamatho.Api.Data.Seeds.SeedDto
{
    public class LessonSeedDto
    {
        public LessonCategoryDto Category { get; set; } = null!;
        public LessonDto Lesson { get; set; } = null!;
    }

    public class LessonCategoryDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
    }

    public class LessonDto
    {
        public int OrderIndex { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string WorkedExample { get; set; } = null!;

        [JsonPropertyName("practiceProblems")]
        public List<LessonPractiseProblemDto> lessonPractiseProblems { get; set; } = [];
    }

    public class LessonPractiseProblemDto
    {
        public int OrderIndex { get; set; } 
        public string QuestionText { get; set; } = null!;
        public string CorrectAnswere { get; set; } = null!;

        [JsonPropertyName("hints")]
        public List<LessonPractseHintDto> lessonPractseHintDtos { get; set; } = [];
    }

    public class LessonPractseHintDto
    {
        public int StepOrder { get; set; }
        public string HintText { get; set; } = null!;
    }
}
