import { Navigate } from "react-router-dom";
import { useAuth } from "../context";

export default function Signout() {
  const auth = useAuth();
  auth.signout();
  return <Navigate to="/" replace />;
}
