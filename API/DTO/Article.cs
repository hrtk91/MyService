namespace API.DTO;

public class Article
{
    public Guid ArticleId { get; set; }

    public List<Picture> Pictures { get; set; } = new List<Picture>();

    public List<ArticleComment> Comments { get; set; } = new List<ArticleComment>();

    public List<Like> Likes { get; set; } = new List<Like>();

    public User Owner { get; set; } = new User();

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public static DTO.Article From(Models.Article model)
    {
        return new DTO.Article
        {
            ArticleId = model.ArticleId,
            Owner = User.From(model.Owner),
            Pictures = model.Pictures
                .Select(x => DTO.Picture.From(x))
                .ToList(),
            Comments = model.Comments
                .Select(x => DTO.ArticleComment.From(x))
                .ToList(),
            Likes = model.Likes
                .Select(x => DTO.Like.From(x))
                .ToList(),
            Created = model.Created,
            Modified = model.Modified,
        };
    }
}
