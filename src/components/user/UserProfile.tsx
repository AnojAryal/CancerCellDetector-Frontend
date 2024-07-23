import { Box, Center } from "@chakra-ui/react";
import Layout from "../generic/layout";

const UserProfile = () => {
  return (
    <Center h="100%">
      <Box textAlign="center">
        <h1>Profile</h1>
        <p>Welcome to the user profile page!</p>
      </Box>
    </Center>
  );
};

const ProfilePage = () => {
  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
};

export default ProfilePage;
