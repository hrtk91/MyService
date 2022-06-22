using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class Picture
{
    public Guid PictureId { get; set; }

    public string FileName { get; set; } = string.Empty;

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public static DTO.Picture From(Models.Picture model)
    {
        return new DTO.Picture
        {
            PictureId = model.PictureId,
            FileName = model.FileName,
            Created = model.Created,
            Modified = model.Modified,
        };
    }
}
