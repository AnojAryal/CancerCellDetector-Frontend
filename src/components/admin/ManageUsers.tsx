import * as React from "react";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Input,
  Select,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { filterItems, sortItems } from "../generic/SortSelector";
import { useNavigate } from "react-router-dom";
import useManageUsers, { User } from "../../hooks/admin/useManageUsers";

const ManageUsers = () => {
  const navigate = useNavigate();
  const { users, loading, error } = useManageUsers();
  const [filterText, setFilterText] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  const filteredUsers = filterItems(users, filterText, "username");
  const sortedUsers = sortItems(
    filteredUsers,
    sortOrder as "asc" | "desc",
    "username"
  );

  if (loading) return <Spinner size="md" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Box p={5} maxW="1300px" mx="auto" mt="60px">
      <Heading mb={5} textAlign="center">
        Manage Users
      </Heading>
      <Text mb={5} textAlign="center">
        Total Users: {users.length} | Displaying: {sortedUsers.length}
      </Text>
      <VStack spacing={5} align="stretch">
        <HStack justify="center" spacing={4}>
          <Input
            placeholder="Search User..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            maxW="300px"
          />
          <Select
            maxW="220px"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Username (A-Z)</option>
            <option value="desc">Sort by Username (Z-A)</option>
          </Select>
          <Button
            colorScheme="green"
            onClick={() => {
              navigate("/admin/create-user");
              console.log("Create New User clicked");
            }}
          >
            Create New User
          </Button>
        </HStack>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={7}>
          {sortedUsers.map((user: User) => (
            <GridItem
              key={user.id}
              position="relative"
              onClick={() => navigate(`/admin/user-handler/${user.id}`)}
              cursor="pointer"
            >
              <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                _hover={{ boxShadow: "xl" }}
                transition="box-shadow 0.3s ease"
              >
                <Heading fontSize="xl" mb={2}>
                  {user.username}
                </Heading>
                <Text fontSize="md" mb={2}>
                  {user.full_name}
                </Text>
                <Text fontSize="md" mb={2}>
                  {user.email}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default ManageUsers;
