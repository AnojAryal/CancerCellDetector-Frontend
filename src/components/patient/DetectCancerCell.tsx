import {
  Box,
  Button,
  Heading,
  Text,
  HStack,
  Image,
  Flex,
  Spinner,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDropzone, Accept } from "react-dropzone";
import useHandleFiles from "../../hooks/user/useHandleFile";
import TestResult from "./TestResult";

interface LocationState {
  title?: string;
  description?: string;
  patient_id?: string;
  cell_test_id?: string;
}

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
  } = location.state as LocationState;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { handleFiles, uploadStatus, fetchFiles, filesData } = useHandleFiles(
    patient_id ?? "",
    cell_test_id ?? ""
  );

  useEffect(() => {
    if (patient_id && cell_test_id) {
      fetchFiles();
    }
  }, [fetchFiles, patient_id, cell_test_id]);

  const handleClear = () => {
    setSelectedFiles([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("No files selected");
      return;
    }

    try {
      await handleFiles(selectedFiles);
      setError(null);
    } catch (err) {
      setError("Upload failed");
      console.error("Upload error:", err);
    }
  };

  const acceptTypes: Accept = {
    "image/*": [],
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
              {filesData.length > 0 ? (
                <Grid
                  templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
                  gap={6}
                >
                  {filesData.map((file, index) => (
                    <GridItem key={index}>
                      <Box
                        border="1px solid"
                        borderColor={borderColor}
                        borderRadius="md"
                        p={4}
                        boxShadow={shadowColor}
                        height="200px"
                      >
                        <Image
                          src={file.image}
                          alt={`Cell Image ${index + 1}`}
                          boxSize="100%"
                          objectFit="cover"
                        />
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              ) : (
                <Text fontSize="lg">No images available</Text>
              )}
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
                <HStack spacing={2} mt={2} wrap="wrap">
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
        <TestResult />
      </Flex>
    </Box>
  );
};

export default DetectCancerCell;
