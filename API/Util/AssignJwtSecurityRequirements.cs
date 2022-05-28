using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace API.Util;

public class AssignJwtSecurityRequirements : IOperationFilter
{
    /// <summary>
    /// Swagger UI用のフィルタ。
    /// Swagger上でAPIを実行する際のJWTトークン認証対応を実現する。
    /// </summary>
    /// <remarks>https://qiita.com/sekikatsu/items/1bff499ce9cc0adbe4a5#swagger-ui%E3%81%AE%E5%A4%89%E6%9B%B4</remarks>
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        //AllowAnonymousが付いている場合は、アクセスコードを要求しない
        var allowAnonymousAccess = context.MethodInfo.CustomAttributes
            .Any(attr => attr.AttributeType == typeof(AllowAnonymousAttribute));

        if (!allowAnonymousAccess)
        {
            var requirements = new OpenApiSecurityRequirement();
            requirements.Add(new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = Microsoft.Net.Http.Headers.HeaderNames.Authorization,
                },
            }, new List<string>());

            operation.Security.Add(requirements);
        }
    }
}
