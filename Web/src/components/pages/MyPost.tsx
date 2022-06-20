import { useEffect, useState } from "react";
import { IArticle } from "../../models/Interfaces";
import AccountService from "../../services/AccountService";
import ArticleService from "../../services/ArticleService";
import PictureService from "../../services/PictureService";

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
            <div className="card" key={article.articleId}>
              <div className="card-body">
                <p className="card-text">ArticleId : {article.articleId}</p>
              </div>
              {article.pictures.map((pic) => (
                <img
                  className="card-img-bottom"
                  key={pic.pictureId}
                  src={props.pictureService.getImgUrl(pic.pictureId)}
                />
              ))}
            </div>
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
