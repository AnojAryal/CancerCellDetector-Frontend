import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
  HStack,
  Image,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const DetectCancerCell = () => {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const boxBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const shadowColor = useColorModeValue("md", "dark-lg");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const { title = "Default Title", description = "Default Description" } =
    location.state || {};

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFiles = (files: FileList | null) => {
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClear = () => {
    setSelectedFiles([]);
  };

  return (
    <Box p={8} pt={20} bg={boxBgColor} color={textColor} minH="100vh">
      <Flex direction="column" height="100%">
        <Box mb={6}>
          <HStack alignItems="center" mb={6}>
            <Heading as="h1" size="lg">
              {title}
            </Heading>
          </HStack>
          <Text mb={8} fontSize="md">
            {description}
          </Text>
        </Box>

        <Flex direction={{ base: "column", md: "row" }} gap={8} flex="1" mb={6}>
          <Box flex="1" minWidth="0" height="200px">
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Heading as="h3" size="md" fontWeight="bold">
                Test Dataset
              </Heading>
            </HStack>
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              boxShadow={shadowColor}
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="lg">Dataset Overview</Text>
            </Box>
          </Box>
          <Box flex="1" minWidth="0" height="200px">
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
              boxShadow={shadowColor}
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
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
                onChange={(e) => handleFiles(e.target.files)}
              />
              {selectedFiles.length > 0 && (
                <>
                  <HStack spacing={2} mt={2} wrap="wrap" mb={4}>
                    {selectedFiles.map((file, index) => (
                      <Box
                        key={index}
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="md"
                        p={2}
                        boxShadow={shadowColor}
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${file.name}`}
                          boxSize="100px"
                          objectFit="cover"
                        />
                      </Box>
                    ))}
                  </HStack>
                </>
              )}
            </Box>
            {selectedFiles.length > 0 && (
              <Flex justifyContent="center" mt={4}>
                <HStack spacing={4}>
                  <Button colorScheme="green" size="sm">
                    Upload
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={handleClear}>
                    Clear
                  </Button>
                </HStack>
              </Flex>
            )}
          </Box>
          
        </Flex>
        <Flex mt={4}>
          <HStack spacing={4}>
            <Button colorScheme="green" mt={4} size="md">
              Process Data
            </Button>
          </HStack>
        </Flex>

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
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default DetectCancerCell;
