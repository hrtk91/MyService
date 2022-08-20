import ApiClient from "../models/ApiClient";
import { IToken } from "../models/Interfaces";
import jwt_decode from "jwt-decode";

export interface IMyClaims {
  exp: number;
  userId: string;
}

export default class AuthService {
  private apiClient: ApiClient;

  private token: string;

  public get userId(): string | null {
    if (!this.isAuthenticated()) return null;
    const claims = this.getJwtClaims();
    return claims.userId;
  }

  public constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.token = "";
  }

  public signin = async (id: string, password: string): Promise<IMyClaims> => {
    try {
      const { token } = await this.apiClient
        .post("/account/signin", {
          id: id,
          password: password,
        })
        .then((res): IToken => res.data);

      this.saveToken(token);
      return this.getJwtClaims();
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

  public signup = async (id: string, password: string): Promise<IMyClaims> => {
    try {
      const token = await this.apiClient
        .post("/account/signup", {
          id: id,
          password: password,
        })
        .then((res): IToken => res.data)
        .then((itoken) => itoken.token);

      this.saveToken(token);
      return this.getJwtClaims();
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
    localStorage.setItem("token", "");
  };

  public getJwtClaims = (): IMyClaims => {
    const claims: IMyClaims = jwt_decode(this.token);
    return claims;
  };

  public saveToken = (token: string) => {
    this.token = token;
    this.apiClient.setAuthHeader(`Bearer ${token}`);
    localStorage.setItem("token", token);
  };

  public isAuthenticated = () => {
    if (this.token === "") return false;

    const { exp }: IMyClaims = jwt_decode(this.token);
    const result = Date.now() < exp * 1000;
    return result;
  };
}
