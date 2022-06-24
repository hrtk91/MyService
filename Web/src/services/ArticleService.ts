import ApiClient from "../models/ApiClient";
import { IArticle } from "../models/Interfaces";

export default class ArticleService {
  private apiClient: ApiClient;

  public constructor(httpClient: ApiClient) {
    this.apiClient = httpClient;
  }

  public async all(userId: string): Promise<IArticle[]> {
    const articles: IArticle[] = await this.apiClient
      .get(`article/all/${userId}`)
      .then((res) => res.data);
    return articles;
  }

  public async create(files: File[]): Promise<IArticle> {
    const form = new FormData();
    files.forEach((file) => form.append("files", file));
    const res: IArticle = await this.apiClient
      .post("article", form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
    return res;
  }

  public async latest(num = 10): Promise<IArticle[]> {
    const articles = await this.apiClient
      .get("article/latest", {
        data: {
          num: num,
        },
      })
      .then((res) => res.data);

    return articles;
  }

  public async delete(articleId: string): Promise<void> {
    await this.apiClient.delete(`article/${articleId}`);
  }
}
