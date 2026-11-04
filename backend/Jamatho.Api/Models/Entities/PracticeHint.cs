namespace Jamatho.Api.Models.Entities
{
    public class PracticeHint
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string HintText { get; set; } = null!;
        public int StepOrder { get; set; } = 0;

        public PracticeProblem Problem { get; set; } = null!;
        public Guid ProblemId { get; set; }
    }
}
