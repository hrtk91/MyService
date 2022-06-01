using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class AccountController : ControllerBase
{
    private readonly ILogger<AccountController> logger;
    private readonly IAccountService accountService;

    public AccountController(ILogger<AccountController> logger, IAccountService accountService)
    {
        this.logger = logger;
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
        catch (UnauthorizedException)
        {
            return Unauthorized();
        }
        catch (Exception ex)
        {
            // InternalServerErrorで応答
            logger.LogError(ex, "サインイン処理に失敗しました。");
            throw;
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
        catch (UnauthorizedException)
        {
            return Unauthorized();
        }
        catch (Exception ex)
        {
            // InternalServerErrorで応答
            logger.LogError(ex, "サインアップ処理に失敗しました。");
            throw;
        }
    }
}
