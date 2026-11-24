using System.Text.Json.Serialization;

namespace Jamatho.Api.Data.Seeds.SeedDto
{
    public class CategorySeedDto
    {
        [JsonPropertyName("category_index")]
        public int CategoryIndex { get; set; }

        public string name { get; set; } = null!;
        public string? description { get; set; }

    }
}
