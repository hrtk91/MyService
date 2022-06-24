import { useEffect, useState } from "react";
import { AuthContext, useAuthService } from "../../context";
import jwt_decode from "jwt-decode";

interface IProps {
  children: JSX.Element;
}

interface IMyClaims {
  userId: string;
}

export default function AuthProvider(props: IProps) {
  const authService = useAuthService();
  const [token, setToken] = useState("");

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

  const isAuthenticated = () => token !== "";

  useEffect(() => {
    console.log(`AuthProvider : ${token}`);
  });

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
