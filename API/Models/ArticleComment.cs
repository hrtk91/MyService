using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class ArticleComment
{
    [Key]
    public Guid ArticleCommentId { get; set; } = Guid.Empty;

    public string Content { get; set; } = string.Empty;

    [Required]
    public Article Article { get; set; } = new Article();

    [Required]
    public User Owner { get; set; } = new User();
}
