import HttpClient from "../models/HttpClient";
import { IArticle } from "../models/Interfaces";

export default class ArticleService {
  private httpClient: HttpClient;

  public constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public async all(userId: string): Promise<IArticle[]> {
    const articles: IArticle[] = await this.httpClient
      .get(`article/all/${userId}`)
      .then((res) => res.data);
    return articles;
  }

  public async create(files: File[]): Promise<IArticle> {
    const form = new FormData();
    files.forEach((file) => form.append("files", file));
    const res: IArticle = await this.httpClient
      .post("article", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
    return res;
  }

  public async latest(num = 10): Promise<IArticle[]> {
    const articles = await this.httpClient
      .get("article/latest", {
        data: {
          num: num,
        },
      })
      .then((res) => res.data);

    return articles;
  }
}
