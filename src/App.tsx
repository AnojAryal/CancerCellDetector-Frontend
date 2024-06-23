import { Grid, GridItem } from "@chakra-ui/react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/user/UserLogin.tsx";
import UserCreate from "./components/admin/CreateUser.tsx";
import ForgotPassword from "./components/user/UserForgotPassword.tsx";
import NavBar from "./components/generic/NavBar.tsx";
import Home from "./components/user/UserHome.tsx";
import UserSetting from "./components/user/UserSetting.tsx";
import ProtectedRoute from "./components/generic/ProtectedRoute.tsx";
import Admin from "./components/admin/Admin.tsx";
import ChangePassword from "./components/user/UserChangePassword.tsx";
import CreateHospital from "./components/admin/CreateHospital.tsx";
import UserProfile from "./components/user/UserProfile.tsx";
import ManageHospitals from "./components/admin/ManageHospitals.tsx";
import { useEffect } from "react";
import Forbidden from "./components/generic/Forbidden.tsx";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Checking if access token exists in local storage
    // If access token exists, do nothing (user is already logged in)
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  },[]);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
      templateColumns={{
        base: "1fr",
      }}
      height="100vh"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="main">
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

          <Route path="/403" element={<Forbidden />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;