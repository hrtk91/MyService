import { createContext, useContext } from "react";
import AuthService from "../services/AuthService";

export const AuthServiceContext = createContext<AuthService>(null!);
export const useAuthService = () => useContext(AuthServiceContext);
