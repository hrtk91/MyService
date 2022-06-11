using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class Picture
{
    public Guid PictureId { get; set; }

    public string Url { get; set; } = string.Empty;

    public static DTO.Picture From(Models.Picture model)
    {
        return new DTO.Picture
        {
            PictureId = model.PictureId,
            Url = model.FileName,
        };
    }
}
