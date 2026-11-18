using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : BaseApiController
    {
        private readonly JamathoDbContext _context;
        private readonly QuizEvaluationService _quizEvaluation;

        public QuizzesController(JamathoDbContext context, QuizEvaluationService quizEvaluation)
        {
            _context = context;
            _quizEvaluation = quizEvaluation;
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
                        .OrderBy(qq => qq.QuestionNumber)
                        .Select(qq => new QuizQuestionDto
                        {
                            Id = qq.Id,
                            QuestionNumber = qq.QuestionNumber,
                            QuestionText = qq.QuestionText,
                            QuestionType = qq.QuestionType,
                            Points = qq.Points,
                            ImageUrl = qq.ImageUrl,
                            QuizAnswers = qq.QuizAnswers
                                .OrderBy(qa => qa.SubQuestionGroup)
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

        [HttpPost("submit")]
        public async Task<ActionResult<QuizResultDto>> SubmitQuiz([FromBody]SubmitQuizRequestDto submitQuiz, CancellationToken cancellationToken = default)
        {
            if(submitQuiz.Answers == null || submitQuiz.Answers.Count == 0)
            {
                return BadRequest("Lista odpowiedzi nie może być pusta.");
            }

            var studentId = GetCurrentUserId();

            var result = await _quizEvaluation.EvaluateAsync(submitQuiz, studentId, cancellationToken);

            return Ok(result);
        } 
    }
}
