import { useState } from "react";
import { AuthenticationServiceContext, useApiClient } from "../../context";
import AuthenticationService from "../../services/AuthenticationService";

interface IProps {
  children: JSX.Element;
}

export default function AuthenticationServiceProvider(props: IProps) {
  const apiClient = useApiClient();
  const [authService] = useState(new AuthenticationService(apiClient));
  return (
    <AuthenticationServiceContext.Provider value={authService}>
      {props.children}
    </AuthenticationServiceContext.Provider>
  );
}
