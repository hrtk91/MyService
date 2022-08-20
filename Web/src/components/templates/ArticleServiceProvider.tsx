import { ArticleServiceContext, useApiClient } from "../../context";
import ArticleService from "../../services/ArticleService";

interface IProps {
  children: JSX.Element;
}

export default function ArticleServiceProvider(props: IProps) {
  const apiClient = useApiClient();
  const articleService = new ArticleService(apiClient);
  return (
    <ArticleServiceContext.Provider value={articleService}>
      {props.children}
    </ArticleServiceContext.Provider>
  );
}
