import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { decodeToken } from "./DecodeToken";
import ProtectedPage from "./ProtectedPage";

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

  const location = useLocation();

  localStorage.setItem("intendedPath", location.pathname);

  if (isAdminRoute && !isAdmin) {
    return <ProtectedPage />;
  }

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
