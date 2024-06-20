import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const token = localStorage.getItem("accessToken");
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;


