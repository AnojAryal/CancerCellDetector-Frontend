import { useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import UserCreate from "./components/UserCreate";
import ForgotPassword from "./components/ForgotPassword";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UserSetting from "./components/UserSetting";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Checking if access token exists in local storage
    // If access token exists, do nothing (user is already logged in)
    const Token = localStorage.getItem("accessToken");
    if (!Token) {
      navigate("/login");
    }
  }, []);

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
          <Route path="/create-user" element={<UserCreate />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/settings" element={<UserSetting />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
