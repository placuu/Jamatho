using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Models.Entities;
using Jamatho.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : BaseApiController
    {
        private readonly JamathoDbContext _context;
        private readonly StudentProgressService _progressService;

        public LessonController(JamathoDbContext context, StudentProgressService progressService)
        {
            _context = context;
            _progressService = progressService;
        }

        [HttpGet("category/{categoryId:guid}")]
        public async Task<ActionResult<IEnumerable<LessonCardDto>>> GetLessonsByCategory(Guid categoryId, CancellationToken cancellationToken)
        {
            var userId = GetCurrentUserId();

            var lessons = await _context.Lessons
                .AsNoTracking()
                .Where(l => l.CategoryId == categoryId)
                .OrderBy(l => l.OrderIndex)
                .Select(l => new LessonCardDto
                {
                    Id = l.Id,
                    OrderIndex = l.OrderIndex,
                    Title = l.Title,
                    IsCompleted = userId != Guid.Empty && l.LessonProgresses.Any(lp => lp.StudentId == userId && lp.IsCompleted)
                })
                .ToListAsync(cancellationToken);

            return Ok(lessons);
        }


        [HttpGet("{id:guid}")]
        public async Task<ActionResult<LessonDetailsDto>> GetLessonById(Guid id, CancellationToken cancellationToken)
        {
            var userId = GetCurrentUserId();

            var lesson = await _context.Lessons
                .AsNoTracking()
                .Where(l => l.Id == id)
                .Select(l => new LessonDetailsDto
                {
                    Id = l.Id,
                    CategoryId = l.CategoryId,
                    CategoryName = l.Category.Name,
                    OrderIndex = l.OrderIndex,
                    Title = l.Title,
                    Content = l.Content,
                    WorkedExample = l.WorkedExample,
                    IsCompleted = userId != Guid.Empty && l.LessonProgresses.Any(lp => lp.IsCompleted && lp.StudentId == userId),
                    PracticeProblems = l.PracticeProblems
                        .OrderBy(pp => pp.OrderIndex)
                        .Select(pp => new PracticeProblemDto
                        {
                            Id = pp.Id,
                            OrderIndex = pp.OrderIndex,
                            QuestionText = pp.QuestionText,
                            CorrectAnswere = pp.CorrectAnswere,
                            PracticeHints = pp.PracticeHints
                                .OrderBy(ph => ph.StepOrder)
                                .Select(ph => new PracticeHintDto
                                {
                                    Id = ph.Id,
                                    StepOrder = ph.StepOrder,
                                    HintText = ph.HintText,
                                })
                                .ToList()
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync(cancellationToken);

            if(lesson == null)
            {
                return NotFound(new { message = "Nie znaleziono lekcji" });
            }

            return Ok(lesson);
        }

        [Authorize(Roles="Student")]
        [HttpPost("{id:guid}/complete")]
        public async Task<ActionResult<CompleteLessonResponseDto>> CompleteLesson(Guid Id, CancellationToken cancellationToken)
        {
            var userId = GetCurrentUserId();

            if(userId == Guid.Empty)
            {
                return Unauthorized();
            }

            var lessonExist = await _context.Lessons.AnyAsync(l => l.Id == Id, cancellationToken);
            if (!lessonExist)
            {
                return NotFound(new { message = "Nie znaleziono lekcji." });
            }

            var student = await _context.Students.FirstOrDefaultAsync(s => s.Id == userId, cancellationToken);
            if (student == null)
            {
                return NotFound(new { message = "Nie znaleziono profilu ucznia." });
            }

            var progress = await _context.LessonProgresses.FirstOrDefaultAsync(lp => lp.LessonId == Id && lp.StudentId == userId, cancellationToken);

            if(progress != null && progress.IsCompleted)
            {
                return Ok(new CompleteLessonResponseDto
                {
                    IsCompleted = true,
                    AlreadyCompleted = true,
                    XpEarned = 0,
                    Experience = student.Experience,
                    Level = student.Level,
                    IsLevelUp = false,
                    Streak = student.Streak
                });
            }

            if (progress == null)
            {
                progress = new LessonProgress
                {
                    LessonId = Id,
                    StudentId = userId,
                    IsCompleted = true,
                    CompletedAt = DateTime.UtcNow
                };
                _context.LessonProgresses.Add(progress);
            }
            else
            {
                progress.IsCompleted = true;
                progress.CompletedAt = DateTime.UtcNow;
            }

            const int lessonXp = 25;
            bool isLevelUp = _progressService.AddXp(student, lessonXp);
            _progressService.UpdateStreak(student);

            await _context.SaveChangesAsync(cancellationToken);

            return Ok(new CompleteLessonResponseDto
            {
                IsCompleted = true,
                AlreadyCompleted = false,
                XpEarned = lessonXp,
                Experience = student.Experience,
                Level = student.Level,
                IsLevelUp = isLevelUp,
                Streak = student.Streak
            });
        }
    }
}
