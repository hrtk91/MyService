import { useNavigate } from "react-router-dom";
import { useArticleService } from "../context";
import LatestPost from "../components/organisms/LatestPost";
import UploadForm from "../components/organisms/UploadForm";
import { Container, Row, Col } from "reactstrap";

export default function Test() {
  const navigate = useNavigate();
  const articleService = useArticleService();

  const onSubmit = async (files: File[]): Promise<void> => {
    await articleService.create(files);
    navigate(0);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Test</h1>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <h2>Upload</h2>
          <UploadForm onSubmit={onSubmit} />
        </Col>
        <Col>
          <h2>LatestPost</h2>
          <LatestPost />
        </Col>
      </Row>
    </Container>
  );
}
