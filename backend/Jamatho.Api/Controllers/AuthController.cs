using Jamatho.Api.Data;
using Jamatho.Api.Services.Auth;
using Microsoft.AspNetCore.Mvc;
using Jamatho.Api.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Jamatho.Api.Models.Entities;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly JamathoDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IPasswordService _passwordService;

        public AuthController(JamathoDbContext context, ITokenService tokenService, IPasswordService passwordService)
        {
            _context = context;
            _tokenService = tokenService;
            _passwordService = passwordService;
        }

        [HttpPost("register/student")]
        public async Task<ActionResult<AuthResponseDto>> RegisterStudent([FromBody] RegisterStudentDto dto)
        {
            var emailExist = await _context.Students.AnyAsync(s => s.Email == dto.Email)
                || await _context.Parents.AnyAsync(p => p.Email == dto.Email);

            if (emailExist)
            {
                return BadRequest("Konto o podanym adresie e-mail już istnieje.");
            }

            if (await _context.Students.AnyAsync(s => s.Username == dto.Username))
            {
                return BadRequest("Podana nazwa użytkownika jest już zajęta.");
            }

            var student = new Student
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHashed = _passwordService.HashPassword(dto.Password)
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateStudentToken(student);

            return Ok(new AuthResponseDto
            {
                Id = student.Id,
                Username = student.Username,
                Email = student.Email,
                Token = token,
                Role = "Student"
            });
        }

        [HttpPost("register/parent")]
        public async Task<ActionResult<AuthResponseDto>> RegisterParent([FromBody] RegisterParentDto dto)
        {
            var emailExist = await _context.Parents.AnyAsync(p => p.Email == dto.Email)
                || await _context.Students.AnyAsync(s => s.Email == dto.Email);

            if (emailExist)
            {
                return BadRequest("Konto o podanym adresie e-mail już istnieje.");
            }

            var parent = new Parent
            {
                Email = dto.Email,
                PasswordHashed = _passwordService.HashPassword(dto.Password),
                DisplayName = dto.DisplayName,
            };

            _context.Parents.Add(parent);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateParenToken(parent);

            return Ok(new AuthResponseDto
            {
                Id = parent.Id,
                Username = parent.DisplayName ?? parent.Email,
                Email = parent.Email,
                Role = "Parent",
                Token = token
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.Username == dto.Username || s.Email == dto.Username);

            if (student != null)
            {
                if (!_passwordService.VerifyPassword(dto.Password, student.PasswordHashed))
                {
                    return Unauthorized("Nieprawidłowe dane logowania.");
                }

                student.LastActivityDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                return Ok(new AuthResponseDto
                {
                    Id = student.Id,
                    Username = student.Username,
                    Email = student.Email,
                    Role = "Student",
                    Token = _tokenService.GenerateStudentToken(student)
                });
            }

            var parent = await _context.Parents.FirstOrDefaultAsync(p => p.Email == dto.Username);

            if(parent != null)
            {
                if(!_passwordService.VerifyPassword(dto.Password, parent.PasswordHashed))
                {
                    return Unauthorized("Niepoprawne dane logowania.");
                }

                return Ok(new AuthResponseDto
                {
                    Id = parent.Id,
                    Email = parent.Email,
                    Username = parent.DisplayName ?? parent.Email,
                    Role = "Parent",
                    Token = _tokenService.GenerateParenToken(parent)
                });
            }

            return Unauthorized("Nieprawidłowe dane logowania.");
        }
    }
}
