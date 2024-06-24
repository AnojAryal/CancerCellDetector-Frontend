import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Grid,
  GridItem,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { filterItems, sortItems } from "../generic/SortSelector";
import useManageUsers, { User } from "../../hooks/useManageUsers";

const ManageUsers = () => {
  // Custom hook to manage user data
  const { users, loading, error, deleteUser, updateUser } = useManageUsers();

  // Chakra UI modal disclosure hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State hooks for managing user data and forms
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [updatedEmail, setUpdatedEmail] = React.useState<string>(" ");
  const [updatedIsAdmin, setUpdatedIsAdmin] = React.useState<boolean>(false);
  const [updatedIsHospitalAdmin, setUpdatedIsHospitalAdmin] =
    React.useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  // Toast hook for displaying messages
  const toast = useToast();

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
    setUpdatedEmail(user.email)
    setUpdatedIsAdmin(user.is_admin);
    setUpdatedIsHospitalAdmin(user.is_hospital_admin);
    onOpen();
  };

  const handleUpdateSave = () => {
    if (selectedUser) {
      updateUser(selectedUser.id, {
        email: updatedEmail,
        is_admin: updatedIsAdmin,
        is_hospital_admin: updatedIsHospitalAdmin,
      });
      toast({
        title: "User updated.",
        description: "The user details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleDelete = (user_id: number) => {
    const userToDelete = users.find((user) => user.id === user_id);
    setSelectedUser(userToDelete || null);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      toast({
        title: "User deleted.",
        description: "The user has been removed successfully.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setDeleteModalOpen(false);
    }
  };

  // Filtering and sorting users
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
        <HStack justify="center">
          <Input
            placeholder="Search User..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            maxW="300px"
          />
          <Select
            maxW="200px"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Username (A-Z)</option>
            <option value="desc">Sort by Username (Z-A)</option>
          </Select>
        </HStack>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={7}>
          {sortedUsers.map((user: User) => (
            <GridItem key={user.id} position="relative">
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
                <Text fontSize="md" mb={2}>
                  {user.address}
                </Text>
                <Text fontSize="md" mb={2}>
                  Contact No: {user.contact_no}
                </Text>
                <Text fontSize="md" mb={2}>
                 Gender: {user.gender}
                </Text>
                <Text fontSize="md" mb={2}>
                 Blood Group: {user.blood_group}
                </Text>
                <Text fontSize="md" mb={2}>
                  Admin: {user.is_admin ? "Yes" : "No"}
                </Text>
                <Text fontSize="md" mb={2}>
                  Hospital Admin: {user.is_hospital_admin ? "Yes" : "No"}
                </Text>
                <Text fontSize="md" mb={2}>
                  Hospital Id: {user.hospital_id}
                </Text>
                <Box mt={4}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleUpdateClick(user)}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="80vh">
          <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Is Admin?</FormLabel>
              <Select
                value={updatedIsAdmin ? "yes" : "no"}
                onChange={(e) =>
                  setUpdatedIsAdmin(e.target.value === "yes" ? true : false)
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Is Hospital Admin?</FormLabel>
              <Select
                value={updatedIsHospitalAdmin ? "yes" : "no"}
                onChange={(e) =>
                  setUpdatedIsHospitalAdmin(
                    e.target.value === "yes" ? true : false
                  )
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove {selectedUser?.username} from the
            system?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Yes
            </Button>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManageUsers;

