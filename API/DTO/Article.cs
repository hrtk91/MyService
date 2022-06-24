namespace API.DTO;

public class Article
{
    public Guid ArticleId { get; set; }

    public List<Picture> Pictures { get; set; } = new List<Picture>();

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
            Created = model.Created,
            Modified = model.Modified,
        };
    }
}
