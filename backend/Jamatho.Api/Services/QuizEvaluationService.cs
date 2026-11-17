using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Services
{
    public class QuizEvaluationService
    {
        private readonly JamathoDbContext _context;

        public QuizEvaluationService(JamathoDbContext context)
        {
            _context = context;
        }

        public async Task<QuizResultDto> EvaluateAsync(SubmitQuizRequestDto submitQuiz, Guid studentId, CancellationToken cancellationToken = default)
        {
            var questionsIds = submitQuiz.Answers.Select(a => a.QuestionId).Distinct().ToList();
            var questions = await _context.QuizQuestions
                .AsNoTracking()
                .Include(q => q.QuizAnswers)
                .Where(q => questionsIds.Contains(q.Id))
                .ToDictionaryAsync(q => q.Id, cancellationToken);

            List<QuestionResultDto> questionResults = [];
            int totalEarned = 0;
            int maxPossible = 0;

            foreach (var answer in submitQuiz.Answers)
            {
                if (!questions.TryGetValue(answer.QuestionId, out var question))
                {
                    continue;
                }

                maxPossible += question.Points;

                var correctAnswerIds = question.QuizAnswers
                    .Where(a => a.IsCorrect)
                    .Select(a => a.Id)
                    .ToHashSet();

                var selectedAnswerIds = answer.SelectedAnswers.ToHashSet();

                int pointsEarned = 0;
                bool isCorrect = false;

                if (selectedAnswerIds.Count == 1 && correctAnswerIds.SetEquals(selectedAnswerIds))
                {
                    pointsEarned = question.Points;
                    isCorrect = true;
                }
                else if (selectedAnswerIds.Count > 1 && correctAnswerIds.SetEquals(selectedAnswerIds))
                {
                    pointsEarned = question.Points;
                    isCorrect = true;
                }
                else if (question.QuestionType == "SELF_CHECK")
                {
                    var claimedPoints = answer.SelfAssessedPoints ?? 0;
                    pointsEarned = Math.Clamp(claimedPoints, 0, question.Points);
                    isCorrect = pointsEarned == question.Points;
                }

                totalEarned += pointsEarned;

                questionResults.Add(new QuestionResultDto
                {
                    QuestionId = question.Id,
                    IsCorrect = isCorrect,
                    PointsEarned = pointsEarned,
                    MaxPoints = question.Points,
                    Explanation = question.Explanation,
                    SelectedAnswerIds = selectedAnswerIds.ToList(),
                    CorrectAnswerIds = correctAnswerIds.ToList()
                });
            }

            double percentage = maxPossible > 0 ? Math.Round((double)totalEarned / maxPossible * 100, 1) : 0;

            bool? isPassed = null;
            if (submitQuiz.QuizId.HasValue)
            {
                var quiz = await _context.Quizzes
                    .AsNoTracking()
                    .FirstOrDefaultAsync(q => q.Id == submitQuiz.QuizId.Value, cancellationToken);

                if (quiz != null && quiz.PassingScore > 0)
                {
                    isPassed = percentage >= quiz.PassingScore;
                }
            }

            int xpEarned = 0;
            int totalXp = 0;
            int newLevel = 1;
            bool isLevelUp = false;

            if (studentId != Guid.Empty)
            {
                var student = await _context.Students
                    .FirstOrDefaultAsync(s => s.Id == studentId, cancellationToken);

                if (student != null)
                {
                    xpEarned = 10 + (totalEarned * 3) + (isPassed == true ? 25 : 0);
                    int currentLevel = student.Level;

                    student.Experience += xpEarned;
                    student.Level = (student.Experience / 100) + 1;
                    student.LastActivityDate = DateTime.UtcNow;
                    
                    await _context.SaveChangesAsync(cancellationToken);

                    totalXp = student.Experience;
                    newLevel = student.Level;
                    isLevelUp = newLevel > currentLevel;
                }
            }

            return new QuizResultDto
            {
                TotalPointsEarned = totalEarned,
                MaxPossiblePoints = maxPossible,
                Percentage = percentage,
                IsPassed = isPassed,
                XpEarned = xpEarned,
                TotalXp = totalXp,
                IsLevelUp = isLevelUp,
                NewLevel = newLevel,
                QuestionResults = questionResults
            };
        }
    }
}
