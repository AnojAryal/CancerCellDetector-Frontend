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
import UserProfile from "./components/user/UserProfile";
import ManageHospitals from "./components/admin/ManageHospitals";
import ManageUser from "./components/admin/ManageUsers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/settings" element={<UserSetting />} />
      <Route path="/user-profile" element={<UserProfile />} />

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
        path="/create-user"
        element={
          <ProtectedRoute isAdminRoute>
            <UserCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-user"
        element={
          <ProtectedRoute isAdminRoute>
            <ManageUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-hospital"
        element={
          <ProtectedRoute isAdminRoute>
            <CreateHospital />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-hospital"
        element={
          <ProtectedRoute isAdminRoute>
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

      <Route path="*" element={<Navigate to="/" />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
