using System.Text.Json;
using Jamatho.Api.Data;
using Jamatho.Api.Data.Seeds.SeedDto;
using Jamatho.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Jamatho.Api.Services;

public class QuizSeederService
{
    private readonly JamathoDbContext _context;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger _logger;

    public QuizSeederService(JamathoDbContext context, IWebHostEnvironment env, ILogger<QuizSeederService> logger)
    {
        _context = context;
        _env = env;
        _logger = logger;
    }

    public async Task SeedAsync()
    {
        var seedDir = Path.Combine(_env.ContentRootPath, "Data", "Seeds");
        if (!Directory.Exists(seedDir))
        {
            _logger.LogWarning("Katalog nie istnieje {Path}", seedDir);
            return;
        }

        var jsonFiles = Directory.GetFiles(seedDir, "*.json", SearchOption.TopDirectoryOnly);
        if (jsonFiles.Length == 0)
        {
            _logger.LogInformation("Brak plików JSON do zseedowania w katalogu: {Path}", seedDir);
            return;
        }

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var existingCategories = await _context.Categories.ToListAsync();
        var categoryCache = existingCategories.ToDictionary(
            c => c.Name.ToLowerInvariant(),
            c => c
            );

        foreach (var filePath in jsonFiles)
        {
            var fileName = Path.GetFileName(filePath);

            try
            {
                var json = await File.ReadAllTextAsync(filePath);
                var examDto = JsonSerializer.Deserialize<QuizExamSeedDto>(json, options);

                if (examDto == null || string.IsNullOrWhiteSpace(examDto.QuizTitle))
                {
                    _logger.LogWarning("Pominięto plik {File}: nieprawidłowa struktura lub brak tytułu.", fileName);
                    continue;
                }

                var exist = await _context.Quizzes.AnyAsync(q => q.Title == examDto.QuizTitle && q.Year == examDto.Year);
                if (exist)
                {
                    _logger.LogInformation("Arkusz '{Title}' z {Year} roku z pliku {File} już istnieje w bazie. Pomijam.", examDto.QuizTitle, examDto.Year, fileName);
                    continue;
                }

                var quiz = new Quiz
                {
                    Id = Guid.NewGuid(),
                    Title = examDto.QuizTitle,
                    QuizType = examDto.QuizType,
                    Year = examDto.Year,
                    TimeLimitMinutes = examDto.TimeLimitMinutes,
                    PassingScore = examDto.PassingScore,
                    LessonId = null
                };

                foreach (var qDto in examDto.Questions)
                {
                    var formattedCategoryName = FormatSlugToName(qDto.CategorySlug);
                    var categoryKey = formattedCategoryName.ToLowerInvariant();

                    if (!categoryCache.TryGetValue(categoryKey, out var category))
                    {
                        category = new Category
                        {
                            Id = Guid.NewGuid(),
                            Name = formattedCategoryName
                        };
                        _context.Categories.Add(category);
                        categoryCache[categoryKey] = category;
                    }

                    var question = new QuizQuestion
                    {
                        Id = Guid.NewGuid(),
                        QuizId = quiz.Id,
                        CategoryId = category.Id,
                        QuestionType = qDto.QuestionType,
                        QuestionText = qDto.QuestionText,
                        ImageUrl = qDto.ImageUrl,
                        Points = qDto.Points,
                        Explanation = qDto.Explanation
                    };

                    foreach (var aDto in qDto.Answers)
                    {
                        question.QuizAnswers.Add(new QuizAnswer
                        {
                            Id = Guid.NewGuid(),
                            QuestionId = question.Id,
                            AnswerText = aDto.AnswerText,
                            IsCorrect = aDto.IsCorrect,
                            SubQuestionGroup = aDto.SubQuestionGroup
                        });
                    }
                    quiz.QuizQuestions.Add(question);
                }

                _context.Quizzes.Add(quiz);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Pomyślnie załadowano arkusz '{Title}' ({Count} zadań).", quiz.Title, quiz.QuizQuestions.Count);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Błąd podczas seedowania pliku: {File}", fileName);
            }
        }
    }
    private static string FormatSlugToName(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug)) return "Inne";
        var name = slug.Replace("-", " ");
        return char.ToUpper(name[0]) + name[1..];
    }
}