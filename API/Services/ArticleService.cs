using API.Data;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class ArticleService : Interfaces.IArticleService
{
    private readonly ApplicationDbContext context;
    private readonly IPictureService picService;

    public ArticleService(ApplicationDbContext context, IPictureService picService)
    {
        this.context = context;
        this.picService = picService;
    }

    public async Task<DTO.Article> Get(Guid id)
    {
        var article = await context.Articles
            .Include(x => x.Pictures)
            .Include(x => x.Owner)
            .Include(x => x.Comments)
                .ThenInclude(x => x.Owner)
            .Include(x => x.Likes)
                .ThenInclude(x => x.Owner)
            .SingleOrDefaultAsync(x => x.ArticleId == id);
        if (article is null)
        {
            throw new NotFoundException($"存在しないArticleです。ArticleId = {id}");
        }

        return DTO.Article.From(article);
    }

    public async Task<IEnumerable<DTO.Article>> All(Guid userId)
    {
        var articles = await context.Articles
            .Include(x => x.Pictures)
            .Include(x => x.Owner)
            .Include(x => x.Comments)
                .ThenInclude(x => x.Owner)
            .Include(x => x.Likes)
                .ThenInclude(x => x.Owner)
            .Where(x => x.Owner.UserId == userId)
            .ToListAsync();
        return articles.Select(x => DTO.Article.From(x)).ToList();
    }

    public async Task<DTO.Article> Save(IEnumerable<IFormFile> files, Models.User user)
    {
        var paths = await Task.WhenAll(files.Select(async x => await picService.Save(x)));

        var article = new Models.Article
        {
            Pictures = paths
                .Select(path => new Models.Picture { FileName = path })
                .ToList(),
            Owner = user,
        };

        await context.Articles.AddAsync(article);
        await context.SaveChangesAsync();
        return DTO.Article.From(article);
    }

    public async Task<IEnumerable<DTO.Article>> Latest(int num = 10)
    {
        var latest = (await context.Articles
            .OrderByDescending(x => x.Created)
            .Include(x => x.Pictures)
            .Include(x => x.Owner)
            .ToListAsync())
            .TakeLast(num);
        return latest.Select(x => DTO.Article.From(x)).ToList();
    }

    public async Task Delete(Guid id)
    {
        var article = await context.Articles
            .Include(x => x.Pictures)
            .SingleAsync(x => x.ArticleId == id);
        context.Remove(article);
        await context.SaveChangesAsync();
    }

    public async Task AddComment(DTO.ArticleComment dto)
    {
        var user = await WrapToNotFoundIfNull(
            context.Users.SingleOrDefaultAsync(x => x.UserId == dto.Owner.UserId),
            "ArticleCommentのUserIdに一致するユーザーが存在しませんでした。");
        var article = await WrapToNotFoundIfNull(
            context.Articles.SingleOrDefaultAsync(x => x.ArticleId == dto.ArticleId),
            "ArticleCommentのArticleIdに一致するArticleが存在しませんでした。");

        var comment = new Models.ArticleComment
        {
            Article = article!,
            Content = dto.Content,
            Owner = user!,
        };
        await context.ArticleComments.AddAsync(comment);
        await context.SaveChangesAsync();
    }

    public async Task DeleteComment(DTO.ArticleComment dto)
    {
        var comment = await WrapToNotFoundIfNull(
            context.ArticleComments.SingleOrDefaultAsync(x => x.ArticleCommentId == dto.ArticleCommentId),
            "一致するCommentが存在しませんでした。");

        context.ArticleComments.Remove(comment!);
        await context.SaveChangesAsync();
    }

    public async Task ToggleLike(string articleId, string userId)
    {
        var model = await context.Articles
            .Include(x => x.Likes)
            .ThenInclude(x => x.Owner)
            .SingleAsync(x => x.ArticleId.ToString() == articleId);
        var like = model.Likes.SingleOrDefault(x => x.Owner.UserId.ToString() == userId);

        if (like is null)
        {
            model.Likes.Add(new Models.Like
            {
                Owner = await context.Users.SingleAsync(x => x.UserId.ToString() == userId)
            });
        }
        else
        {
            context.Likes.Remove(like);
        }

        await context.SaveChangesAsync();
    }

    private async Task<T> WrapToNotFoundIfNull<T>(Task<T> task, string exceptionMessage = "")
    {
        var value = await task;
        if (value is not null)
        {
            return value;
        }

        throw new NotFoundException(exceptionMessage);
    }
}
