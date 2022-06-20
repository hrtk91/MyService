using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PictureController : ControllerBase
{
    private readonly IPictureService picService;
    public PictureController(IPictureService picService)
    {
        this.picService = picService;
    }

    [HttpGet]
    [Route("{pictureId}")]
    public async Task<IActionResult> Get(string pictureId)
    {
        var fileName = await picService.GetFileName(pictureId);
        if (!picService.Exists(fileName))
        {
            return NotFound();
        }

        var stream = picService.Open(fileName);
        return File(stream, "image/*");
    }
}
