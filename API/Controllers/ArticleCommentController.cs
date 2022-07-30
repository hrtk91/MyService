using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/article/comment")]
public class ArticleCommentController : ControllerBase
{
    private readonly IArticleService articleService;

    public ArticleCommentController(IArticleService articleService)
    {
        this.articleService = articleService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(DTO.ArticleComment articleComment)
    {
        var id = User.Claims.SingleOrDefault(x => x.Type == "userId")?.Value;
        if (id is null)
        {
            return Unauthorized();
        }

        articleComment.Owner = new DTO.User
        {
            UserId = Guid.Parse(id),
        };

        await articleService.AddComment(articleComment);
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(DTO.ArticleComment articleComment)
    {
        try
        {
            await articleService.DeleteComment(articleComment);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}
