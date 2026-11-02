namespace Jamatho.Api.Models.Entities
{
    public class Lesson
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string WorkedExample { get; set; } = null!;
        public int OrderIndex { get; set; } = 1;

        public Category Category { get; set; } = null!;
        public Guid CategoryId { get; set; }

        public Quiz? Quiz { get; set; }

        public List<LessonProgress> LessonProgresses { get; set; } = [];
        public List<PracticeProblem> PracticeProblems { get; set; } = [];
    }
}
