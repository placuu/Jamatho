namespace Jamatho.Api.Models.DTOs
{
    // Klasa na wyświetlanie kafelek, lista wszystkich testów CKE
    public class QuizCardDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public int? Year { get; set; }
        public string QuizType { get; set; } = null!;
        public int? TimeLimitMinutes { get; set; }
        public int PassingScore { get; set; }
    }
}
