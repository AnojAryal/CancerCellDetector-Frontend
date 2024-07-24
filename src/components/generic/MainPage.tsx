import { useState } from "react";
import ManagePatient from "../patient/ManagePatient";
import UserProfile from "../user/UserProfile";

import { Box } from "@chakra-ui/react";
import Layout from "./layout";
import CellTest from "../user/CellTest";

const MainPage = () => {
  const [activePage, setActivePage] = useState<string>("profile");

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <Layout onPageChange={handlePageChange}>
      <Box p={4}>
        {activePage === "profile" && <UserProfile />}
        {activePage === "patient" && <ManagePatient />}
        {activePage === "test" && <CellTest />}
      </Box>
    </Layout>
  );
};

export default MainPage;
