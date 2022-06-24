import ApiClient from "../models/ApiClient";
import { IToken } from "../models/Interfaces";
import jwt_decode from "jwt-decode";

export interface IMyClaims {
  userId: string;
}

export default class AuthenticationService {
  private apiClient: ApiClient;

  public constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  public signin = async (id: string, password: string): Promise<string> => {
    try {
      const token = await this.apiClient
        .post("/account/signin", {
          id: id,
          password: password,
        })
        .then((res): IToken => res.data)
        .then((itoken) => itoken.token);

      this.setAuthHeader(token);

      return token;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(
          "AccountService.signin() : サインインに失敗しました。",
          { cause: err }
        );
      } else {
        throw new Error(
          "AccountService.signin() : サインイン中に不明なエラーが発生しました。"
        );
      }
    }
  };

  public signup = async (id: string, password: string): Promise<string> => {
    try {
      const token = await this.apiClient
        .post("/account/signup", {
          id: id,
          password: password,
        })
        .then((res): IToken => res.data)
        .then((itoken) => itoken.token);

      this.setAuthHeader(token);

      return token;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          "AccountService.signup() : サインアップに失敗しました。",
          { cause: err }
        );
      } else {
        throw new Error(
          "AccountService.signup() : サインアップ中に不明なエラーが発生しました。"
        );
      }
    }
  };

  public signout = () => {
    this.apiClient.setAuthHeader("");
  };

  public getJwtClaims = (token: string): IMyClaims => {
    const claims: IMyClaims = jwt_decode(token);
    return claims;
  };

  public userId = (token: string): string => {
    const claims = this.getJwtClaims(token);
    return claims.userId;
  };

  public setAuthHeader = (token: string) => {
    this.apiClient.setAuthHeader(`Bearer ${token}`);
  };
}
