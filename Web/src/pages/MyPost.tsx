import { useEffect, useState } from "react";
import { IArticle } from "../models/Interfaces";
import { useArticleService, useAuth } from "../context";
import { Navigate } from "react-router-dom";
import ArticleCard from "../components/organisms/ArticleCard";

export default function MyPost() {
  try {
    const auth = useAuth();
    const articleService = useArticleService();
    const [userId, setUserId] = useState("");
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
      const initialize = async () => {
        let userId = "";
        try {
          userId = auth.userId();
          setUserId(userId);
        } catch (err) {
          alert(
            "ユーザーの取得に失敗しました。\n再度ログインしなおしてください。"
          );
          console.warn(err);
          return;
        }

        try {
          const articles = await articleService.all(userId);
          setArticles(articles);
        } catch (err) {
          alert("ページ読み込みに失敗しました。");
          console.warn(err);
        }
      };

      initialize();
    }, []);

    const deleteArticle = async () => {
      const articles = await articleService.all(userId);
      setArticles(articles);
    };

    return (
      <div>
        <h1>MyPost</h1>
        <p>UserId : {userId}</p>
        <div className="card-group">
          {articles.map((article) => (
            <ArticleCard
              key={article.articleId}
              onDelete={deleteArticle}
              article={article}
            />
          ))}
        </div>
      </div>
    );
  } catch (err) {
    alert(
      "ページ読み込みに失敗しました。\n時間をおいて再度アクセスしてください。"
    );
    console.warn(err);
    return <Navigate to="/500"></Navigate>;
  }
}
