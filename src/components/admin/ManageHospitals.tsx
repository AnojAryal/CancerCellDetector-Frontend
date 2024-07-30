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
import useManageHospitals, {
  Hospital,
} from "../../hooks/admin/useManageHospitals";

const ManageHospitals = () => {
  // Custom hook to manage hospital data
  const { hospitals, loading, error, deleteHospital, updateHospital } =
    useManageHospitals();

  // Chakra UI modal disclosure hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  // State hooks for managing hospital data and forms
  const [selectedHospital, setSelectedHospital] =
    React.useState<Hospital | null>(null);
  const [updatedName, setUpdatedName] = React.useState<string>("");
  const [updatedAddress, setUpdatedAddress] = React.useState<string>("");
  const [updatedPhone, setUpdatedPhone] = React.useState<string>("");
  const [updatedEmail, setUpdatedEmail] = React.useState<string>("");
  const [updatedId, setUpdatedId] = React.useState<number>();
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  // Toast hook for displaying messages
  const toast = useToast();

  const handleUpdateClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setUpdatedName(hospital.name);
    setUpdatedAddress(hospital.address);
    setUpdatedPhone(hospital.phone);
    setUpdatedEmail(hospital.email);
    setUpdatedId(hospital.id);
    onOpen();
  };

  const handleUpdateSave = () => {
    if (selectedHospital) {
      updateHospital(selectedHospital.id, {
        name: updatedName,
        address: updatedAddress,
        phone: updatedPhone,
        email: updatedEmail,
        id: updatedId,
      });
      toast({
        title: "Hospital updated.",
        description: "The hospital details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleDelete = (hospital_id: number) => {
    const hospitalToDelete = hospitals.find(
      (hospital) => hospital.id === hospital_id
    );
    setSelectedHospital(hospitalToDelete || null);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedHospital) {
      deleteHospital(selectedHospital.id);
      toast({
        title: "Hospital deleted.",
        description: "The hospital has been removed successfully.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setDeleteModalOpen(false);
    }
  };

  // Filtering and sorting hospitals
  const filteredHospitals = filterItems(hospitals, filterText, "name");
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
        Total Hospitals: {hospitals.length} | Displaying:{" "}
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
          {sortedHospitals.map((hospital: Hospital) => (
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
                    onClick={() => handleDelete(hospital.id)}
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
            <FormControl mb={3}>
              <FormLabel>Hospital Id</FormLabel>
              <Input
                type="number"
                value={updatedId}
                onChange={(e) => setUpdatedId(e.target.valueAsNumber)}
              />
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
      <CreateHospital isOpen={isCreateOpen} onClose={onCreateClose} />
    </Box>
  );
};

export default ManageHospitals;
