import { createContext, useContext } from "react";
import { IMyClaims } from "../services/AuthService";

export interface IAuthContext {
  token: IMyClaims | null;
  signin: (id: string, password: string) => Promise<void>;
  signup: (id: string, password: string) => Promise<void>;
  signout: () => void;
  isAuthenticated: () => boolean;
}

export const AuthContext = createContext<IAuthContext>(null!);
export const useAuth = () => useContext(AuthContext);
