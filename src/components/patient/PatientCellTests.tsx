import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";

interface CellTestProps {
  initialCellTests?: string[]; // Make this optional
}

function PatientCellTests({ initialCellTests = [] }: CellTestProps) {
  const [cellTests, setCellTests] = useState<string[]>(initialCellTests);

  const addCellTest = () => {
    setCellTests((prevTests) => [...prevTests, `Cell Test ${prevTests.length + 1}`]);
  };

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      p={5}
      mt={5}
      borderWidth="1px"
      borderRadius="md"
      bg={bgColor}
      minH="400px"
      display="flex"
      flexDirection="column"
      borderColor={borderColor}
    >
      <Box
        position="sticky"
        top="0"
        bg={bgColor}
        p={4}
        borderBottomWidth="1px"
        borderBottomColor={borderColor}
        zIndex="docked"
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading size="md" color={textColor}>
          Cell Tests
        </Heading>
        <Button
          colorScheme="green"
          leftIcon={<Icon as={MdAddCircle} />}
          onClick={addCellTest}
        >
          New
        </Button>
      </Box>
      <VStack spacing={4} align="stretch" p={4} overflowY="auto">
        {cellTests.length > 0 ? (
          cellTests.map((test, index) => (
            <Box
              key={index} // Consider using unique identifiers if available
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg={bgColor}
              minH="150px"
              borderColor={borderColor}
            >
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                {test}
              </Text>
            </Box>
          ))
        ) : (
          <Text color="gray.500">No cell tests added yet.</Text>
        )}
      </VStack>
    </Box>
  );
}

export default PatientCellTests;
