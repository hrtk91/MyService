import { useNavigate } from "react-router-dom";
import { useArticleService } from "../../context";
import LatestPost from "../organisms/LatestPost";
import UploadForm from "../organisms/UploadForm";

export default function Test() {
  const navigate = useNavigate();
  const articleService = useArticleService();

  const onSubmit = async (files: File[]): Promise<void> => {
    await articleService.create(files);
    navigate(0);
  };

  return (
    <div>
      <h1>Test</h1>
      <div className="row">
        <div className="col-4">
          <h2>Upload</h2>
          <UploadForm onSubmit={onSubmit} />
        </div>
        <div className="col-8">
          <h2>LatestPost</h2>
          <LatestPost />
        </div>
      </div>
    </div>
  );
}
