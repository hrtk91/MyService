import { createContext } from "react";
import HttpClient from "./models/HttpClient";
import AccountService from "./services/AccountService";

const hc = new HttpClient();
const as = new AccountService(hc);

export const ServiceContext = createContext({
  httpClient: hc,
  accountService: as,
});
