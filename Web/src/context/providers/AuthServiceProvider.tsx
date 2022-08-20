import { AuthServiceContext, useApiClient } from "../../context";
import AuthService from "../../services/AuthService";

interface IProps {
  children: JSX.Element;
}

export default function AuthServiceProvider(props: IProps) {
  const apiClient = useApiClient();
  const authService = new AuthService(apiClient);
  return (
    <AuthServiceContext.Provider value={authService}>
      {props.children}
    </AuthServiceContext.Provider>
  );
}
