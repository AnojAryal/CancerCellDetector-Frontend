import {
  Container,
  Heading,
  Text,
  Image,
  Grid,
  GridItem,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { ResultImage, Result } from "../../hooks/user/useResults";

const ResultDetail = () => {
  const location = useLocation();
  const result = location.state as Result;

  const containerBg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const tealColor = useColorModeValue("teal.500", "teal.200");

  if (!result) {
    return <Text>No result data available.</Text>;
  }

  return (
    <Container maxW="container.xl" py={8} bg={containerBg}>
      <Heading as="h2" size="xl" mb={8} textAlign="center" color={textColor}>
        Result Details
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6} mb={8}>
        <GridItem>
          <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
            Cell Test ID:
          </Text>
          <Text mb={4} color={textColor}>
            {result.celltest_id}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
            Description:
          </Text>
          <Text mb={4} color={textColor}>
            {result.description}
          </Text>
          <Flex justifyContent="flex-end" alignItems="center">
            <Text color={tealColor}>Processed At :</Text>
            <Text color={tealColor}>
              {new Date(result.created_at).toLocaleString()}
            </Text>
          </Flex>
        </GridItem>
      </Grid>

      <Heading as="h3" size="lg" mb={6} textAlign="center" color={textColor}>
        Result Images
      </Heading>
      <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        {result.result_images.map((image: ResultImage, index: number) => (
          <Image
            key={image.id}
            src={image.image}
            alt={`Result Image ${index + 1}`}
            objectFit="cover"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            width="100%"
            height="auto"
            boxShadow="md"
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ResultDetail;
