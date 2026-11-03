using Jamatho.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Jamatho.Api.Data
{
    public class JamathoDbContext : DbContext
    {
        public JamathoDbContext(DbContextOptions<JamathoDbContext> options) : base(options)
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Parent> Parents { get; set; }
        public DbSet<ParentStudent> ParentStudents { get; set; }
        public DbSet<StudentInviteCode> StudentInviteCodes { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<LessonProgress> LessonProgresses { get; set; }
        public DbSet<PracticeHint> PracticeHints { get; set; }
        public DbSet<PracticeProblem> PracticeProblems { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizAnswer> QuizAnswers { get; set; }
        public DbSet<QuizAttempt> QuizAttempts { get; set; }
        public DbSet<QuizAttemptDetail> QuizAttemptDetails { get; set; }
        public DbSet<QuizQuestion> QuizQuestions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1. Moduł Użytkowników i Autoryzacji
            modelBuilder.Entity<ParentStudent>()
                .HasIndex(ps => new { ps.StudentId, ps.ParentId })
                .IsUnique();

            modelBuilder.Entity<ParentStudent>()
                .HasOne(ps => ps.Parent)
                .WithMany(p => p.ParentStudents)
                .HasForeignKey(ps => ps.ParentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ParentStudent>()
                .HasOne(ps => ps.Student)
                .WithMany(s => s.ParentStudents)
                .HasForeignKey(ps => ps.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Student>()
                .HasIndex(s => s.Username)
                .IsUnique();

            modelBuilder.Entity<Student>()
                .HasIndex(s => s.Email)
                .IsUnique();

            modelBuilder.Entity<Parent>()
                .HasIndex(p => p.Email)
                .IsUnique();

            modelBuilder.Entity<RefreshToken>()
                .HasIndex(rt => rt.TokenHashed)
                .IsUnique();

            modelBuilder.Entity<StudentInviteCode>()
                .HasIndex(sic => sic.Code)
                .IsUnique();

            //2.Moduł Edukacyjny(Kategorie, Lekcje, Postęp)
            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();

            modelBuilder.Entity<Lesson>()
                .HasOne(l => l.Category)
                .WithMany(c=> c.Lessons)
                .HasForeignKey(l => l.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LessonProgress>()
                .HasIndex(lp => new { lp.LessonId, lp.StudentId })
                .IsUnique();

            modelBuilder.Entity<LessonProgress>()
                .HasOne(lp => lp.Lesson)
                .WithMany(l => l.LessonProgresses)
                .HasForeignKey(lp => lp.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<LessonProgress>()
                .HasOne(lp => lp.Student)
                .WithMany(s => s.LessonProgress)
                .HasForeignKey(lp => lp.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            //3.Zadania Praktyczne(PracticeProblem, PracticeHint)
            modelBuilder.Entity<PracticeHint>()
                .HasOne(ph => ph.Problem)
                .WithMany(p => p.PracticeHints)
                .HasForeignKey(ph => ph.ProblemId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PracticeProblem>()
                .HasOne(pp => pp.Lesson)
                .WithMany(l => l.PracticeProblems)
                .HasForeignKey(pp => pp.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            //4.Moduł Quizów(Quiz, Pytania, Odpowiedzi)
            modelBuilder.Entity<Quiz>()
                .HasIndex(q => q.LessonId)
                .IsUnique();

            modelBuilder.Entity<Quiz>()
                .HasOne(q => q.Lesson)
                .WithOne(l => l.Quiz)
                .HasForeignKey<Quiz>(q => q.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuizQuestion>()
                .HasOne(qq => qq.Quiz)
                .WithMany(q => q.QuizQuestions)
                .HasForeignKey(qq => qq.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuizAnswer>()
                .HasOne(qa => qa.QuizQuestion)
                .WithMany(q => q.QuizAnswers)
                .HasForeignKey(qa => qa.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            //5.Podejścia do Quizów(QuizAttempt, QuizAttemptDetail)
            modelBuilder.Entity<QuizAttempt>()
                .HasOne(qa => qa.Student)
                .WithMany(s => s.QuizAttempts)
                .HasForeignKey(qa => qa.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuizAttempt>()
                .HasOne(qa => qa.Quiz)
                .WithMany(q => q.QuizAttempts)
                .HasForeignKey(qa => qa.QuizId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuizAttemptDetail>()
                .HasOne(qad => qad.QuizAttempt)
                .WithMany(qa => qa.AttemptDetails)
                .HasForeignKey(qad => qad.AttemptId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuizAttemptDetail>()
                .HasOne(qad => qad.QuizAnswer)
                .WithMany(qa => qa.AttemptDetails)
                .HasForeignKey(qad => qad.SelectedAnswerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<QuizAttemptDetail>()
                .HasOne(qad => qad.QuizQuestion)
                .WithMany(qq => qq.AttemptDetails)
                .HasForeignKey(qad => qad.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
