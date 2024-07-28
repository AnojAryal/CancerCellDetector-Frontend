import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ProtectedPage from "./ProtectedPage";
import { isAdmin, isHospitalAdmin, isUser, token } from "./DecodeToken";

interface ProtectedRouteProps {
  children: ReactNode;
  isAdminRoute?: boolean;
  isHospitalAdminRoute?: boolean;
  isUserOrHospitalAdminRoute?: boolean;
  adminOnly?: boolean;
}

const ProtectedRoute = ({
  children,
  isAdminRoute = false,
  isHospitalAdminRoute = false,
  isUserOrHospitalAdminRoute = false,
  adminOnly = false,
}: ProtectedRouteProps): JSX.Element => {
  const location = useLocation();

  localStorage.setItem("intendedPath", location.pathname);
  const isAdminOrHospitalAdmin = isAdmin || isHospitalAdmin;

  if (adminOnly && !isAdmin) {
    return <ProtectedPage />;
  }

  if (isAdminRoute && !isAdminOrHospitalAdmin) {
    return <ProtectedPage />;
  }

  if (isHospitalAdminRoute && !isAdminOrHospitalAdmin) {
    return <ProtectedPage />;
  }

  if (isUserOrHospitalAdminRoute && !(isUser || isHospitalAdmin)) {
    return <ProtectedPage />;
  }

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
