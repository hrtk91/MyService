import { useState } from "react";
import { ArticleServiceContext, useApiClient } from "../../context";
import ArticleService from "../../services/ArticleService";

interface IProps {
  children: JSX.Element;
}

export default function ArticleServiceProvider(props: IProps) {
  const [apiClient] = useState(useApiClient());
  const [articleService] = useState(new ArticleService(apiClient));
  return (
    <ArticleServiceContext.Provider value={articleService}>
      {props.children}
    </ArticleServiceContext.Provider>
  );
}
