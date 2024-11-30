import { Routes, Route } from "react-router-dom";
import Login from "./components/user/UserLogin";
import UserCreate from "./components/admin/CreateUser";
import ForgotPassword from "./components/user/UserForgotPassword";
import Home from "./components/user/UserHome";
import ProtectedRoute from "./components/generic/ProtectedRoute";
import ManageHospitals from "./components/admin/ManageHospitals";
import ManageUser from "./components/admin/ManageUsers";
import NotAvailPage from "./components/generic/NotAvailPage";
import ManagePatients from "./components/patient/ManagePatients";
import UserHandler from "./components/admin/UserHandler";
import HandlePatients from "./components/patient/HandlePatients";
import DetectCancerCell from "./components/patient/DetectCancerCell";
import ResultDetails from "./components/patient/ResultDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />


      {/* Only users and hospital admins can access*/}
      <Route
        path="/patients"
        element={
          <ProtectedRoute isUserOrHospitalAdminRoute>
            <ManagePatients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <ProtectedRoute isUserOrHospitalAdminRoute>
            <HandlePatients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:patient_id/cell_tests/:cell_test_id"
        element={
          <ProtectedRoute isUserOrHospitalAdminRoute>
            <DetectCancerCell />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:patient_id/cell_tests/:cell_test_id/results"
        element={
          <ProtectedRoute isUserOrHospitalAdminRoute>
            <ResultDetails />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/create-user"
        element={
          <ProtectedRoute isHospitalAdminRoute>
            <UserCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user-handler/:id"
        element={
          <ProtectedRoute isHospitalAdminRoute>
            <UserHandler />
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
