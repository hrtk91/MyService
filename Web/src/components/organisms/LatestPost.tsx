import { useEffect, useState } from "react";
import { useArticleService } from "../../context";
import { IArticle } from "../../models/Interfaces";
import ArticleCard from "./ArticleCard";
import CommentForm from "./CommentForm";

export default function LatestPost() {
  const articleService = useArticleService();
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const latest = await articleService.latest();
      setArticles(latest);
    };
    getArticles();
  }, []);
  return (
    <div className="card-group">
      {articles.map((article) => (
        <div key={article.articleId} style={{ maxWidth: "5rem" }}>
          <ArticleCard article={article} />
          <CommentForm articleId={article.articleId} />
        </div>
      ))}
    </div>
  );
}
