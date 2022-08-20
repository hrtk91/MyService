import { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import ArticleCard from "../components/organisms/ArticleCard";
import { useArticleService, useAuth } from "../context";
import { IArticle } from "../models/Interfaces";

export default function MyPost() {
  const [initialized, setInitialized] = useState(false);
  const auth = useAuth();
  const articleService = useArticleService();
  const [userId, setUserId] = useState("");
  const [articles, setArticles] = useState<IArticle[]>([]);

  if (!auth.isAuthenticated) return <></>;

  useEffect(() => {
    (async () => {
      const userId = auth.token?.userId;

      if (userId == null) return;
      setUserId(userId);

      try {
        const articles = await articleService.all(userId);
        setArticles(articles);
      } catch (err) {
        alert("ページ読み込みに失敗しました。");
        console.error(err);
      } finally {
        setInitialized(true);
      }
    })();
  }, []);

  const deleteArticle = async () => {
    const articles = await articleService.all(userId);
    setArticles(articles);
  };

  if (!initialized) return <></>;

  return (
    <Container>
      <Row>
        <h1>MyPost</h1>
      </Row>
      <Row xs="1" md="2" lg="3">
        {articles.map((article) => (
          <Col key={article.articleId}>
            <div className="pt-4">
              <ArticleCard
                key={article.articleId}
                onDelete={deleteArticle}
                article={article}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
