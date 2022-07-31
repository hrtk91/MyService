import { useEffect, useState } from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useLocation, useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "reactstrap";
import CommentForm from "../components/organisms/CommentForm";
import { useApiClient, useAuth, usePictureService } from "../context";
import { IArticle } from "../models/Interfaces";

export default function ArticleDetail() {
  const client = useApiClient();
  const params = useParams<{ id: string }>();
  const auth = useAuth();
  const [article, setArticle] = useState<IArticle | null>(
    useLocation().state as IArticle
  );
  const [hasLike, setLike] = useState(false);

  const fetchArticle = async () => {
    const article: IArticle = await client
      .get(`article/${params.id}`)
      .then((res) => res.data);
    setArticle(article);
    setLike(article.likes.some((x) => x.owner.userId == auth.userId()));
  };

  useEffect(() => {
    if (params.id != null) {
      fetchArticle();
    }
  }, [hasLike]);

  // Articleがnullの間非表示
  if (article == null) {
    return <Spinner color="primary" />;
  }

  const picService = usePictureService();
  const picElems = article.pictures.map((x) => (
    <img
      className="w-100"
      key={x.pictureId}
      src={picService.getImgUrl(x.pictureId)}
    />
  ));

  const onClickLike = () => {
    (async () => {
      await client.post(`article/${article.articleId}/like`);
      await fetchArticle();
    })();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>{article.articleId}</h3>
        </Col>
      </Row>
      <Row>
        {picElems.map((x) => (
          <Col key={x.key} xs="12" sm="4">
            {x}
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs="auto">Author : {article.owner.name}</Col>
        <Col xs="auto">
          {hasLike ? (
            <HeartFill onClick={onClickLike} />
          ) : (
            <Heart onClick={onClickLike} />
          )}{" "}
          {article.likes.length}
        </Col>
      </Row>
      <Row>
        <Col>
          <CommentForm articleId={article.articleId} />
        </Col>
      </Row>
      {article.comments.map((x) => (
        <Row key={x.articleCommentId}>
          <Col>
            <h6>{x.owner.name}</h6>
          </Col>
          <Col xs="auto">
            <small>{x.articleCommentId}</small>
          </Col>
          <Col xs="12">{x.content}</Col>
        </Row>
      ))}
    </Container>
  );
}
