import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useRef } from "react";

const DetectCancerCell = () => {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const boxBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const shadowColor = useColorModeValue("md", "dark-lg");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box p={8} pt={20} bg={boxBgColor} color={textColor} minH="100vh">
      <HStack  alignItems="center" mb={6}>
        <Heading as="h1" size="xl">
          Skin Cancer
        </Heading>
        <Icon as={BiEditAlt} boxSize={6} cursor="pointer" />
      </HStack>
      <Text mb={6} fontSize="lg">
        Seen symptoms of Skin cancer
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
        <Box>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h3" size="md" fontWeight="bold">
              Test Dataset
            </Heading>
            <Icon as={BiEditAlt} boxSize={5} cursor="pointer" />
          </HStack>
          <Box
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            boxShadow={shadowColor}
            height="200px"
          >
            <Image
              src="test-dataset-image-url"
              alt="Test Dataset"
              borderRadius="md"
              objectFit="cover"
              height="100%"
            />
          </Box>
        </Box>
        <Box>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h3" size="md" fontWeight="bold">
              Upload Image
            </Heading>
          </HStack>
          <Box
            border="2px dashed"
            borderColor={borderColor}
            p={4}
            borderRadius="md"
            textAlign="center"
            boxShadow={shadowColor}
            width="100%"
            height="100px"
            onClick={handleClick}
            cursor="pointer"
          >
            <Text mb={2} fontSize="lg">
              Drag & drop images here, or click to select files
            </Text>
            <Input
              type="file"
              multiple
              ref={fileInputRef}
              display="none"
              onChange={(e) => {
                console.log(e.target.files);
              }}
            />
          </Box>
          <VStack spacing={4} align="stretch" mt={4}>
            <Button colorScheme="green" size="md" alignSelf="center">
              Process Data
            </Button>
            <Text color="red.500" textAlign="center">
              WebSocket connection status: disconnected
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
      <Box mt={8}>
        <Heading as="h2" size="lg" mb={6}>
          Results
        </Heading>
        <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          <GridItem>
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              boxShadow={shadowColor}
              height="200px"
            >
              <Text mb={2} fontSize="md" fontWeight="bold">
                ID: 2c7ff942-9f47-4dcb-a858-4ce574e08c09
              </Text>
              <Image
                src="result-image-url"
                alt="Result Image"
                borderRadius="md"
                height="100%"
              />
            </Box>
          </GridItem>
          <GridItem>
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              boxShadow={shadowColor}
              height="200px"
            >
              <Text mb={2} fontSize="md" fontWeight="bold">
                ID: 903adf83-0500-4494-8055-2ce873d4c550
              </Text>
              <Image
                src="result-image-url"
                alt="Result Image"
                borderRadius="md"
                height="100%"
              />
            </Box>
          </GridItem>
          <GridItem>
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              boxShadow={shadowColor}
              height="200px"
            >
              <Text mb={2} fontSize="md" fontWeight="bold">
                ID: 48959aba-ef59-42cf-87a7-5fe1b0089ea1
              </Text>
              <Image
                src="result-image-url"
                alt="Result Image"
                borderRadius="md"
                height="100%"
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetectCancerCell;
