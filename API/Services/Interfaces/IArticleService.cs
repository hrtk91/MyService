namespace API.Services.Interfaces;

public interface IArticleService
{
    public Task<DTO.Article> Get(Guid id);

    public Task<IEnumerable<DTO.Article>> All(Guid userId);

    public Task<DTO.Article> Save(IEnumerable<IFormFile> files, Models.User user);

    public Task<IEnumerable<DTO.Article>> Latest(int num = 10);

    public Task Delete(Guid id);

    public Task AddComment(DTO.ArticleComment dto);

    public Task DeleteComment(DTO.ArticleComment dto);
}
