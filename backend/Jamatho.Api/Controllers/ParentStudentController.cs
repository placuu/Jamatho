using Jamatho.Api.Models.DTOs;
using Jamatho.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Jamatho.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class ParentStudentController : BaseApiController
    {
        private readonly IParentLinkService _parentLinkService;

        public ParentStudentController(IParentLinkService parentLinkService)
        {
            _parentLinkService = parentLinkService;
        }

        [HttpPost("invite-code")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<InviteCodeResponseDto>> GenerateInviteCode(CancellationToken cancellationToken)
        {
            var studentId = GetCurrentUserId();
            if(studentId == Guid.Empty)
            {
                return Unauthorized();
            }

            try
            {
                var result = await _parentLinkService.GenerateInviteCodeAsync(studentId, cancellationToken);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("link")]
        [Authorize(Roles = "Parent")]
        public async Task<ActionResult<LinkedChildDto>> LinkChild([FromBody] LinkChildRequestDto dto, CancellationToken cancellationToken)
        {
            var parentId = GetCurrentUserId();
            if(parentId == Guid.Empty)
            {
                return Unauthorized();
            }

            try
            {
                var linkedChild = await _parentLinkService.LinkParentWithStudentAsync(parentId, dto.Code, cancellationToken);
                return Ok(linkedChild);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [HttpGet("children")]
        [Authorize(Roles = "Parent")]
        public async Task<ActionResult<List<LinkedChildDto>>> GetLinkedChildren(CancellationToken cancellationToken)
        {
            var parentId = GetCurrentUserId();
            if(parentId == Guid.Empty)
            {
                return Unauthorized();
            }

            var children = await _parentLinkService.GetLinkedChildrenAsync(parentId, cancellationToken);
            return Ok(children);
        }
    }
}
