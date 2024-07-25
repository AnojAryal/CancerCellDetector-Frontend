import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";
import { isAdmin, isHospitalAdmin, token } from "./DecodeToken";

interface ProtectedRouteProps {
  children: ReactNode;
  isAdminRoute?: boolean;
  isHospitalAdminRoute?: boolean;
  adminOnly?: boolean;
}

const ProtectedRoute = ({
  children,
  isAdminRoute = false,
  isHospitalAdminRoute = false,
  adminOnly = false,
}: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();

  localStorage.setItem("intendedPath", location.pathname);
  const isAdminOrHospitalAdmin = isAdmin || isHospitalAdmin;
  const isAdminUser = isAdmin;

  if (adminOnly && !isAdminUser) {
    return <ProtectedPage />;
  }

  if (
    (isAdminRoute && !isAdminOrHospitalAdmin) ||
    (isHospitalAdminRoute && !isAdminOrHospitalAdmin)
  ) {
    return <ProtectedPage />;
  }

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
