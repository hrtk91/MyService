import { useEffect, useState } from "react";
import { IArticle } from "../../models/Interfaces";
import Card from "../molecules/Card";
import { useArticleService, useAuth, usePictureService } from "../../context";
import { Navigate } from "react-router-dom";
import CardText from "../atoms/CardText";
import CardBottomImages from "../atoms/CardBottomImages";

export default function MyPost() {
  try {
    const auth = useAuth();
    const articleService = useArticleService();
    const pictureService = usePictureService();
    const [userId, setUserId] = useState("");
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
      const initialize = async () => {
        let userId = "";
        try {
          userId = auth.userId();
        } catch (err) {
          alert(
            "ユーザーの取得に失敗しました。\n再度ログインしなおしてください。"
          );
          console.warn(err);
          return;
        }

        try {
          const articles = await articleService.all(userId);
          setUserId(userId);
          setArticles(articles);
        } catch (err) {
          alert("ページ読み込みに失敗しました。");
          console.warn(err);
        }
      };
      initialize();
    }, []);

    return (
      <div>
        <h1>MyPost</h1>
        <p>UserId : {userId}</p>
        <div className="card-group">
          {articles.map((article) => (
            <Card key={article.articleId}>
              <>
                <CardText>
                  <>
                    ArticleId : {article.articleId}
                    Name : {article.owner.name}
                  </>
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
