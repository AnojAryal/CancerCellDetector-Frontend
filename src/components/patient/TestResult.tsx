import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const TestResult = () => {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const shadowColor = useColorModeValue("md", "dark-lg");

  const results = [
    "2c7ff942-9f47-4dcb-a858-4ce574e08c09",
    "903adf83-0500-4494-8055-2ce873d4c550",
    "48959aba-ef59-42cf-87a7-5fe1b0089ea1",
  ];

  return (
    <Box mt={8}>
      <Heading as="h2" size="lg" mb={6}>
        Results
      </Heading>
      <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {results.map((result, index) => (
          <GridItem key={index}>
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              boxShadow={shadowColor}
              height="200px"
            >
              <Text mb={2} fontSize="md" fontWeight="bold">
                ID: {result}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default TestResult;
