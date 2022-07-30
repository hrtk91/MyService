using API.Data;
using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class PictureService : Interfaces.IPictureService
{
    private readonly IHostEnvironment env;
    private readonly ApplicationDbContext context;
    private readonly IConfiguration config;
    private readonly BlobServiceClient blobServiceClient;
    private string AzureConnectionString => config.GetConnectionString("AzureBlobStorage");
    private string StorageName => config.GetValue<string>("AzureStorageName");

    public PictureService(IHostEnvironment env, ApplicationDbContext context, IConfiguration config)
    {
        this.env = env;
        this.context = context;
        this.config = config;
        this.blobServiceClient = new BlobServiceClient(AzureConnectionString);
    }

    public async Task<string> GetFileName(string pictureId)
    {
        var picture = await context.Pictures.SingleAsync(x => x.PictureId == Guid.Parse(pictureId));
        return picture.FileName;
    }

    public async Task<bool> ExistsAsync(string fileName)
    {
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(StorageName);
        var blobClient = blobContainerClient.GetBlobClient(fileName);
        return await blobClient.ExistsAsync();
    }

    public async Task<Stream> Open(string fileName)
    {
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(StorageName);
        var blobClient = blobContainerClient.GetBlobClient(fileName);
        return await blobClient.OpenReadAsync();
    }

    public async Task<string> Save(IFormFile file)
    {
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var blobContainerClient = blobServiceClient.GetBlobContainerClient(StorageName);
        var blobClient = blobContainerClient.GetBlobClient(fileName);
        await blobClient.UploadAsync(file.OpenReadStream());
        return fileName;
    }
}
