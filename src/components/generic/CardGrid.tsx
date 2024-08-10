import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  useColorModeValue,
  Button,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import CellTestCard from "../patient/CellTestCard";

interface CardGridProps {
  onAddCellTest: () => void;
}

function CardGrid({ onAddCellTest }: CardGridProps) {
  const location = useLocation();

  const patient_id =
    (location.state as { patient?: { id: string } })?.patient?.id || "";

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
        <CellTestCard patient_id={patient_id} />
      </CardBody>
    </Card>
  );
}

export default CardGrid;
