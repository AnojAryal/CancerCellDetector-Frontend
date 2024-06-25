import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  useColorMode,
  Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const ProtectedPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      maxW="600px"
      mx="auto"
      textAlign="center"
      pt="100px"
      px={{ base: '2', md: '0' }}
      color={colorMode === 'dark' ? 'white' : 'gray.800'}
    >
      <Icon as={FaLock} boxSize="64px" color="red.500" mx="auto" />
      <Heading size="lg" mb="4">
        This content isn't available right now
      </Heading>
      <Text
        fontSize="xl"
        lineHeight="tall"
        mb="8"
        color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
      >
        When this happens, it's usually because the owner only shared it with a
        small group of people, changed who can see it or it's been deleted.
      </Text>
      <ChakraLink as={Link} to="/" color="blue.500" fontSize="lg">
        Go to Home
      </ChakraLink>
    </Box>
  );
};

export default ProtectedPage;
