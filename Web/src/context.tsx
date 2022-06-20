import { createContext } from "react";
import HttpClient from "./models/HttpClient";
import AccountService from "./services/AccountService";
import ArticleService from "./services/ArticleService";
import PictureService from "./services/PictureService";

const hc = new HttpClient();
const as = new AccountService(hc);
const articleService = new ArticleService(hc);
const pictureService = new PictureService(hc);

export const ServiceContext = createContext({
  httpClient: hc,
  accountService: as,
  articleService: articleService,
  pictureService: pictureService,
});
