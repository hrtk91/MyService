import { useState } from "react";
import { PictureServiceContext, useApiClient } from "../../context";
import PictureService from "../../services/PictureService";

interface IProps {
  children: JSX.Element;
}

export default function PictureServiceProvider(props: IProps) {
  const [apiClient] = useState(useApiClient());
  const [pictureService] = useState(new PictureService(apiClient));
  return (
    <PictureServiceContext.Provider value={pictureService}>
      {props.children}
    </PictureServiceContext.Provider>
  );
}
