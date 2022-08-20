import { useArticleService, useAuth, usePictureService } from "../../context";
import { IArticle } from "../../models/Interfaces";
import CardBottomImages from "../atoms/CardBottomImages";
import CardFooter from "../atoms/CardFooter";
import CardHeader from "../atoms/CardHeader";
import LinkButton from "../atoms/LinkButton";
import Card from "../molecules/Card";
import Carousel from "../molecules/Carousel";

interface IProps {
  article: IArticle;
  onDelete?: (articleId: string) => Promise<void>;
}

export default function ArticleCard(props: IProps) {
  const auth = useAuth();
  const articleService = useArticleService();
  const pictureService = usePictureService();
  const deleteArticle = () =>
    (async () => {
      await articleService.delete(props.article.articleId);
      props.onDelete?.(props.article.articleId);
    })();

  const userId = auth.userId;
  const isOwner = userId === props.article.owner.userId;

  return (
    <Card>
      <CardHeader>
        <LinkButton
          to={`/article/detail/${props.article.articleId}`}
          state={props.article}
          color="primary"
        >
          詳細
        </LinkButton>
        <span className="ps-2"></span>
        {isOwner ? (
          <button className="btn btn-danger" onClick={deleteArticle}>
            削除
          </button>
        ) : (
          <></>
        )}
      </CardHeader>
      <div className="bg-secondary">
        <CardBottomImages>
          <Carousel>
            {props.article.pictures
              .map((pic) => pictureService.getImgUrl(pic.pictureId))
              .map((url, idx) => (
                <div
                  className="d-flex align-items-center justify-content-center"
                  key={idx}
                >
                  <img
                    style={{ objectFit: "contain" }}
                    src={url}
                    height="150px"
                  />
                </div>
              ))}
          </Carousel>
        </CardBottomImages>
      </div>
      <CardFooter>
        <div>
          <div>
            <small className="text-muted">
              UserName : {props.article.owner.name}
            </small>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
