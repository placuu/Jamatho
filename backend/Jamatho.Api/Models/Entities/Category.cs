namespace Jamatho.Api.Models.Entities
{
    public class Category
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string name { get; set; } = null!;
        public string? description { get; set; }
        //public string? icon { get; set; } DO UZGODNIENIA

        public List<Lesson> Lessons { get; set; } = [];
    }
}
