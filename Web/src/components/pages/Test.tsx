import { ServiceContext } from "../../context";
import HttpClient from "../../models/HttpClient";
import ArticleService from "../../services/ArticleService";
import LatestPost from "../organisms/LatestPost";
import UploadForm from "../organisms/UploadForm";
interface IProps {
  httpClient: HttpClient;
  articleService: ArticleService;
}

export default function Test(props: IProps) {
  const client = props.httpClient;
  const onClick = async (): Promise<void> => {
    try {
      const res = await client.get("app/test").then((res) => res.data);
      alert(res);
    } catch (ex) {
      console.table(ex);
      alert("testに失敗しましたー");
    }
  };
  const onSubmit = async (files: File[]): Promise<void> => {
    const resp = await props.articleService.create(files);
    alert(JSON.stringify(resp));
  };

  return (
    <div>
      <h1>Test</h1>
      <button type="button" onClick={onClick}>
        てすと
      </button>
      <UploadForm onSubmit={onSubmit} />
      <ServiceContext.Consumer>
        {(context) => (
          <LatestPost
            articleService={context.articleService}
            pictureService={context.pictureService}
          />
        )}
      </ServiceContext.Consumer>
    </div>
  );
}
