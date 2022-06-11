using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
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
            var (id, password) = AuthInfoToHashData(authInfo);
            var exists = await context.Users.AnyAsync(x => x.LoginId == id && x.LoginPassword == password);
            if (!exists)
            {
                throw new UnauthorizedException($"対象ユーザーが見つかりませんでした。Id={id}, Password={password}");
            }

            var token = BuildToken(id);
            return new DTO.AccessToken
            {
                Token = token,
            };
        }
        catch (UnauthorizedException)
        {
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "ログイン処理でエラーが発生しました。");
            throw;
        }
    }

    public async Task<DTO.AccessToken> Signup(DTO.AuthInfo authInfo)
    {
        try
        {
            var id = string.Empty;
            var password = string.Empty;
            try
            {
                (id, password) = AuthInfoToHashData(authInfo);
            }
            catch (Exception ex)
            {
                throw new Exception("認証情報のハッシュ化に失敗しました。", ex);
            }

            var exists = await context.Users.AnyAsync(x => x.LoginId == id);
            if (exists)
            {
                throw new UnauthorizedException($"すでに使用されているIdです。Id={id}");
            }

            try
            {
                var user = new Models.User
                {
                    LoginId = id,
                    LoginPassword = password,
                };

                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                var exception = new Exception("ユーザーの作成に失敗しました。", ex);
                logger.LogError(exception, string.Empty);
                throw exception;
            }

            var token = BuildToken(id);
            return new DTO.AccessToken
            {
                Token = token,
            };
        }
        catch (Exception)
        {
            throw;
        }
    }

    private string BuildToken(string userId)
    {
        var jwt = configuration.GetSection(nameof(Settings.Jwt)).Get<Settings.Jwt>();

        if (jwt is null) throw new Exception("AppSettings.Jwtの読み込みに失敗しました。");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var handler = new JwtSecurityTokenHandler();
        var descripter = new SecurityTokenDescriptor
        {
            Issuer = jwt.Issuer,
            Audience = jwt.Audience,
            Expires = DateTime.UtcNow.AddMinutes(jwt.ExpireMinute),
            SigningCredentials = creds,
            Subject = new System.Security.Claims.ClaimsIdentity(new List<Claim>
            {
                new Claim("ID", userId),
            }),
        };
        var token = handler.CreateJwtSecurityToken(descripter);

        return handler.WriteToken(token);
    }

    private string HashData(string data)
    {
        var bytes = Encoding.UTF8.GetBytes(data);
        return Convert.ToHexString(SHA256.HashData(bytes));
    }

    private (string id, string password) AuthInfoToHashData(DTO.AuthInfo authInfo)
    {
        var id = string.Empty;
        var password = string.Empty;
        try
        {
            id = HashData(authInfo.Id);
            password = HashData(authInfo.Password);
            return (id, password);
        }
        catch (Exception ex)
        {
            throw new Exception("認証情報のハッシュ化に失敗しました。", ex);
        }
    }
}
