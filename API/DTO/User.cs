namespace API.DTO;

public class User
{
    public Guid UserId { get; set; } = Guid.Empty;

    public string Name { get; set; } = string.Empty;

    public DateTime Created { get; set; } = DateTime.UtcNow;

    public DateTime Modified { get; set; } = DateTime.UtcNow;

    public static DTO.User From(Models.User model)
    {
        var dto = new DTO.User
        {
            UserId = model.UserId,
            Name = model.Name,
            Created = model.Created,
            Modified = model.Modified,
        };
        return dto;
    }
}
