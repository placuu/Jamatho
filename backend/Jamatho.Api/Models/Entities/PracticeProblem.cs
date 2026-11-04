namespace Jamatho.Api.Models.Entities
{
    public class PracticeProblem
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string QuestionText { get; set; } = null!;
        public string CorrectAnswere { get; set; } = null!;
        public int OrderIndex { get; set; } = 1;

        public Lesson Lesson { get; set; } = null!;
        public Guid LessonId { get; set; }

        public List<PracticeHint> PracticeHints { get; set; } = [];
    }
}
