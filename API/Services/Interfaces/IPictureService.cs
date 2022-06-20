namespace API.Services.Interfaces;

public interface IPictureService
{
    Task<string> GetFileName(string pictureId);
    bool Exists(string fileName);
    FileStream Open(string fileName);
    Task<string> Save(IFormFile file);
}
