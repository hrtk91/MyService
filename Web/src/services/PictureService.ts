import HttpClient from "../models/HttpClient";

export default class PictureService {
  private httpClient: HttpClient;

  public constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getImgUrl(pictureId: string) {
    const url = this.httpClient.getFullUrl(`picture/${pictureId}`);
    return url;
  }
}
