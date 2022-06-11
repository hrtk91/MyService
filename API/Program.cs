using API.Data;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IArticleService, ArticleService>();
builder.Services.AddScoped<IPictureService, PictureService>();

// Cors設定を追加
var corsName = "MyServiceApp";
builder.Services.AddCors(options =>
    options.AddPolicy(corsName, policy =>
    {
        if (builder.Environment.IsProduction())
        {
            policy.AllowAnyOrigin();
        }
        else
        {
            policy.WithOrigins("http://localhost:3000");
        }

        policy.WithHeaders(new[]
        {
            "Content-Type",
            "Authorization"
        });
        policy.WithMethods(new[]
        {
            HttpMethod.Get.ToString(),
            HttpMethod.Post.ToString(),
            HttpMethod.Patch.ToString(),
            HttpMethod.Delete.ToString()
        });
    }));

// JWTベアラー認証を追加
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwt = builder.Configuration.GetSection(nameof(API.Settings.Jwt)).Get<API.Settings.Jwt>();
        options.TokenValidationParameters =
            new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwt.Issuer,
                ValidAudience = jwt.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key))
            };
    });

// Database設定を追加
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContext")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // SwaggerUIにAuth用のボタンを設定
    var securityScheme = new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = Microsoft.Net.Http.Headers.HeaderNames.Authorization,
        Scheme = "bearer",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        BearerFormat = "JWT",
        Description = "APIの実行の認証・認可に必要なアクセストークンを設定してください。",
    };
    options.AddSecurityDefinition(Microsoft.Net.Http.Headers.HeaderNames.Authorization, securityScheme);

    // SwaggerUIでのリクエストフィルターを追加
    options.OperationFilter<API.Util.AssignJwtSecurityRequirements>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors(corsName);
app.MapControllers();

app.Run();
