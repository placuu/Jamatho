using System.Security.Claims;
using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly JamathoDbContext _context;

        public CategoriesController(JamathoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategory(CancellationToken cancellationToken)
        {
            var userId = GetCurrentUserId();

            var category = await _context.Categories
                .AsNoTracking()
                .OrderBy(c => c.Name)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LessonsCount = c.Lessons.Count,
                    CompletedLessons = userId == Guid.Empty
                        ? 0 : c.Lessons.Count(l => l.LessonProgresses.Any(lp => lp.StudentId == userId && lp.IsCompleted))
                })
                .ToListAsync(cancellationToken);

            return Ok(category);
        }

        private Guid GetCurrentUserId()
        {
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

            return Guid.TryParse(idClaim, out var userId) ? userId : Guid.Empty;
        }
    }
}
