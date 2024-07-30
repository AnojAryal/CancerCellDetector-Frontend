import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";

interface BoxGridProps {
  cellTests: { title: string; description: string }[];
  onAddCellTest: () => void;
}

function CardGrid({ cellTests, onAddCellTest }: BoxGridProps) {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.400", "gray.600");
  const textColor = useColorModeValue("black", "white");
  const padding = 5;

  return (
    <Card
      p={padding}
      mt={5}
      borderWidth="2px"
      borderRadius="md"
      bg={bgColor}
      minH="400px"
      borderColor={borderColor}
    >
      <CardHeader>
        <Stack spacing={4}>
          <Flex align="center">
            <Heading size="md" color={textColor}>
              Cell Tests
            </Heading>
            <Spacer />
            <Button colorScheme="green" onClick={onAddCellTest}>
              Add
            </Button>
          </Flex>
          <Divider />
        </Stack>
      </CardHeader>
      <CardBody p={padding}>
        <Stack spacing={4} align="stretch" overflowY="auto">
          {cellTests.length > 0 ? (
            cellTests.map((test, index) => (
              <Card
                key={index}
                p={padding}
                borderWidth="1px"
                borderRadius="md"
                bg={bgColor}
                borderColor={borderColor}
              >
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>
                    {test.title}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text color={textColor}>{test.description}</Text>
                </CardBody>
              </Card>
            ))
          ) : (
            <Text color="gray.500">No cell tests added yet.</Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default CardGrid;
