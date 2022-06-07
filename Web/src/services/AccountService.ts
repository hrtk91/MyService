import HttpClient from "../models/HttpClient";
import { IToken } from "../models/Interfaces";

export default class AccountService {
  private httpClient: HttpClient;

  public constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public signin = async (id: string, password: string): Promise<void> => {
    try {
      const token: IToken = await this.httpClient
        .post("/account/signin", {
          id: id,
          password: password,
        })
        .then((res) => res.data);

      this.httpClient.setAuthorizationHeader(token.token);
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

  public signup = async (id: string, password: string): Promise<void> => {
    try {
      const token: IToken = await this.httpClient
        .post("/account/signup", {
          id: id,
          password: password,
        })
        .then((res) => res.data);

      this.httpClient.setAuthorizationHeader(token.token);
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
}
