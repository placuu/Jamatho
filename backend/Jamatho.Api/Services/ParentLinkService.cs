using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Jamatho.Api.Services
{
    public interface IParentLinkService
    {
        Task<InviteCodeResponseDto> GenerateInviteCodeAsync(Guid studentId, CancellationToken cancellationToken = default);
        Task<LinkedChildDto> LinkParentWithStudentAsync(Guid parentId, string rawCode, CancellationToken cancellationToken = default);
        Task<List<LinkedChildDto>> GetLinkedChildrenAsync(Guid parentId, CancellationToken cancellationToken = default);
    }

    public class ParentLinkService : IParentLinkService
    {
        private readonly JamathoDbContext _context;
        private const string _allowedChars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
        private const int _codeLenght = 8;
        private static readonly TimeSpan _codeLifeTime = TimeSpan.FromHours(24);

        public ParentLinkService(JamathoDbContext context)
        {
            _context = context;
        }

        public async Task<InviteCodeResponseDto> GenerateInviteCodeAsync(Guid studentId, CancellationToken cancellationToken = default)
        {
            var studentExist = await _context.Students.AnyAsync(s => s.Id == studentId, cancellationToken);

            if (!studentExist)
            {
                throw new InvalidOperationException("Nie znaleziono konta ucznia.");
            }

            var now = DateTime.UtcNow;

            var activeCode = await _context.StudentInviteCodes.Where(c => c.StudentId == studentId && !c.IsUsed && c.ExpiresAt > now)
                                .ToListAsync(cancellationToken);

            foreach (var oldCode in activeCode)
            {
                oldCode.IsUsed = true;
            }

            string uniqeCode;

            do
            {
                uniqeCode = RandomNumberGenerator.GetString(_allowedChars, _codeLenght);
            }
            while (await _context.StudentInviteCodes.AnyAsync(c => c.Code == uniqeCode, cancellationToken));

            var inviteCode = new StudentInviteCode
            {
                Id = Guid.NewGuid(),
                StudentId = studentId,
                Code = uniqeCode,
                IsUsed = false,
                CreatedAt = now,
                ExpiresAt = now.Add(_codeLifeTime)
            };

            _context.StudentInviteCodes.Add(inviteCode);
            await _context.SaveChangesAsync(cancellationToken);

            return new InviteCodeResponseDto
            {
                Code = inviteCode.Code,
                CreatedAt = inviteCode.CreatedAt,
                ExpiresAt = inviteCode.ExpiresAt
            };
        }

        public async Task<LinkedChildDto> LinkParentWithStudentAsync(Guid parentId, string rawCode, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(rawCode))
            {
                throw new ArgumentException("Kod zaproszenia nie może być pusty.");
            }

            var normalizedCode = rawCode.Replace("-", "").Replace(" ", "").Trim().ToUpperInvariant();

            var parentExist = await _context.Parents.AnyAsync(p => p.Id == parentId, cancellationToken);

            if (!parentExist)
            {
                throw new InvalidOperationException("Nie znaleziono konta rodzica.");
            }

            var inviteCode = await _context.StudentInviteCodes.Include(c => c.Student).FirstOrDefaultAsync(c => c.Code == normalizedCode, cancellationToken);

            if (inviteCode == null)
            {
                throw new ArgumentException("Podany kod zaproszenia jest nieprawidłowy.");
            }

            if (inviteCode.IsUsed)
            {
                throw new InvalidOperationException("Ten kod zaproszenia został już wykorzystany.");
            }

            if (inviteCode.ExpiresAt <= DateTime.UtcNow)
            {
                throw new InvalidOperationException("Ten kod zaproszenia wygasł. Poproś ucznia o wygenerowanie nowego kodu.");
            }

            var alreadyLinked = await _context.ParentStudents.AnyAsync(ps => ps.StudentId == inviteCode.StudentId && ps.ParentId == parentId, cancellationToken);

            if (alreadyLinked)
            {
                throw new InvalidOperationException("To konto ucznia jest już powiązane z Twoim kontem rodzica.");
            }

            var now = DateTime.UtcNow;

            var parentStudent = new ParentStudent
            {
                Id = Guid.NewGuid(),
                StudentId = inviteCode.StudentId,
                ParentId = parentId,
                CreatedAt = now,
                IsConfirmed = true
            };

            inviteCode.IsUsed = true;

            _context.ParentStudents.Add(parentStudent);

            try
            {
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                throw new InvalidOperationException("To konto ucznia jest już powiązane z Twoim kontem rodzica.");
            }

            return new LinkedChildDto
            {
                LinkId = parentStudent.Id,
                StudentId = inviteCode.Student.Id,
                Username = inviteCode.Student.Username,
                Email = inviteCode.Student.Email,
                Level = inviteCode.Student.Level,
                Experience = inviteCode.Student.Experience,
                Streak = inviteCode.Student.Streak,
                LastActivityDate = inviteCode.Student.LastActivityDate,
                IsConfirmed = parentStudent.IsConfirmed,
                LinkedAt = parentStudent.CreatedAt
            };
        }

        public async Task<List<LinkedChildDto>> GetLinkedChildrenAsync(Guid parentId, CancellationToken cancellationToken = default)
        {
            return await _context.ParentStudents
                .AsNoTracking()
                .Where(ps => ps.ParentId == parentId)
                .OrderBy(ps => ps.CreatedAt)
                .Select(ps => new LinkedChildDto
                {
                    LinkId = ps.Id,
                    StudentId = ps.Student.Id,
                    Username = ps.Student.Username,
                    Email = ps.Student.Email,
                    Level = ps.Student.Level,
                    Experience = ps.Student.Experience,
                    Streak = ps.Student.Streak,
                    LastActivityDate = ps.Student.LastActivityDate,
                    IsConfirmed = ps.IsConfirmed,
                    LinkedAt = ps.CreatedAt
                })
                .ToListAsync(cancellationToken);
        }
    }
}
