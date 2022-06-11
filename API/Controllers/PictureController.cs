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
    [Route("{fileName}")]
    public IActionResult Get(string fileName)
    {
        if (!picService.Exists(fileName))
        {
            return NotFound();
        }

        var stream = picService.Open(fileName);
        return File(stream, "image/*");
    }
}
