using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class User
{
    [Key]
    public Guid UserId { get; set; }

    [Required]
    public string LoginId { get; set; } = string.Empty;

    [Required]
    public string LoginPassword { get; set; } = string.Empty;
}
