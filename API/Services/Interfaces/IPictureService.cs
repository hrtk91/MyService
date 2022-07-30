namespace API.Services.Interfaces;

public interface IPictureService
{
    Task<string> GetFileName(string pictureId);
    Task<bool> ExistsAsync(string fileName);
    Task<Stream> Open(string fileName);
    Task<string> Save(IFormFile file);
}
