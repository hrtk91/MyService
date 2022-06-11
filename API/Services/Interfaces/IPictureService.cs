namespace API.Services.Interfaces;

public interface IPictureService
{
    public bool Exists(string fileName);
    public FileStream Open(string fileName);
    Task<string> Save(IFormFile file);
}
