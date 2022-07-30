using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Article
{
    [Key]
    public Guid ArticleId { get; set; } = Guid.Empty;

    public List<Picture> Pictures { get; set; } = new List<Picture>();

    public List<ArticleComment> Comments = new List<ArticleComment>();

    public List<Like> Likes = new List<Like>();

    [Required]
    public User Owner { get; set; } = new User();

    [Required]
    public DateTime Created { get; set; } = DateTime.UtcNow;

    [Required]
    public DateTime Modified { get; set; } = DateTime.UtcNow;
}
