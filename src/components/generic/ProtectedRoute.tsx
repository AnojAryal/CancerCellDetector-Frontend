import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "./DecodeToken";

interface ProtectedRouteProps {
  children: ReactNode;
  isAdminRoute?: boolean;
}

const ProtectedRoute = ({
  children,
  isAdminRoute = false,
}: ProtectedRouteProps): JSX.Element => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = decodeToken(token || "");
  const isAdmin = decodedToken ? decodedToken.is_admin : false;

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/403" replace />;
  }

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
