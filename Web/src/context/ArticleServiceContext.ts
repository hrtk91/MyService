import { createContext, useContext } from "react";
import ArticleService from "../services/ArticleService";

export const ArticleServiceContext = createContext<ArticleService>(null!);
export const useArticleService = () => useContext(ArticleServiceContext);
