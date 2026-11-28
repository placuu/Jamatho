using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : BaseApiController
    {
        private readonly JamathoDbContext _context;

        public LessonController(JamathoDbContext context)
        {
            _context = context;
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
    }
}
