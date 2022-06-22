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

    [Required]
    public DateTime Created { get; set; } = DateTime.UtcNow;

    [Required]
    public DateTime Modified { get; set; } = DateTime.UtcNow;
}
