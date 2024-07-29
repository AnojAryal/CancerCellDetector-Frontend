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
  ModalCloseButton,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Grid,
} from "@chakra-ui/react";
import { MdEmail, MdPhone, MdCake, MdEdit } from "react-icons/md";
import useManagePatients from "../../hooks/useManagePatients";
import { isHospitalAdmin } from "../generic/DecodeToken";
import CellTests from "./CellTests";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  hospital_id: string;
}

const HandlePatients = () => {
  const location = useLocation();
  const patient = location.state?.patient as Patient | undefined;
  const hospital_id = isHospitalAdmin?.toString() || "";

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [editPatient, setEditPatient] = useState<Patient>(
    patient || ({} as Patient)
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { updatePatient } = useManagePatients(hospital_id);

  const headingFontSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (patient) {
      setEditPatient(patient);
    }
  }, [patient]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditPatient((prevPatient) => ({ ...prevPatient, [name]: value }));
  };

  const handleSavePatientChanges = async () => {
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
  };

  if (!patient) {
    return (
      <Alert status="error" mb={5}>
        <AlertIcon />
        No patient details found
      </Alert>
    );
  }

  return (
    <Box p={5} maxW="1200px" mx="auto" mt="60px" minH="100vh" bg={bgColor}>
      <Box mb={5}>
        <Box display="flex" flexDirection="column" mb={5}>
          <Box display="flex" alignItems="center" mb={3}>
            <Heading flex="1" fontSize={headingFontSize} color={textColor}>
              {patient.first_name} {patient.last_name}
            </Heading>
            <Box display="flex" alignItems="center">
              <Button
                variant="outline"
                onClick={onEditOpen}
                aria-label="Edit Patient Details"
              >
                <Icon as={MdEdit} boxSize={6} />
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
                      {patient.email}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon as={MdPhone} boxSize={5} mr={2} color={textColor} />
                    <Text fontSize="md" color={textColor}>
                      {patient.phone}
                    </Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon as={MdCake} boxSize={5} mr={2} color={textColor} />
                    <Text fontSize="md" color={textColor}>
                      {patient.birth_date}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Grid>
          </Box>

          <Box mt={5}>
            <CellTests initialCellTests={[]} />
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Patient Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="first_name"
                value={editPatient.first_name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="last_name"
                value={editPatient.last_name || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={editPatient.email || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={editPatient.phone || ""}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Birth Date</FormLabel>
              <Input
                name="birth_date"
                value={editPatient.birth_date || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" onClick={onEditClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSavePatientChanges}>
              Save
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
