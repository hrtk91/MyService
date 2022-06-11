using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext : DbContext
{
    // コンパイラのNullableチェックを以下に倣って回避
    // https://docs.microsoft.com/ja-jp/ef/core/miscellaneous/nullable-reference-types
    public DbSet<Models.User> Users => Set<Models.User>();

    public DbSet<Models.Article> Articles => Set<Models.Article>();

    public DbSet<Models.Picture> Pictures => Set<Models.Picture>();

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
