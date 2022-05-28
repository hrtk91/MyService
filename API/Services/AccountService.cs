using System.IdentityModel.Tokens.Jwt;
using System.Text;
using API.Data;
using API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class AccountService : IAccountService
{
    public readonly ILogger<AccountService> logger;

    private readonly IConfiguration configuration;

    public readonly ApplicationDbContext context;

    public AccountService(
        ILogger<AccountService> logger,
        IConfiguration configuration,
        ApplicationDbContext context)
    {
        this.logger = logger;
        this.configuration = configuration;
        this.context = context;
    }

    public async Task<DTO.AccessToken> Signin(DTO.AuthInfo authInfo)
    {
        try
        {
            var exists = await context.Users.AnyAsync(x => x.LoginId == authInfo.Id && x.LoginPassword == authInfo.Password);
            if (!exists)
            {
                throw new Exception($"対象ユーザーが見つかりませんでした。Id={authInfo.Id}, Password={authInfo.Password}");
            }

            var token = BuildToken();
            return new DTO.AccessToken
            {
                Token = token,
            };
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "ログイン処理でエラーが発生しました。");
            throw;
        }
    }

    public async Task<DTO.AccessToken> Signup(DTO.AuthInfo authInfo)
    {
        var exists = await context.Users.AnyAsync(x => x.LoginId == authInfo.Id);
        if (exists)
        {
            throw new Exception($"すでに使用されているIdです。Id={authInfo.Id}");
        }

        try
        {
            var user = new Models.User
            {
                LoginId = authInfo.Id,
                LoginPassword = authInfo.Password,
            };

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "ユーザーの作成に失敗しました。");
        }

        var token = BuildToken();
        return new DTO.AccessToken
        {
            Token = token,
        };
    }

    private string BuildToken()
    {
        var jwt = configuration.GetSection(nameof(Settings.Jwt)).Get<Settings.Jwt>();

        if (jwt is null) throw new Exception("AppSettings.Jwtの読み込みに失敗しました。");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwt.Issuer,
            audience: jwt.Audience,
            expires: DateTime.Now.AddMinutes(jwt.ExpireMinute),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}
