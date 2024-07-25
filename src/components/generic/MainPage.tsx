import { useEffect, useState } from "react";
import ManagePatient from "../patient/ManagePatient";
import UserProfile from "../user/UserProfile";
import CellTest from "../user/CellTest";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Layout from "./layout";

const MainPage = () => {
  const [activePage, setActivePage] = useState<string>("profile");
  const location = useLocation();

  // Handle page change and update the URL
  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.history.replaceState({}, "", `/dashboard/${page}`);
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path) {
      setActivePage(path);
    }
  }, [location.pathname]);

  return (
    <Layout onPageChange={handlePageChange} activePage={activePage}>
      <Box p={4}>
        {activePage === "profile" && <UserProfile />}
        {activePage === "patient" && <ManagePatient />}
        {activePage === "test" && <CellTest />}
      </Box>
    </Layout>
  );
};

export default MainPage;
