import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      maxW="600px"
      mx="auto"
      textAlign="center"
      pt="100px"
      px={{ base: "2", md: "0" }}
      color={colorMode === "dark" ? "white" : "gray.800"}
    >
      <Heading as="h1" size="2xl" mb="4">
        403 Forbidden
      </Heading>
      <Text
        fontSize="xl"
        lineHeight="tall"
        mb="8"
        color={colorMode === "dark" ? "gray.400" : "gray.600"}
      >
        You do not have permission to access this page. Please contact your
        administrator for assistance.
      </Text>
      <ChakraLink as={Link} to="/" color="blue.500" fontSize="lg">
        Go to Home
      </ChakraLink>
    </Box>
  );
};

export default ForbiddenPage;
