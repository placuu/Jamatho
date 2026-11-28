namespace Jamatho.Api.Models.DTOs
{
    public class CompleteLessonResponseDto
    {
        public bool IsCompleted { get; set; }
        public bool AlreadyCompleted { get; set; }
        public int XpEarned { get; set; }
        public int Experience { get; set; }
        public int Level { get; set; }
        public bool IsLevelUp { get; set; }
        public int Streak { get; set; }
    }
}
