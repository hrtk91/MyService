import { useEffect, useState } from "react";
import { useArticleService, usePictureService } from "../../context";
import { IArticle } from "../../models/Interfaces";
import CardBottomImages from "../atoms/CardBottomImages";
import CardText from "../atoms/CardText";
import Card from "../molecules/Card";

export default function LatestPost() {
  const articleService = useArticleService();
  const pictureService = usePictureService();
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
        <Card key={article.articleId}>
          <>
            <CardText>
              <>ArticleId : {article.articleId}</>
            </CardText>
            <CardBottomImages>
              <>
                {article.pictures.map((pic) => (
                  <img
                    key={pic.pictureId}
                    src={pictureService.getImgUrl(pic.pictureId)}
                  />
                ))}
              </>
            </CardBottomImages>
          </>
        </Card>
      ))}
    </div>
  );
}
