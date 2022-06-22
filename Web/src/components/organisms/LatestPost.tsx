import { useEffect, useState } from "react";
import { IArticle } from "../../models/Interfaces";
import ArticleService from "../../services/ArticleService";
import PictureService from "../../services/PictureService";
import Card from "../molecules/Card";

interface IProps {
  articleService: ArticleService;
  pictureService: PictureService;
}

export default function LatestPost(props: IProps) {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      const latest = await props.articleService.latest();
      setArticles(latest);
    };
    getArticles();
  }, []);
  return (
    <div>
      <h1>LatestPost</h1>
      <div className="card-group">
        {articles.map((article) => (
          <Card
            key={article.articleId}
            text={`ArticleId : ${article.articleId}`}
            bottomImages={article.pictures.map((x) =>
              props.pictureService.getImgUrl(x.pictureId)
            )}
          />
        ))}
      </div>
    </div>
  );
}
