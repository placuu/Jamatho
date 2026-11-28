using Jamatho.Api.Data;
using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/users")]
    public class UsersController : BaseApiController
    {
        private readonly JamathoDbContext _context;

        public UsersController(JamathoDbContext context)
        {
            _context = context;
        }

        [HttpGet("me")]
        public async Task<ActionResult<UserProfileDto>> GetMyProfile(CancellationToken cancellationToken)
        {
            var userId = GetCurrentUserId();
            if (userId == Guid.Empty)
            {
                return Unauthorized();
            }

            var role = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

            if (role == "Student")
            {
                var student = await _context.Students
                    .AsNoTracking()
                    .FirstOrDefaultAsync(s => s.Id == userId, cancellationToken);

                if (student == null)
                {
                    return NotFound("Nie znaleziono konta ucznia.");
                }

                return Ok(new UserProfileDto
                {
                    Id = student.Id.ToString(),
                    Username = student.Username,
                    Email = student.Email,
                    Role = "Student",
                    CreatedAt = student.CreatedAt,
                    Level = student.Level,
                    Experience = student.Experience,
                    Streak = student.Streak
                });
            }

            if (role == "Parent")
            {
                var parent = await _context.Parents
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == userId, cancellationToken);

                if (parent == null)
                {
                    return NotFound("Nie znaleziono konta rodzica.");
                }

                return Ok(new UserProfileDto
                {
                    Id = parent.Id.ToString(),
                    Username = parent.DisplayName ?? parent.Email,
                    Email = parent.Email,
                    Role = "Parent",
                    CreatedAt = parent.CreatedAt,
                    Level = 1,
                    Experience = 0,
                    Streak = 0
                });
            }

            return Unauthorized();
        }

        [HttpPut("me")]
        public async Task<ActionResult<UserProfileDto>> UpdateMyProfile(
            [FromBody] UpdateUserProfileDto dto,
            CancellationToken cancellationToken)
        {
            var userId = GetCurrentUserId();
            if (userId == Guid.Empty)
            {
                return Unauthorized();
            }

            var role = User.FindFirstValue(ClaimTypes.Role) ?? string.Empty;

            if (role == "Student")
            {
                var student = await _context.Students
                    .FirstOrDefaultAsync(s => s.Id == userId, cancellationToken);

                if (student == null)
                {
                    return NotFound("Nie znaleziono konta ucznia.");
                }

                if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != student.Email)
                {
                    var emailExists = await _context.Students.AnyAsync(s => s.Email == dto.Email, cancellationToken)
                        || await _context.Parents.AnyAsync(p => p.Email == dto.Email, cancellationToken);

                    if (emailExists)
                    {
                        return BadRequest("Konto o podanym adresie e-mail już istnieje.");
                    }

                    student.Email = dto.Email.Trim();
                }

                if (!string.IsNullOrWhiteSpace(dto.Username) && dto.Username != student.Username)
                {
                    var usernameExists = await _context.Students.AnyAsync(s => s.Username == dto.Username, cancellationToken);

                    if (usernameExists)
                    {
                        return BadRequest("Podana nazwa użytkownika jest już zajęta.");
                    }

                    student.Username = dto.Username.Trim();
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Ok(new UserProfileDto
                {
                    Id = student.Id.ToString(),
                    Username = student.Username,
                    Email = student.Email,
                    Role = "Student",
                    CreatedAt = student.CreatedAt,
                    Level = student.Level,
                    Experience = student.Experience,
                    Streak = student.Streak
                });
            }

            if (role == "Parent")
            {
                var parent = await _context.Parents
                    .FirstOrDefaultAsync(p => p.Id == userId, cancellationToken);

                if (parent == null)
                {
                    return NotFound("Nie znaleziono konta rodzica.");
                }

                if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != parent.Email)
                {
                    var emailExists = await _context.Parents.AnyAsync(p => p.Email == dto.Email, cancellationToken)
                        || await _context.Students.AnyAsync(s => s.Email == dto.Email, cancellationToken);

                    if (emailExists)
                    {
                        return BadRequest("Konto o podanym adresie e-mail już istnieje.");
                    }

                    parent.Email = dto.Email.Trim();
                }

                if (!string.IsNullOrWhiteSpace(dto.Username) && dto.Username != parent.DisplayName)
                {
                    parent.DisplayName = dto.Username.Trim();
                }

                await _context.SaveChangesAsync(cancellationToken);

                return Ok(new UserProfileDto
                {
                    Id = parent.Id.ToString(),
                    Username = parent.DisplayName ?? parent.Email,
                    Email = parent.Email,
                    Role = "Parent",
                    CreatedAt = parent.CreatedAt,
                    Level = 1,
                    Experience = 0,
                    Streak = 0
                });
            }

            return Unauthorized();
        }
    }
}
