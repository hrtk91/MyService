import ApiClient from "../models/ApiClient";
import { IToken } from "../models/Interfaces";
import jwt_decode from "jwt-decode";

export interface IMyClaims {
  userId: string;
}

export default class AuthenticationService {
  private httpClient: ApiClient;

  public constructor(httpClient: ApiClient) {
    this.httpClient = httpClient;
  }

  public signin = async (id: string, password: string): Promise<string> => {
    try {
      const token = await this.httpClient
        .post("/account/signin", {
          id: id,
          password: password,
        })
        .then((res): IToken => res.data)
        .then((itoken) => itoken.token);

      this.httpClient.setAuthHeader(`Bearer ${token}`);

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
      const token = await this.httpClient
        .post("/account/signup", {
          id: id,
          password: password,
        })
        .then((res): IToken => res.data)
        .then((itoken) => itoken.token);

      this.httpClient.setAuthHeader(`Bearer ${token}`);

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
    this.httpClient.setAuthHeader("");
  };

  public getJwtClaims = (token: string): IMyClaims => {
    const claims: IMyClaims = jwt_decode(token);
    return claims;
  };

  public userId = (token: string): string => {
    const claims = this.getJwtClaims(token);
    return claims.userId;
  };
}
