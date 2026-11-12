using Jamatho.Api.Models.Entities;

namespace Jamatho.Api.Services.Auth
{
    public interface ITokenService
    {
        string GenerateStudentToken(Student student);
        string GenerateParenToken(Parent parent);
    }
}
