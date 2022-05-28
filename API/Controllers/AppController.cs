using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AppController : ControllerBase
{
    [HttpGet]
    [Authorize]
    public ActionResult<string> Test()
    {
        return "test";
    }
}
