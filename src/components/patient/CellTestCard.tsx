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
import { CellTest } from "./ManagePatients";
import useManagePatients from "../../hooks/user/useManagePatients";

interface CellTestsCardProps {
  patient_id: string;
}

const CellTestsCard = ({ patient_id }: CellTestsCardProps) => {
  const [cellTests, setCellTests] = useState<CellTest[]>([]);

  const navigate = useNavigate();
  const cardBgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBgColor = useColorModeValue("gray.100", "gray.600");

  const { useFetchPatientById } = useManagePatients();
  const { data: patient, isError, isLoading } = useFetchPatientById(patient_id);

  useEffect(() => {
    if (patient) {
      const fetchedCellTests: CellTest[] = Array.isArray(patient.cell_tests)
        ? patient.cell_tests
        : [];
      setCellTests(fetchedCellTests);
    }
  }, [patient]);

  const handleCardClick = (
    cell_test_id: string,
    title: string,
    description: string
  ) => {
    navigate(`/patients/${patient_id}/cell_tests/${cell_test_id}`, {
      state: { title, description, patient_id, cell_test_id },
    });
  };

  if (isLoading) {
    return <Spinner size="md" />;
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {isError}
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
