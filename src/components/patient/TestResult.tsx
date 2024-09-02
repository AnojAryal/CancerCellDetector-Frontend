import { useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import useResults from "../../hooks/user/useResults";

interface LocationState {
  title?: string;
  description?: string;
  patient_id: string;
}

const TestResult = () => {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const shadowColor = useColorModeValue("md", "dark-lg");

  const { getCellTests, cellTests, loading, error } = useResults();
  const location = useLocation();

  // Destructure state with defaults
  const {
    title = "Default Title",
    description = "Default Description",
    patient_id,
  } = location.state as LocationState;

  useEffect(() => {
    if (patient_id) {
      getCellTests(patient_id);
    }
  }, [getCellTests, patient_id]);

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box mt={8}>
      <Heading as="h2" size="lg" mb={6}>
        Results for {title} - {description}
      </Heading>
      <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {cellTests.map((test) =>
          test.results.map((result) =>
            result.result_images.map((image, index) => (
              <GridItem key={image.id}>
                <Box
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="md"
                  p={4}
                  boxShadow={shadowColor}
                  height="200px"
                >
                  <Text mb={2} fontSize="md" fontWeight="bold">
                    Result ID: {image.result_id}
                  </Text>
                  <Image
                    src={image.image}
                    alt={`Cell Image ${index + 1}`}
                    boxSize="100%"
                    objectFit="cover"
                  />
                </Box>
              </GridItem>
            ))
          )
        )}
      </Grid>
    </Box>
  );
};

export default TestResult;
