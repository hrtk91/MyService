import AuthenticationServiceProvider from "./AuthenticationServiceProvider";
import ApiClientProvider from "./ApiClientProvider";
import ArticleServiceProvider from "./ArticleServiceProvider";
import PictureServiceProvider from "./PictureServiceProvider";

interface IProps {
  children: JSX.Element;
}

export default function ServiceProvider(props: IProps) {
  return (
    <ApiClientProvider>
      <AuthenticationServiceProvider>
        <ArticleServiceProvider>
          <PictureServiceProvider>{props.children}</PictureServiceProvider>
        </ArticleServiceProvider>
      </AuthenticationServiceProvider>
    </ApiClientProvider>
  );
}
