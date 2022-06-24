import {
  useArticleService,
  useAuth,
  useAuthService,
  usePictureService,
} from "../../context";
import { IArticle } from "../../models/Interfaces";
import CardBottomImages from "../atoms/CardBottomImages";
import CardFooter from "../atoms/CardFooter";
import Card from "../molecules/Card";

interface IProps {
  article: IArticle;
  onDelete?: (articleId: string) => Promise<void>;
}

export default function ArticleCard(props: IProps) {
  const auth = useAuth();
  const authService = useAuthService();
  const articleService = useArticleService();
  const pictureService = usePictureService();
  const deleteArticle = async (articleId: string) => {
    await articleService.delete(articleId);
    props.onDelete?.(articleId);
  };

  const userId = authService.userId(auth.token);
  const isOwner = userId === props.article.owner.userId;

  return (
    <Card>
      <>
        {isOwner ? (
          <button
            className="btn btn-danger"
            onClick={() => deleteArticle(props.article.articleId)}
          >
            削除
          </button>
        ) : (
          <></>
        )}
        <CardBottomImages>
          <>
            {props.article.pictures.map((pic) => (
              <img
                key={pic.pictureId}
                src={pictureService.getImgUrl(pic.pictureId)}
                className="h-auto w-100"
              />
            ))}
          </>
        </CardBottomImages>
        <CardFooter>
          <div>
            <div>
              <small className="text-muted">
                ArticleId : {props.article.articleId}
              </small>
            </div>
            <div>
              <small className="text-muted">
                UserName : {props.article.owner.name}
              </small>
            </div>
          </div>
        </CardFooter>
      </>
    </Card>
  );
}
