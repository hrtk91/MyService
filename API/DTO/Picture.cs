using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class Picture
{
    public Guid PictureId { get; set; }

    public string FileName { get; set; } = string.Empty;

    public static DTO.Picture From(Models.Picture model)
    {
        return new DTO.Picture
        {
            PictureId = model.PictureId,
            FileName = model.FileName,
        };
    }
}
