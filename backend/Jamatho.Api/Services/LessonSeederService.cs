using Jamatho.Api.Data;
using Jamatho.Api.Data.Seeds.SeedDto;
using Jamatho.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Jamatho.Api.Services
{
    public class LessonSeederService
    {
        private readonly JamathoDbContext _context;
        private readonly ILogger<LessonSeederService> _logger;
        private readonly IWebHostEnvironment _env;

        public LessonSeederService(JamathoDbContext context, ILogger<LessonSeederService> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        public async Task SeedAsync()
        {
            var seedDir = Path.Combine(_env.ContentRootPath, "Data", "Seeds", "Lessons");

            if (!Directory.Exists(seedDir))
            {
                _logger.LogWarning("Katalog nie istnieje {Path}", seedDir);
                return;
            }

            var jsonFiles = Directory.GetFiles(seedDir, "*.json", SearchOption.TopDirectoryOnly);
            if (jsonFiles.Length == 0)
            {
                _logger.LogWarning("Nie znaleziono plików w katalogu {Path}", seedDir);
                return;
            }

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var existigCategory = await _context.Categories.ToListAsync();
            var categoryCashe = existigCategory.ToDictionary(c => c.Name.ToLowerInvariant(), c => c);

            foreach (var filePath in jsonFiles)
            {
                var fileName = Path.GetFileName(filePath);

                try
                {
                    var json = await File.ReadAllTextAsync(filePath);
                    var dataSeed = JsonSerializer.Deserialize<LessonSeedDto>(json, options);

                    if (dataSeed?.Lesson == null || dataSeed.Category == null || string.IsNullOrWhiteSpace(dataSeed.Lesson.Title))
                    {
                        _logger.LogWarning("Pominięto plik {File}: nieprawidłowa struktura lub brak tytułu lekcji.", fileName);
                        continue;
                    }

                    var formattedCategoryName = dataSeed.Category.Name.Trim().ToLowerInvariant() ?? string.Empty;
                    if (!categoryCashe.TryGetValue(formattedCategoryName, out var category))
                    {
                        throw new InvalidOperationException(
                            $"Nie znaleziono kategorii '{formattedCategoryName}' w pliku lekcji '{fileName}");
                    }

                    var lessonDto = dataSeed.Lesson;

                    var exist = await _context.Lessons.AnyAsync(l => l.CategoryId == category.Id && l.Title == lessonDto.Title);

                    if (exist)
                    {
                        _logger.LogInformation("Lekcja {Title} już istenieje w bazie. Pomijana", lessonDto.Title);
                        continue;
                    }

                    var lesson = new Lesson
                    {
                        Id = Guid.NewGuid(),
                        CategoryId = category.Id,
                        Title = lessonDto.Title,
                        Content = lessonDto.Content,
                        OrderIndex = lessonDto.OrderIndex,
                        WorkedExample = lessonDto.WorkedExample
                    };

                    foreach(var qDto in lessonDto.lessonPractiseProblems)
                    {
                        var problem = new PracticeProblem
                        {
                            Id = Guid.NewGuid(),
                            LessonId = lesson.Id,
                            QuestionText = qDto.QuestionText,
                            CorrectAnswere = qDto.CorrectAnswere,
                            OrderIndex = qDto.OrderIndex,
                        };

                        foreach(var hDto in qDto.lessonPractseHintDtos)
                        {
                            problem.PracticeHints.Add(new PracticeHint
                            {
                                Id = Guid.NewGuid(),
                                ProblemId = problem.Id,
                                HintText = hDto.HintText,
                                StepOrder = hDto.StepOrder,
                            });
                        }

                        lesson.PracticeProblems.Add(problem);
                    }

                    _context.Lessons.Add(lesson);
                    await _context.SaveChangesAsync();
                    _logger.LogInformation("Seedowanie zakonczone");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Błąd podczas seedowania pliku: {File}", fileName);
                }
            }
        }
    }
}
