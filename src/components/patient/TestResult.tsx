import { useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import useResults, { Result } from "../../hooks/user/useResults";
import { FaImage } from "react-icons/fa";

interface LocationState {
  patient_id: string;
  cell_test_id: string;
}

const TestResult = () => {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const shadowColor = useColorModeValue("md", "dark-lg");

  const { getCellTests, cellTests, loading, error } = useResults();
  const location = useLocation();
  const navigate = useNavigate();

  const { patient_id, cell_test_id } = (location.state as LocationState) || {};

  useEffect(() => {
    if (patient_id) {
      getCellTests(patient_id);
    }
  }, [getCellTests, patient_id]);

  if (loading) return <Spinner size="sm" />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!cellTests.length) return <Text>No test results available.</Text>;

  const filteredResults = cellTests.flatMap((test) =>
    test.results.filter((result) => result.celltest_id === cell_test_id)
  );

  const handleResultClick = (result: Result) => {
    navigate(`/patients/${patient_id}/cell_tests/${cell_test_id}/results`, {
      state: result,
    });
  };

  const renderResultImages = (images: { id: string; image: string }[]) => {
    if (images.length === 0) {
      return (
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <FaImage size="50px" color="gray" />
          <Text>No images available</Text>
        </Flex>
      );
    }

    return images.map((image) => (
      <Box
        key={image.id}
        width="100%"
        height="200px"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={image.image}
          alt="Result Image"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </Box>
    ));
  };

  return (
    <Box mt={8}>
      <Heading as="h4" size="md" mb={6}>
        Results for Cell Test ID: {cell_test_id}
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredResults.map((result) => (
          <Box
            key={result.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow={shadowColor}
            cursor="pointer"
            onClick={() => handleResultClick(result)}
            borderColor={borderColor}
            p={4}
          >
            <Text mb={2}>
              <strong>ID:</strong> {result.id}
            </Text>
            <Flex justifyContent="center">
              {renderResultImages(result.result_images)}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TestResult;
