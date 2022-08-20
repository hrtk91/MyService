import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useArticleService } from "../../context";
import { IArticle } from "../../models/Interfaces";
import ArticleCard from "./ArticleCard";

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
    <Row xs="1" sm="2" md="3">
      {articles.map((article) => (
        <Col key={article.articleId}>
          <ArticleCard article={article} />
        </Col>
      ))}
    </Row>
  );
}
