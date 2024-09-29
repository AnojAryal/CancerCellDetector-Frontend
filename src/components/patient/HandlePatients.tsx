import { useState, useEffect, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Grid,
} from "@chakra-ui/react";
import { MdEmail, MdPhone, MdCake } from "react-icons/md";
import { isHospitalAdmin } from "../generic/DecodeToken";
import PatientCellTests from "./PatientCellTests";
import { Patient, Address } from "./ManagePatients";
import useManagePatients from "../../hooks/user/useManagePatients";
import { FaAddressCard } from "react-icons/fa";
import { BiEdit, BiHome } from "react-icons/bi";

const HandlePatients = () => {
  const location = useLocation();
  const patient_id = location.state?.patient?.id as string;
  const hospital_id = isHospitalAdmin?.toString() || "";

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isAddressEditOpen,
    onOpen: onAddressEditOpen,
    onClose: onAddressEditClose,
  } = useDisclosure();

  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { useFetchPatientById, updatePatient, updatePatientAddress } =
    useManagePatients(hospital_id);

  const {
    data: fetchedPatient,
    isError,
    isLoading,
  } = useFetchPatientById(patient_id);

  const headingFontSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (fetchedPatient) {
      console.log("Fetched Patient Data:", fetchedPatient);
      setEditPatient(fetchedPatient);
      if (fetchedPatient.address) {
        setEditAddress(fetchedPatient.address);
        console.log("Fetched Address:", fetchedPatient.address);
      }
    }
  }, [fetchedPatient]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditPatient((prevPatient) =>
      prevPatient ? { ...prevPatient, [name]: value } : null
    );
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditAddress((prevAddress) =>
      prevAddress ? { ...prevAddress, [name]: value } : null
    );
  };

  const handleSavePatientChanges = async () => {
    if (editPatient) {
      try {
        await updatePatient.mutateAsync({
          patient_id: editPatient.id,
          updatedData: editPatient,
        });
        setFeedbackMessage("Patient details updated successfully.");
        setTimeout(() => setFeedbackMessage(""), 5000);
        onEditClose();
      } catch {
        setError("Failed to update patient details.");
      }
    }
  };

  const handleSaveAddressChanges = async () => {
    if (editAddress && patient_id) {
      const addressIdAsNumber = editAddress.id;
      if (addressIdAsNumber === undefined) {
        setError("Address ID is undefined.");
        return;
      }

      try {
        await updatePatientAddress.mutateAsync({
          patient_id,
          address_id: addressIdAsNumber,
          address: editAddress,
        });
        setFeedbackMessage("Address updated successfully.");
        setTimeout(() => setFeedbackMessage(""), 5000);
        onAddressEditClose();
      } catch (error) {
        console.error("Error updating address:", error);
        setError("Failed to update address.");
      }
    } else {
      setError("Address or patient ID is undefined.");
    }
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching patient details.</Text>;

  return (
    <Box p={5} maxW="1200px" mx="auto" mt="60px" minH="100vh" bg={bgColor}>
      <Box mb={5}>
        <Box display="flex" flexDirection="column" mb={5}>
          <Box display="flex" alignItems="center" mb={3}>
            <Heading flex="1" fontSize={headingFontSize} color={textColor}>
              {editPatient
                ? `${editPatient.first_name} ${editPatient.last_name}`
                : "Loading..."}
            </Heading>
            <Box display="flex" alignItems="center">
              <Button
                variant="outline"
                onClick={onEditOpen}
                aria-label="Edit Patient Details"
                isDisabled={!editPatient}
              >
                <Icon as={BiEdit} boxSize={6} />
              </Button>
              <Button
                variant="outline"
                ml={3}
                onClick={onAddressEditOpen}
                aria-label="Edit Address"
                isDisabled={!editPatient}
              >
                <Icon as={BiHome} boxSize={6} />
              </Button>
            </Box>
          </Box>

          <Box
            p={4}
            borderWidth="2px"
            borderRadius="md"
            bg={cardBgColor}
            minH="120px"
            overflow="hidden"
            borderColor={borderColor}
          >
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box>
                <VStack spacing={3} align="start">
                  <Box display="flex" alignItems="center">
                    <Icon as={MdEmail} boxSize={5} mr={2} color={textColor} />
                    <Text color={textColor}>
                      {editPatient ? editPatient.email : "Loading..."}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon as={MdPhone} boxSize={5} mr={2} color={textColor} />
                    <Text color={textColor}>
                      {editPatient ? editPatient.phone : "Loading..."}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon as={MdCake} boxSize={5} mr={2} color={textColor} />
                    <Text color={textColor}>
                      {editPatient
                        ? new Date(editPatient.birth_date).toLocaleDateString()
                        : "Loading..."}
                    </Text>
                  </Box>
                </VStack>
              </Box>
              <Box>
                <VStack spacing={3} align="start">
                  <Box display="flex" alignItems="center">
                    <Icon as={BiHome} boxSize={5} mr={2} color={textColor} />
                    <Text color={textColor}>
                      {editAddress ? editAddress.street : "Loading..."}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon
                      as={FaAddressCard}
                      boxSize={5}
                      mr={2}
                      color={textColor}
                    />
                    <Text color={textColor}>
                      {editAddress ? editAddress.city : "Loading..."}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Grid>
          </Box>
        </Box>

        <PatientCellTests patient_id={patient_id} />

        {feedbackMessage && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            {feedbackMessage}
          </Alert>
        )}
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Patient Details</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="first_name"
                  value={editPatient?.first_name || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="last_name"
                  value={editPatient?.last_name || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={editPatient?.email || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={editPatient?.phone || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Birth Date</FormLabel>
                <Input
                  type="date"
                  name="birth_date"
                  value={editPatient?.birth_date?.substring(0, 10) || ""}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSavePatientChanges} mr={3}>
                Save
              </Button>
              <Button variant="ghost" onClick={onEditClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isAddressEditOpen} onClose={onAddressEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Address</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Street</FormLabel>
                <Input
                  name="street"
                  value={editAddress?.street || ""}
                  onChange={handleAddressChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  value={editAddress?.city || ""}
                  onChange={handleAddressChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleSaveAddressChanges} mr={3}>
                Save
              </Button>
              <Button variant="ghost" onClick={onAddressEditClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default HandlePatients;
