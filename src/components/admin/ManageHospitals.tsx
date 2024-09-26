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
import CreateHospital from "./CreateHospital";
import useManageHospitals from "../../hooks/admin/useManageHospitals";
import useGetHospital, { Hospital } from "../../hooks/admin/useGetHospital";

const ManageHospitals = () => {
  const { deleteHospital, updateHospital } = useManageHospitals();
  const { hospitals, loading, error } = useGetHospital();
  console.log("Fetched Hospitals:", hospitals);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [selectedHospital, setSelectedHospital] =
    React.useState<Hospital | null>(null);
  const [updatedName, setUpdatedName] = React.useState<string>("");
  const [updatedAddress, setUpdatedAddress] = React.useState<string>("");
  const [updatedPhone, setUpdatedPhone] = React.useState<string>("");
  const [updatedEmail, setUpdatedEmail] = React.useState<string>("");
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  const toast = useToast();

  const handleUpdateClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setUpdatedName(hospital.name);
    setUpdatedAddress(hospital.address);
    setUpdatedPhone(hospital.phone);
    setUpdatedEmail(hospital.email);
    onOpen();
  };

  const handleUpdateSave = async () => {
    if (selectedHospital) {
      try {
        await updateHospital({
          hospital_id : selectedHospital.id,
          updatedHospital: {
            id: selectedHospital.id,
            name: updatedName,
            address: updatedAddress,
            phone: updatedPhone,
            email: updatedEmail,
          },
        });
        toast({
          title: "Hospital updated.",
          description: "The hospital details have been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch {
        toast({
          title: "Error updating hospital.",
          description: "An error occurred while updating the hospital.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleDelete = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedHospital) {
      try {
        await deleteHospital(selectedHospital.id);
        toast({
          title: "Hospital deleted.",
          description: "The hospital has been removed successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setDeleteModalOpen(false);
        setSelectedHospital(null); // Clear selected hospital
      } catch {
        toast({
          title: "Error deleting hospital.",
          description: "An error occurred while deleting the hospital.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Filtering and sorting hospitals
  const filteredHospitals = filterItems(hospitals ?? [], filterText, "name");
  console.log("Filtered Hospitals:", filteredHospitals);
  const sortedHospitals = sortItems(
    filteredHospitals,
    sortOrder as "asc" | "desc",
    "name"
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
    <Box p={5} maxW="1200px" mx="auto">
      <Heading mb={5} textAlign="center">
        Manage Hospitals
      </Heading>
      <Text mb={5} textAlign="center">
        Total Hospitals: {(hospitals ?? []).length} | Displaying:{" "}
        {sortedHospitals.length}
      </Text>
      <VStack spacing={5} align="stretch">
        <HStack justify="center">
          <Input
            placeholder="Search Hospital..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            maxW="300px"
          />
          <Select
            maxW="200px"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Name (A-Z)</option>
            <option value="desc">Sort by Name (Z-A)</option>
          </Select>
          <Button colorScheme="green" onClick={onCreateOpen}>
            Create
          </Button>
        </HStack>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={5}>
          {sortedHospitals.map((hospital) => (
            <GridItem key={hospital.id} position="relative">
              <Box
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                _hover={{ boxShadow: "xl" }}
                transition="box-shadow 0.3s ease"
              >
                <Heading fontSize="xl" mb={2}>
                  {hospital.name}
                </Heading>
                <Text fontSize="md" mb={2}>
                  {hospital.address}
                </Text>
                <Text fontSize="md" mb={2}>
                  {hospital.email}
                </Text>
                <Text fontSize="md" mb={2}>
                  {hospital.phone}
                </Text>
                <Box mt={4}>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleUpdateClick(hospital)}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDelete(hospital)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>

      {/* Update Hospital Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Hospital</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Hospital Name</FormLabel>
              <Input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Hospital Address</FormLabel>
              <Input
                type="text"
                value={updatedAddress}
                onChange={(e) => setUpdatedAddress(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Hospital Phone Number</FormLabel>
              <Input
                type="text"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Hospital Email</FormLabel>
              <Input
                type="text"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleUpdateSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Hospital Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Hospital</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove {selectedHospital?.name} from the
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

      {/* Create Hospital Modal */}
      <CreateHospital isOpen={isCreateOpen} onClose={onCreateClose} />
    </Box>
  );
};

export default ManageHospitals;
