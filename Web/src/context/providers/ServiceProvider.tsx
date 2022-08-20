import AuthServiceProvider from "./AuthServiceProvider";
import ApiClientProvider from "../../components/templates/ApiClientProvider";
import ArticleServiceProvider from "../../components/templates/ArticleServiceProvider";
import PictureServiceProvider from "../../components/templates/PictureServiceProvider";

interface IProps {
  children: JSX.Element;
}

export default function ServiceProvider(props: IProps) {
  return (
    <ApiClientProvider>
      <AuthServiceProvider>
        <ArticleServiceProvider>
          <PictureServiceProvider>{props.children}</PictureServiceProvider>
        </ArticleServiceProvider>
      </AuthServiceProvider>
    </ApiClientProvider>
  );
}
