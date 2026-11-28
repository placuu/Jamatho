namespace Jamatho.Api.Models.DTOs
{
    public class LessonCardDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public int OrderIndex { get; set; }
        public bool IsCompleted { get; set; }
    }
}
