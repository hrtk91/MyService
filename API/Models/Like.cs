using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Like
{
    [Key]
    public Guid LikeId { get; set; } = Guid.Empty;

    [Required]
    public Article Target { get; set; } = new Article();

    [Required]
    public User Owner { get; set; } = new User();
}
