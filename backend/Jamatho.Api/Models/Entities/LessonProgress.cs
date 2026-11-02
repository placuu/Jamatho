namespace Jamatho.Api.Models.Entities
{
    public class LessonProgress
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public bool IsCompleted { get; set; } = false;
        public int TimeSpentSeconds { get; set; } = 0;
        public DateTime CompletedAt { get; set; }

        public Student Student { get; set; } = null!;
        public Guid StudentId { get; set; }
        public Lesson Lesson { get; set; } = null!;
        public Guid LessonId { get; set; }
    }
}
