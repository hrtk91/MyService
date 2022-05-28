namespace API.Services.Interfaces;

public interface IAccountService
{
    public Task<DTO.AccessToken> Signin(DTO.AuthInfo authInfo);

    public Task<DTO.AccessToken> Signup(DTO.AuthInfo authInfo);
}
