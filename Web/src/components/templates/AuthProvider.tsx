import { useEffect, useState } from "react";
import { AuthContext, useAuthService } from "../../context";
import jwt_decode from "jwt-decode";

interface IProps {
  children: JSX.Element;
}

interface IMyClaims {
  exp: number;
  userId: string;
}

export default function AuthProvider(props: IProps) {
  const authService = useAuthService();
  const tokenFromLocalStorage = () => {
    const token = localStorage.getItem("token") || "";
    authService.setAuthHeader(token);
    return token;
  };

  const [token, setToken] = useState(tokenFromLocalStorage());

  const getJwtClaims = (token: string): IMyClaims => {
    const claims: IMyClaims = jwt_decode(token);
    return claims;
  };

  const userId = (): string => {
    const claims = getJwtClaims(token);
    return claims.userId;
  };

  const signin = async (id: string, password: string): Promise<void> => {
    const token = await authService.signin(id, password);
    setToken(token);
  };

  const signup = async (id: string, password: string): Promise<void> => {
    const token = await authService.signup(id, password);
    setToken(token);
  };

  const signout = () => {
    authService.signout();
    setToken("");
  };

  const isAuthenticated = () => {
    if (token === "") return false;

    const claims = getJwtClaims(token);
    const expiration = claims.exp * 1000;
    return Date.now() < expiration;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authService.setAuthHeader(token);
      setToken(token);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        signin,
        signup,
        signout,
        isAuthenticated,
        userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
