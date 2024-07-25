import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/user/UserLogin";
import UserCreate from "./components/admin/CreateUser";
import ForgotPassword from "./components/user/UserForgotPassword";
import Home from "./components/user/UserHome";
import UserSetting from "./components/user/UserSetting";
import ProtectedRoute from "./components/generic/ProtectedRoute";
import Admin from "./components/admin/Admin";
import ChangePassword from "./components/user/UserChangePassword";
import CreateHospital from "./components/admin/CreateHospital";
import ManageHospitals from "./components/admin/ManageHospitals";
import ManageUser from "./components/admin/ManageUsers";
import NotAvailPage from "./components/generic/NotAvailPage";
import PatientCreate from "./components/patient/PatientCreate";
import UserProfile from "./components/user/UserProfile";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<UserProfile />} />

      <Route path="/settings" element={<UserSetting />} />
      <Route path="/settings/change-password" element={<ChangePassword />} />
      <Route path="/settings/create-patient" element={<PatientCreate />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAdminRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-user"
        element={
          <ProtectedRoute isHospitalAdminRoute>
            <UserCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-user"
        element={
          <ProtectedRoute isAdminRoute>
            <ManageUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-hospital"
        element={
          <ProtectedRoute isAdminRoute adminOnly>
            <CreateHospital />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-hospital"
        element={
          <ProtectedRoute isAdminRoute adminOnly>
            <ManageHospitals />
          </ProtectedRoute>
        }
      />

      {/* ProtectedRoute */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotAvailPage />} />
    </Routes>
  );
};

export default AppRoutes;
