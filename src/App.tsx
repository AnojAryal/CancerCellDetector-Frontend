import { Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/generic/NavBar";
import { useEffect } from "react";
import AppRoutes from "./routes";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
