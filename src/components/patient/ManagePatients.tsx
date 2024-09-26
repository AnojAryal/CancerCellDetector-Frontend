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
import { isHospitalAdmin } from "../generic/DecodeToken";
import PatientCreate from "./PatientCreate";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useGetPatients from "../../hooks/user/useGetPatients";

export interface Address {
  id: number;
  street: string;
  city: string;
  patient: number;
}

export interface CellTest {
  id: string;
  title: string;
  description: string;
  created_at: EpochTimeStamp;
  updated_at: EpochTimeStamp;
  detection_status: string;
}

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  address?: Address;
  cell_tests?: CellTest[];
}

const ManagePatients = () => {
  const navigate = useNavigate();
  const hospital_id = isHospitalAdmin?.toString();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const {
    data: patients = [],
    isLoading,
    isError,
    error,
  } = useGetPatients(hospital_id);

  const [filterText, setFilterText] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  const filteredPatients = filterItems(patients, filterText, "first_name");
  const sortedPatients = sortItems(
    filteredPatients,
    sortOrder as "asc" | "desc",
    "first_name"
  );

  if (isLoading) return <Spinner size="md" />;
  if (isError)
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message || "An unknown error occurred"}
      </Alert>
    );

  const handlePatientClick = (patient: Patient) => {
    navigate(`/patients/${patient.id}`, { state: { patient } });
  };

  return (
    <Box p={5} maxW="1300px" mx="auto" mt="60px">
      <Heading mb={5} textAlign="center">
        Manage Patients
      </Heading>
      <Text mb={5} textAlign="center">
        Total Patients: {patients.length} | Displaying: {sortedPatients.length}
      </Text>
      <VStack spacing={5} align="stretch">
        <HStack justify="center" spacing={4}>
          <Input
            placeholder="Search Patient..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            maxW="300px"
          />
          <Select
            maxW="230px"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by First Name (A-Z)</option>
            <option value="desc">Sort by First Name (Z-A)</option>
          </Select>
          <Button onClick={onOpen} colorScheme="green">
            Create Patient
          </Button>
        </HStack>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={7}>
          {sortedPatients.map((patient: Patient) => (
            <GridItem
              key={patient.id}
              position="relative"
              onClick={() => handlePatientClick(patient)}
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
                  {patient.first_name} {patient.last_name}
                </Heading>
                <Text fontSize="md" mb={2}>
                  {patient.email}
                </Text>
                <Text fontSize="md" mb={2}>
                  {patient.phone}
                </Text>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </VStack>
      <PatientCreate isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default ManagePatients;
