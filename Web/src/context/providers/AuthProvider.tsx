import { useState } from "react";
import { AuthContext, IAuthContext, useAuthService } from "..";
import { IMyClaims } from "../../services/AuthService";

interface IProps {
  children: JSX.Element;
}

export default function AuthProvider(props: IProps) {
  const authService = useAuthService();
  const [token, setToken] = useState<IMyClaims | null>(null);

  const instance: IAuthContext = {
    token,
    signin: async (id: string, password: string): Promise<void> => {
      const jwt = await authService.signin(id, password);
      setToken(jwt);
    },
    signup: async (id: string, password: string): Promise<void> => {
      const jwt = await authService.signup(id, password);
      setToken(jwt);
    },
    signout: (): void => {
      setToken(null);
      authService.signout();
    },
    isAuthenticated: (): boolean => {
      return authService.isAuthenticated();
    },
  };

  return (
    <AuthContext.Provider value={instance}>
      {props.children}
    </AuthContext.Provider>
  );
}
