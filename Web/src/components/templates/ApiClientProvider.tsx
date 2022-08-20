import { ApiClientContext } from "../../context";
import ApiClient from "../../models/ApiClient";

interface IProps {
  children: JSX.Element;
}

export default function ApiClientProvider(props: IProps) {
  const apiClient = new ApiClient();
  return (
    <ApiClientContext.Provider value={apiClient}>
      {props.children}
    </ApiClientContext.Provider>
  );
}
