using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Picture
{
    [Key]
    public Guid PictureId { get; set; }

    [Required]
    public string FileName { get; set; } = string.Empty;

    [Required]
    public DateTime Created { get; set; } = DateTime.UtcNow;

    [Required]
    public DateTime Modified { get; set; } = DateTime.UtcNow;
}
