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
} from "@chakra-ui/react";
import useManageHospitals, { Hospital } from "../../hooks/useManageHospitals";

const ManageHospitals = () => {
  const { hospitals, loading, error, deleteHospital, updateHospital } =
    useManageHospitals();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedHospital, setSelectedHospital] =
    React.useState<Hospital | null>(null);
  const [updatedName, setUpdatedName] = React.useState<string>("");
  const [updatedAddress, setUpdatedAddress] = React.useState<string>("");
  const [updatedPhone, setUpdatedPhone] = React.useState<string>("");
  const [updatedEmail, setUpdatedEmail] = React.useState<string>("");
  const [updatedId, setUpdatedId] = React.useState<number>();
  const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);

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
      onClose();
      setDeleteModalOpen(false);
    }
  };

  if (loading) return <Spinner size="md" />;
  if (error)
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Box p={5}>
      <Heading mb={5} textAlign="center">
        Manage Hospitals
      </Heading>
      <Text mb={5} textAlign="center">
        Total Hospitals: {hospitals.length}
      </Text>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={5}>
        {hospitals.map((hospital: Hospital) => (
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
                  colorScheme="blue"
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
                type="text"
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
    </Box>
  );
};

export default ManageHospitals;
