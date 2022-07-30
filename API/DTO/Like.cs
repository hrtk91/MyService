namespace API.DTO;

public class Like
{
    public Guid LikeId { get; set; } = Guid.Empty;

    public User Owner { get; set; } = new User();

    public static DTO.Like From(Models.Like model)
    {
        return new DTO.Like
        {
            LikeId = model.LikeId,
            Owner = DTO.User.From(model.Owner),
        };
    }
}
