import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context";

export default function Signout() {
  const auth = useAuth();
  useEffect(auth.signout);
  return <Navigate to="/" replace />;
}
