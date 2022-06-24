import { createContext, useContext } from "react";
import ApiClient from "./models/ApiClient";
import AuthenticationService from "./services/AuthenticationService";
import ArticleService from "./services/ArticleService";
import PictureService from "./services/PictureService";

export const ApiClientContext = createContext<ApiClient>(null!);
export const useApiClient = () => useContext(ApiClientContext);

export const ArticleServiceContext = createContext<ArticleService>(null!);
export const useArticleService = () => useContext(ArticleServiceContext);

export const PictureServiceContext = createContext<PictureService>(null!);
export const usePictureService = () => useContext(PictureServiceContext);

export const AuthenticationServiceContext =
  createContext<AuthenticationService>(null!);
export const useAuthService = () => useContext(AuthenticationServiceContext);

interface AuthContext {
  token: string;
  signin: (id: string, password: string) => Promise<void>;
  signup: (id: string, password: string) => Promise<void>;
  signout: () => void;
  isAuthenticated: () => boolean;
  userId: () => string;
}

export const AuthContext = createContext<AuthContext>(null!);
export const useAuth = () => useContext(AuthContext);
