import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Image,
  Flex,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDropzone, Accept } from "react-dropzone";
import useFileUpload from "../../hooks/user/useFileUpload";

const DetectCancerCell = () => {
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const boxBgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const shadowColor = useColorModeValue("md", "dark-lg");

  const location = useLocation();
  const {
    title = "Default Title",
    description = "Default Description",
    patient_id,
    cell_test_id,
  } = location.state || {};

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { uploadFiles, uploadStatus } = useFileUpload();

  const handleClear = () => {
    setSelectedFiles([]);
    setError(null);
  };

  const handleUpload = () => {
    if (!patient_id || !cell_test_id) {
      setError("Missing patient or cell test ID");
      return;
    }

    if (selectedFiles.length === 0) {
      setError("No files selected");
      return;
    }

    uploadFiles(patient_id, cell_test_id, selectedFiles)
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError("Upload failed");
        console.error("Upload error:", err);
      });
  };

   const acceptTypes: Accept = {
    'image/*': []
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => setSelectedFiles(files),
    accept: acceptTypes,
  });

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
              cursor="pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Text mb={2} fontSize="lg">
                Drag & drop images here, or click to select files
              </Text>
              {selectedFiles.length > 0 && (
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
              )}
            </Box>
            {selectedFiles.length > 0 && (
              <Flex justifyContent="center" mt={4}>
                <HStack spacing={4}>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={handleUpload}
                    isDisabled={uploadStatus === "uploading"}
                  >
                    {uploadStatus === "uploading" ? (
                      <Spinner size="sm" />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={handleClear}>
                    Clear
                  </Button>
                </HStack>
              </Flex>
            )}
            {error && (
              <Box mt={4} p={4} bg="red.100" color="red.800" borderRadius="md">
                <Text fontSize="sm">{error}</Text>
              </Box>
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
