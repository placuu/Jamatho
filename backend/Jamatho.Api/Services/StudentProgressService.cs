using Jamatho.Api.Models.Entities;

namespace Jamatho.Api.Services
{
    public class StudentProgressService
    {
        public void UpdateStreak(Student student)
        {
            var today = DateTime.Now;
            var lastActivity = student.LastActivityDate?.Date;

            if (lastActivity == today)
            {
                return;
            }

            if (lastActivity == today.AddDays(-1))
            {
                student.Streak += 1;
            }
            else
            {
                student.Streak = 1;
            }

            student.LastActivityDate = DateTime.UtcNow;
        }

        public bool AddXp(Student student, int xpToAdd)
        {
            int previousLevel = student.Level;
            student.Experience += xpToAdd;
            student.Level = (student.Experience / 100) + 1;

            return student.Level > previousLevel;
        }
    }
}
