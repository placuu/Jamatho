using System.Text.Json;
using Jamatho.Api.Data;
using Jamatho.Api.Data.Seeds.SeedDto;
using Jamatho.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Services
{
    public class CategorySeederService
    {
        private readonly JamathoDbContext _context;
        private readonly ILogger<CategorySeederService> _logger;
        private readonly IWebHostEnvironment _env;

        public CategorySeederService(JamathoDbContext context, ILogger<CategorySeederService> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        public async Task SeedAsync()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Data", "Seeds", "Categories", "dzialy_e8_matematyka.json");
            if (!File.Exists(filePath))
            {
                _logger.LogWarning("Nie znaleziono pliku kategorii: {FilePath}", filePath);
                return;
            }

            var json = await File.ReadAllTextAsync(filePath);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var seedCategories = JsonSerializer.Deserialize<List<CategorySeedDto>>(json, options);

            if (seedCategories == null || seedCategories.Count == 0)
            {
                return;
            }

            var existingCategories = await _context.Categories.ToDictionaryAsync(c => c.Name, StringComparer.OrdinalIgnoreCase);

            foreach(var item in seedCategories.OrderBy(c => c.CategoryIndex))
            {
                var trimmedName = item.name.Trim();

                if(existingCategories.TryGetValue(trimmedName, out var existing))
                {
                    existing.Description = item.description;
                    existing.CategoryIndex = item.CategoryIndex;
                }
                else
                {
                    var newCategory = new Category
                    {
                        Id = Guid.NewGuid(),
                        Name = trimmedName,
                        Description = item.description,
                        CategoryIndex = item.CategoryIndex
                    };

                    _context.Categories.Add(newCategory);
                    existingCategories[trimmedName] = newCategory;
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
