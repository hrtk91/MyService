using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Article
{
    [Key]
    public Guid ArticleId { get; set; } = Guid.Empty;

    public List<Picture> Pictures { get; set; } = new List<Picture>();

    [Required]
    public User Owner { get; set; } = new User();
}
