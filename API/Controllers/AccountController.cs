using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AccountControler : ControllerBase
{
    private readonly IAccountService accountService;

    public AccountControler(IAccountService accountService)
    {
        this.accountService = accountService;
    }

    [HttpPost]
    [Produces("application/json")]
    public async Task<ActionResult<DTO.AccessToken>> Signin(DTO.AuthInfo authInfo)
    {
        try
        {
            var accessToken = await accountService.Signin(authInfo);
            return accessToken;
        }
        catch (Exception)
        {
            return Unauthorized();
        }
    }

    [HttpPost]
    [Produces("application/json")]
    public async Task<ActionResult<DTO.AccessToken>> Signup(DTO.AuthInfo authInfo)
    {
        try
        {
            var accessToken = await accountService.Signup(authInfo);
            return accessToken;
        }
        catch (Exception)
        {
            return Unauthorized();
        }
    }
}
