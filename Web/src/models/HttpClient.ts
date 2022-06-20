import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";

export interface IMyClaims {
  userId: string;
}

export default class HttpClient {
  private baseUrl = "http://localhost:5200/api";
  private axios = axios.create({ baseURL: this.baseUrl });
  private token = "";

  public setAuthorizationHeader = (token: string): void => {
    this.token = token;
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  public isAuthorized = (): boolean => this.token !== "";

  public getJwtClaims = (): IMyClaims => {
    if (this.token === "") throw new Error("認証が未実施です。");
    const claims: IMyClaims = jwt_decode(this.token);
    return claims;
  };

  public get = async (
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse> => {
    return await this.axios.get(url, config).then((res) => res);
  };

  public post = async (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any | undefined,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse> => {
    return await this.axios.post(url, data, config).then((res) => res);
  };

  public getFullUrl = (relativeUrl: string): string => {
    relativeUrl.replace(/^\//, "");
    return `${this.baseUrl}/${relativeUrl.replace(/^\//, "")}`;
  };
}
