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
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDropzone, Accept } from "react-dropzone";
import useHandleFiles from "../../hooks/user/useHandleFile";
import TestResult from "./TestResult";
import useProcessData from "../../hooks/user/useProcessData";
import { FaEdit, FaTrash } from "react-icons/fa";

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
  console.log(error);
  const [editMode, setEditMode] = useState(false);
  const [filesModified, setFilesModified] = useState(false);
  console.log(filesModified);

  const {
    handleFiles,
    uploadStatus,
    fetchFiles,
    filesData,
    setFilesData,
    deleteFileFromServer,
  } = useHandleFiles(patient_id ?? "", cell_test_id ?? "");
  const {
    processData,
    loading: processingLoading,
    error: processingError,
  } = useProcessData(cell_test_id ?? "");

  useEffect(() => {
    if (patient_id && cell_test_id) {
      fetchFiles();
    }
  }, [fetchFiles, patient_id, cell_test_id]);

  const handleClear = () => {
    setSelectedFiles([]);
    setError(null);
    setFilesModified(false);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("No files selected");
      return;
    }

    try {
      await handleFiles(selectedFiles);
      setSelectedFiles([]);
      setError(null);
      setFilesModified(false);
    } catch (err) {
      setError("Upload failed");
      console.error("Upload error:", err);
    }
  };

  const handleProcessData = async () => {
    if (!cell_test_id) {
      setError("Cell Test ID is missing.");
      return;
    }

    await processData();
  };

  const acceptTypes: Accept = {
    "image/*": [],
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => setSelectedFiles(files),
    accept: acceptTypes,
  });

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

 
  const handleDelete = async (fileIndex: number) => {
    const updatedFilesData = [...filesData];
    const deletedFile = updatedFilesData.splice(fileIndex, 1)[0];
    setFilesModified(true);

    setFilesData(updatedFilesData);

    try {
      if (deletedFile) {
        await deleteFileFromServer(deletedFile.id);
      }
    } catch (err) {
      setError("Failed to delete file");
      console.error("Delete file error:", err);
    }
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
              <IconButton
                icon={<FaEdit />}
                aria-label="Edit"
                size="sm"
                onClick={toggleEditMode}
              />
            </HStack>
            <Box
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              p={4}
              boxShadow={shadowColor}
              height="100%"
              overflow="hidden"
            >
              <Flex
                overflowX="auto"
                overflowY="hidden"
                whiteSpace="nowrap"
                alignItems="flex-start"
                height="100%"
              >
                {filesData.length > 0 ? (
                  filesData.map((file, index) => (
                    <Box
                      key={index}
                      border="1px solid"
                      borderColor={borderColor}
                      borderRadius="md"
                      boxShadow={shadowColor}
                      height="100%"
                      width="200px"
                      display="inline-block"
                      mr={4}
                      position="relative"
                    >
                      {editMode && (
                        <IconButton
                          icon={<FaTrash />}
                          aria-label="Delete"
                          size="sm"
                          colorScheme="red"
                          position="absolute"
                          top="5px"
                          right="5px"
                          onClick={() => handleDelete(index)} 
                        />
                      )}
                      <a
                        href={file.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={file.image}
                          alt={`Cell Image ${index + 1}`}
                          maxHeight="200px"
                          width="100%"
                          objectFit="cover"
                        />
                      </a>
                    </Box>
                  ))
                ) : (
                  <Text fontSize="lg">No images available</Text>
                )}
              </Flex>
            </Box>
          </Box>

          {/* File Upload Section */}
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
          </Box>
        </Flex>

        <Flex direction="column" mt={4}>
          <HStack spacing={4} mb={4} mt={4}>
            <Button
              colorScheme="green"
              size="md"
              onClick={handleProcessData}
              isDisabled={processingLoading}
            >
              {processingLoading ? <Spinner size="sm" /> : "Process Data"}
            </Button>
          </HStack>
          {processingError && (
            <Box mt={4} p={4} bg="red.100" color="red.800" borderRadius="md">
              <Text fontSize="sm">{processingError}</Text>
            </Box>
          )}
          <TestResult />
        </Flex>
      </Flex>
    </Box>
  );
};

export default DetectCancerCell;
