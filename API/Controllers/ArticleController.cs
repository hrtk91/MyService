using API.Data;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticleController : ControllerBase
{
    private readonly IArticleService articleService;
    private readonly IPictureService picService;
    private readonly ApplicationDbContext context;

    public ArticleController(IArticleService articleService, IPictureService picService, ApplicationDbContext context)
    {
        this.articleService = articleService;
        this.picService = picService;
        this.context = context;
    }

    [HttpGet]
    [Authorize]
    [Route("{articleId}")]
    public async Task<ActionResult<DTO.Article>> Get(Guid articleId)
    {
        try
        {
            return await articleService.Get(articleId);
        }
        catch (NotFoundException)
        {
            return NotFound(articleId);
        }
    }

    [HttpGet]
    [Authorize]
    [Route("All/{userId}")]
    public async Task<ActionResult<IEnumerable<DTO.Article>>> All(Guid userId)
    {
        var articles = await articleService.All(userId);
        return articles.ToList();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<DTO.Article>> Create(IEnumerable<IFormFile> files)
    {
        var id = User.Claims.SingleOrDefault(x => x.Type == "userId")?.Value;
        if (id is null)
        {
            return Unauthorized();
        }

        var user = await context.Users.SingleOrDefaultAsync(x => x.UserId == Guid.Parse(id));
        if (user is null)
        {
            return Unauthorized();
        }

        var article = await articleService.Save(files, user);
        return article;
    }

    [HttpGet]
    [Route("latest")]
    public async Task<ActionResult<IEnumerable<DTO.Article>>> Latest(int num = 10)
    {
        var latest = await articleService.Latest(num);
        return latest.ToList();
    }

    [HttpDelete]
    [Route("{articleId}")]
    public async Task<IActionResult> Delete(string articleId)
    {
        await articleService.Delete(Guid.Parse(articleId));
        return NoContent();
    }
}
