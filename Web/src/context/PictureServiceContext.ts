import { createContext, useContext } from "react";
import PictureService from "../services/PictureService";

export const PictureServiceContext = createContext<PictureService>(null!);
export const usePictureService = () => useContext(PictureServiceContext);
