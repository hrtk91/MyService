using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class PictureService : Interfaces.IPictureService
{
    private readonly string saveDirName = "pic";
    private readonly IHostEnvironment env;
    private readonly ApplicationDbContext context;

    public PictureService(IHostEnvironment env, ApplicationDbContext context)
    {
        this.env = env;
        this.context = context;
    }

    public async Task<string> GetFileName(string pictureId)
    {
        var picture = await context.Pictures.SingleAsync(x => x.PictureId == Guid.Parse(pictureId));
        return picture.FileName;
    }

    public bool Exists(string fileName)
    {
        var saveDir = Path.Combine(env.ContentRootPath, saveDirName);
        var savePath = Path.Combine(saveDir, fileName);
        return File.Exists(savePath);
    }

    public FileStream Open(string fileName)
    {
        var saveDir = Path.Combine(env.ContentRootPath, saveDirName);
        var savePath = Path.Combine(saveDir, fileName);
        var stream = new FileStream(savePath, FileMode.Open, FileAccess.Read);
        return stream;
    }

    public async Task<string> Save(IFormFile file)
    {
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var saveDir = Path.Combine(env.ContentRootPath, saveDirName);
        var savePath = Path.Combine(saveDir, fileName);
        using (var stream = new FileStream(savePath, FileMode.CreateNew))
        {
            await file.CopyToAsync(stream);
        }
        return fileName;
    }
}
