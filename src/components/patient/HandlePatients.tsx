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
  const patientId = location.state?.patient?.id as number | undefined;
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

  const [patient, setPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { updatePatient, updatePatientAddress, fetchPatientById } =
    useManagePatients(hospital_id);

  const headingFontSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (patientId) {
      fetchPatientById(patientId)
        .then((fetchedPatient) => {
          setPatient(fetchedPatient);
          setEditPatient(fetchedPatient);
          if (fetchedPatient.address?.id) {
            setEditAddress(fetchedPatient.address);
          }
        })
        .catch(() => setError("Failed to fetch patient details."));
    }
  }, [patientId, fetchPatientById]);

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
        await updatePatient(editPatient.id, editPatient);
        setFeedbackMessage(
          `Patient details updated successfully. Updated details: ${editPatient.first_name} ${editPatient.last_name}, ${editPatient.email}, ${editPatient.phone}, ${editPatient.birth_date}.`
        );
        setTimeout(() => setFeedbackMessage(""), 5000);
        onEditClose();
      } catch {
        setError("Failed to update patient details.");
      }
    }
  };

  const handleSaveAddressChanges = async () => {
    if (editAddress && editPatient) {
      try {
        await updatePatientAddress(editPatient.id, editAddress.id, editAddress);
        setFeedbackMessage("Address updated successfully.");
        setTimeout(() => setFeedbackMessage(""), 5000);
        const updatedPatient = await fetchPatientById(editPatient.id);
        setEditAddress(updatedPatient.address || null);
        onAddressEditClose();
      } catch {
        setError("Failed to update address.");
      }
    }
  };

  return (
    <Box p={5} maxW="1200px" mx="auto" mt="60px" minH="100vh" bg={bgColor}>
      <Box mb={5}>
        <Box display="flex" flexDirection="column" mb={5}>
          <Box display="flex" alignItems="center" mb={3}>
            <Heading flex="1" fontSize={headingFontSize} color={textColor}>
              {patient
                ? `${patient.first_name} ${patient.last_name}`
                : "Loading..."}
            </Heading>
            <Box display="flex" alignItems="center">
              <Button
                variant="outline"
                onClick={onEditOpen}
                aria-label="Edit Patient Details"
                isDisabled={!patient}
              >
                <Icon as={BiEdit} boxSize={6} />
              </Button>
              <Button
                variant="outline"
                ml={3}
                onClick={onAddressEditOpen}
                aria-label="Edit Address"
                isDisabled={!patient}
              >
                <Icon as={BiHome} boxSize={6} />
              </Button>
            </Box>
          </Box>

          <Box
            p={4}
            borderWidth="1px"
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
                    <Text fontSize="md" color={textColor}>
                      {patient?.email}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon as={MdPhone} boxSize={5} mr={2} color={textColor} />
                    <Text fontSize="md" color={textColor}>
                      {patient?.phone}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon as={MdCake} boxSize={5} mr={2} color={textColor} />
                    <Text fontSize="md" color={textColor}>
                      {patient?.birth_date}
                    </Text>
                  </Box>
                </VStack>
              </Box>
              {editAddress && (
                <Box>
                  <VStack spacing={3} align="start">
                    <Box display="flex" alignItems="center">
                      <Icon
                        as={FaAddressCard}
                        boxSize={5}
                        mr={2}
                        color={textColor}
                      />
                      <Text fontSize="md" color={textColor}>
                        {editAddress.street}, {editAddress.city}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              )}
            </Grid>
          </Box>

          <Box mt={5}>
            <PatientCellTests initialCellTests={["Test 1", "Test 2"]} />
          </Box>
        </Box>
      </Box>

      {/* Patient Details Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patient</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="first_name"
                value={editPatient?.first_name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="last_name"
                value={editPatient?.last_name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={editPatient?.email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={editPatient?.phone || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Birth Date</FormLabel>
              <Input
                name="birth_date"
                value={editPatient?.birth_date || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleSavePatientChanges}
              isDisabled={!editPatient}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Address Editing Modal */}
      <Modal isOpen={isAddressEditOpen} onClose={onAddressEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Address</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Street</FormLabel>
              <Input
                name="street"
                value={editAddress?.street || ""}
                onChange={handleAddressChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>City</FormLabel>
              <Input
                name="city"
                value={editAddress?.city || ""}
                onChange={handleAddressChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleSaveAddressChanges}
              isDisabled={!editAddress || !editPatient}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onAddressEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {feedbackMessage && (
        <Alert status="success" mt={5}>
          <AlertIcon />
          {feedbackMessage}
        </Alert>
      )}
      {error && (
        <Alert status="error" mt={5}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default HandlePatients;
