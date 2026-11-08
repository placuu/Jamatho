using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : ControllerBase
    {
        private readonly JamathoDbContext _context;

        public QuizzesController(JamathoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuizCardDto>>> GetQuizzes()
        {
            var quizzes = await _context.Quizzes
                .AsNoTracking()
                .OrderByDescending(q => q.Year)
                .Select(q => new QuizCardDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Year = q.Year,
                    QuizType = q.QuizType,
                    TimeLimitMinutes = q.TimeLimitMinutes,
                    PassingScore = q.PassingScore
                })
                .ToListAsync();

            return Ok(quizzes);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<QuizDetailsDto>> GetQuizById(Guid id)
        {
            var quiz = await _context.Quizzes
                .AsNoTracking()
                .Where(q => q.Id == id)
                .Select(q => new QuizDetailsDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Year = q.Year,
                    TimeLimitMinutes = q.TimeLimitMinutes,
                    PassingScore = q.PassingScore,
                    QuizQuestions = q.QuizQuestions
                        .Select(qq => new QuizQuestionDto
                        {
                            Id = qq.Id,
                            QuestionText = qq.QuestionText,
                            QuestionType = qq.QuestionType,
                            Points = qq.Points,
                            ImageUrl = qq.ImageUrl,
                            QuizAnswers = qq.QuizAnswers
                                .Select(qa => new QuizAnswerDto
                                {
                                    Id = qa.Id,
                                    AnswerText = qa.AnswerText,
                                    SubQuestionGroup = qa.SubQuestionGroup
                                }).ToList()
                        }).ToList()
                })
                .FirstOrDefaultAsync();

            if(quiz == null)
            {
                return NotFound($"Nie znaleziono testu o id {id}");
            }
            return Ok(quiz);
        }
    }
}
