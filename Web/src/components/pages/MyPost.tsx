import { useEffect, useState } from "react";
import { IArticle } from "../../models/Interfaces";
import AccountService from "../../services/AccountService";
import ArticleService from "../../services/ArticleService";
import PictureService from "../../services/PictureService";
import Card from "../molecules/Card";

interface IProps {
  accountService: AccountService;
  articleService: ArticleService;
  pictureService: PictureService;
}

export default function MyPost(props: IProps) {
  try {
    const [userId, setUserId] = useState("");
    const [articles, setArticles] = useState<IArticle[]>([]);

    useEffect(() => {
      const initialize = async () => {
        let userId = "";
        try {
          userId = props.accountService.userId();
        } catch (err) {
          alert(
            "ユーザーの取得に失敗しました。\n再度ログインしなおしてください。"
          );
          console.warn(err);
          return;
        }

        try {
          const articles = await props.articleService.all(userId);
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
  } catch (err) {
    alert(
      "ページ読み込みに失敗しました。\n時間をおいて再度アクセスしてください。"
    );
    console.warn(err);
    return <h1>読み込みに失敗しました。</h1>;
  }
}
