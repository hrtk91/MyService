import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class HttpClient {
  private baseUrl = "http://localhost:5200/api";
  private axios = axios.create({ baseURL: this.baseUrl });

  public setAuthorizationHeader = (token: string): void => {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
}
