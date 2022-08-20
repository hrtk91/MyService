import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context";

interface IProps {
  children: ReactNode;
}

export default function RequireAuth(props: IProps) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{props.children}</>;
}
