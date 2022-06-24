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
}
