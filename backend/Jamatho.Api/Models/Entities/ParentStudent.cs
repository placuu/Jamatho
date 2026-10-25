namespace Jamatho.Api.Models.Entities
{
    public class ParentStudent
    {
        public Guid StudentId { get; set; }
        public Guid ParentId {  get; set; }
        public Student Student { get; set; } = null!;
        public Parent Parent { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsConfirmed { get; set; } = false;
    }
}
