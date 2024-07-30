import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
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
  Grid,
  GridItem,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";

import { isAdmin } from "../generic/DecodeToken";
import useManageUsers, { User } from "../../hooks/admin/useManageUsers";

const UserHandler = () => {
  const { id } = useParams<{ id: string }>();
  const { users, loading, error, deleteUser, updateUser } = useManageUsers();
  const user = users.find((user) => user.id.toString() === id);
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("teal.600", "teal.200");
  const dividerColor = useColorModeValue("teal.200", "teal.600");

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});

  const handleDelete = async () => {
    try {
      await deleteUser(Number(id));
      toast({
        title: "User deleted.",
        description: "The user has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "An error occurred.",
        description: "Unable to delete the user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(Number(id), updatedUser);
      toast({
        title: "User updated.",
        description: "The user has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUpdateModalOpen(false);
    } catch {
      toast({
        title: "An error occurred.",
        description: "Unable to update the user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) return <Spinner size="lg" color="teal.500" />;
  if (error)
    return (
      <Alert status="error" mt={5}>
        <AlertIcon />
        {error}
      </Alert>
    );
  if (!user) return <Text mt={5}>No user found with ID {id}</Text>;

  return (
    <Box
      p={8}
      maxW="900px"
      mx="auto"
      mt="60px"
      bg={bgColor}
      shadow="xl"
      borderRadius="lg"
    >
      <VStack spacing={6} align="stretch">
        <Heading mb={5} textAlign="center" fontSize="2xl" color={textColor}>
          User Details
        </Heading>
        <Divider borderColor={dividerColor} />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Text fontSize="lg" fontWeight="bold">
              Username:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.username}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Full Name:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.full_name}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Email:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.email}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Address:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.address}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Blood Group:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.blood_group}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontSize="lg" fontWeight="bold">
              Gender:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.gender}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Contact No:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.contact_no}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Admin:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.is_admin ? "Yes" : "No"}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Hospital Admin:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.is_hospital_admin ? "Yes" : "No"}
            </Text>
            <Text fontSize="lg" fontWeight="bold">
              Hospital ID:
            </Text>
            <Text fontSize="md" mb={3}>
              {user.hospital_id}
            </Text>
          </GridItem>
        </Grid>
        <Divider borderColor={dividerColor} />
        <HStack spacing={6} justify="center">
          <Button
            colorScheme="green"
            size="md"
            onClick={() => setUpdateModalOpen(true)}
          >
            Update User
          </Button>
          <Button
            colorScheme="red"
            size="md"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete User
          </Button>
        </HStack>
      </VStack>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={updatedUser.email ?? user.email ?? ""}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
            </FormControl>
            {isAdmin && (
              <FormControl mt={4}>
                <FormLabel>Admin</FormLabel>
                <Select
                  value={updatedUser.is_admin ?? user.is_admin ? "yes" : "no"}
                  onChange={(e) =>
                    setUpdatedUser({
                      ...updatedUser,
                      is_admin: e.target.value === "yes",
                    })
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Select>
              </FormControl>
            )}
            <FormControl mt={4}>
              <FormLabel>Hospital Admin</FormLabel>
              <Select
                value={
                  updatedUser.is_hospital_admin ?? user.is_hospital_admin
                    ? "yes"
                    : "no"
                }
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    is_hospital_admin: e.target.value === "yes",
                  })
                }
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setUpdateModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this user?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserHandler;
