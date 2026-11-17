using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Jamatho.Api.Controllers
{
    public class BaseApiController : ControllerBase
    {
        protected Guid GetCurrentUserId()
        {
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");

            return Guid.TryParse(idClaim, out var userId) ? userId : Guid.Empty;
        }
    }
}
