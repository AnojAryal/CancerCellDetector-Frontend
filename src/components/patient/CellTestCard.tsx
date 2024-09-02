import { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
  useColorModeValue,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CellTest, Patient } from "./ManagePatients";
import useManagePatients from "../../hooks/user/useManagePatients";

interface CellTestsCardProps {
  patient_id: string;
}

const CellTestsCard = ({ patient_id }: CellTestsCardProps) => {
  const [cellTests, setCellTests] = useState<CellTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBgColor = useColorModeValue("gray.100", "gray.600");

  const { fetchPatientById } = useManagePatients();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patient: Patient = await fetchPatientById(patient_id);

        const fetchedCellTests: CellTest[] = Array.isArray(patient.cell_tests)
          ? patient.cell_tests
          : [];

        setCellTests(fetchedCellTests);
      } catch {
        setError("Failed to fetch cell tests.");
      } finally {
        setLoading(false);
      }
    };
    +fetchData();
  }, [patient_id, fetchPatientById]);

  const handleCardClick = (
    cell_test_id: string,
    title: string,
    description: string
  ) => {
    navigate(`/patients/${patient_id}/cell_tests/${cell_test_id}`, {
      state: { title, description, patient_id, cell_test_id },
    });
  };

  if (loading) {
    return <Spinner size="md" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Grid templateColumns="1fr" gap={6}>
        {cellTests.map((test) => (
          <Box
            key={test.id}
            p={4}
            borderWidth="2px"
            borderRadius="md"
            bg={cardBgColor}
            borderColor={borderColor}
            width="full"
            boxShadow="md"
            transition="all 0.2s"
            position="relative"
            _hover={{ bg: hoverBgColor, cursor: "pointer", boxShadow: "lg" }}
            onClick={() =>
              handleCardClick(test.id, test.title, test.description)
            }
          >
            <VStack align="start" spacing={2} mb={5}>
              <Text fontWeight="bold" color={textColor}>
                Title: {test.title}
              </Text>
              <Text color={textColor}>Description: {test.description}</Text>
              <Text color={textColor}>Status: {test.detection_status}</Text>
              <Box mt={5} />
              <Flex
                direction="column"
                align="flex-end"
                position="absolute"
                bottom={4}
                right={4}
              >
                <Text color="teal">
                  Created At: {new Date(test.created_at).toLocaleString()}
                </Text>
              </Flex>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default CellTestsCard;
