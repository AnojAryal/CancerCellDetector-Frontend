import { Grid, GridItem } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "./components/generic/NavBar";
import { useEffect } from "react";
import AppRoutes from "./routes";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const publicRoutes = ["/login", "/forgot-password"];

    if (token && location.pathname === "/login") {
      navigate("/home");
    } else if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

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
        <AppRoutes />
      </GridItem>
    </Grid>
  );
}

export default App;
