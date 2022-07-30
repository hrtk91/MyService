using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext : DbContext
{
    // コンパイラのNullableチェックを以下に倣って回避
    // https://docs.microsoft.com/ja-jp/ef/core/miscellaneous/nullable-reference-types
    public DbSet<Models.User> Users => Set<Models.User>();

    public DbSet<Models.Article> Articles => Set<Models.Article>();

    public DbSet<Models.Picture> Pictures => Set<Models.Picture>();

    public DbSet<Models.ArticleComment> ArticleComments => Set<Models.ArticleComment>();

    public DbSet<Models.Like> Likes => Set<Models.Like>();

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Models.ArticleComment>()
            .HasOne(x => x.Article)
            .WithMany(x => x.Comments)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder
            .Entity<Models.ArticleComment>()
            .HasOne(x => x.Owner)
            .WithMany(x => x.ArticleComments)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder
            .Entity<Models.Like>()
            .HasOne(x => x.Target)
            .WithMany(x => x.Likes)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder
            .Entity<Models.Like>()
            .HasOne(x => x.Owner)
            .WithMany(x => x.Likes)
            .OnDelete(DeleteBehavior.NoAction);


        base.OnModelCreating(modelBuilder);
    }
}
