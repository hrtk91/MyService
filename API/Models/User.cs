using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class User
{
    [Key]
    public Guid UserId { get; set; } = Guid.Empty;

    [Required]
    public string LoginId { get; set; } = string.Empty;

    [Required]
    public string LoginPassword { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public List<ArticleComment> ArticleComments { get; set; } = new List<ArticleComment>();

    public List<Like> Likes { get; set; } = new List<Like>();

    [Required]
    public DateTime Created { get; set; } = DateTime.UtcNow;

    [Required]
    public DateTime Modified { get; set; } = DateTime.UtcNow;
}
