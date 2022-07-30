import { useLocation, useParams } from "react-router-dom";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useApiClient, usePictureService } from "../context";
import { IArticle } from "../models/Interfaces";
import CommentForm from "../components/organisms/CommentForm";
import { useEffect, useState } from "react";

export default function ArticleDetail() {
  const client = useApiClient();
  const params = useParams<{ id: string }>();
  const [article, setArticle] = useState<IArticle | null>(
    useLocation().state as IArticle
  );

  useEffect(() => {
    if (params.id != null) {
      (async () =>
        setArticle(
          await client.get(`article/${params.id}`).then((res) => res.data)
        ))();
    }
  }, []);

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
        <Col xs="auto">Likes : {article.likes.length}</Col>
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
