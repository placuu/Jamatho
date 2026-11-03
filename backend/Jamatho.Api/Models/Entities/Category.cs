namespace Jamatho.Api.Models.Entities
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        //public string? icon { get; set; } DO UZGODNIENIA

        public List<Lesson> Lessons { get; set; } = [];
    }
}
