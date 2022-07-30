namespace API.DTO;

public class ArticleComment
{
    public Guid ArticleCommentId { get; set; } = Guid.Empty;

    public Guid ArticleId { get; set; } = Guid.Empty;

    public string Content { get; set; } = string.Empty;


    public User Owner { get; set; } = new User();

    public static DTO.ArticleComment From(Models.ArticleComment model)
    {
        return new DTO.ArticleComment
        {
            ArticleCommentId = model.ArticleCommentId,
            Content = model.Content,
            Owner = DTO.User.From(model.Owner),
        };
    }
}
