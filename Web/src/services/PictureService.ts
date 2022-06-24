import ApiClient from "../models/ApiClient";

export default class PictureService {
  private httpClient: ApiClient;

  public constructor(httpClient: ApiClient) {
    this.httpClient = httpClient;
  }

  public getImgUrl(pictureId: string) {
    const url = this.httpClient.getFullUrl(`picture/${pictureId}`);
    return url;
  }
}
