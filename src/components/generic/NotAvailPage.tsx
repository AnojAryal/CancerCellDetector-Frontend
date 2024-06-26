import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const NotAvailPage = () => {
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
      <Icon as={FaExclamationCircle} boxSize="64px" color="red.500" mx="auto" />
      <Heading size="lg" mb="4">
        This Page Isn't Available
      </Heading>
      <Text
        fontSize="xl"
        lineHeight="tall"
        mb="8"
        color={colorMode === "dark" ? "gray.400" : "gray.600"}
      >
        The link may be broken, or the page may have been removed. Check to see
        if the link you're trying to open is correct.
      </Text>
      <ChakraLink as={Link} to="/" color="blue.500" fontSize="lg">
        Go to Home
      </ChakraLink>
    </Box>
  );
};

export default NotAvailPage;
