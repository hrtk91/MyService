import { createContext, useContext } from "react";
import ApiClient from "../models/ApiClient";

export const ApiClientContext = createContext<ApiClient>(null!);
export const useApiClient = () => useContext(ApiClientContext);
