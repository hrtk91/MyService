namespace API.DTO;

public class Article
{
    public Guid ArticleId { get; set; }

    public List<Picture> Pictures { get; set; } = new List<Picture>();

    public Guid OwnerId { get; set; }

    public static DTO.Article From(Models.Article model)
    {
        return new DTO.Article
        {
            ArticleId = model.ArticleId,
            OwnerId = model.Owner.UserId,
            Pictures = model.Pictures
                .Select(x => DTO.Picture.From(x))
                .ToList(),
        };
    }
}
