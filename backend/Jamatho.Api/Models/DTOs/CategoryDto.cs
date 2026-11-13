namespace Jamatho.Api.Models.DTOs
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int LessonsCount { get; set; }
        public int CompletedLessons { get; set; }
    }
}
