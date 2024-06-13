import {
  Box,
  Heading,
  IconButton,
  VStack,
  useColorModeValue,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ColorModeSwitch from "../generic/ColorModeSwitch";

const UserSetting = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.8)"
      zIndex="1000"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={bgColor}
        color={textColor}
        borderRadius="md"
        boxShadow="lg"
        width="100%"
        maxWidth="400px"
        height="70%"
        maxHeight="600px"
        overflowY="auto"
        p={6}
        position="relative"
      >
        <HStack justifyContent="space-between" mb={4}>
          <Heading as="h3" size="md" mb={2}>
            Settings
          </Heading>
          <IconButton
            icon={<AiOutlineClose />}
            onClick={() => navigate("/home")}
            aria-label="Close"
          />
        </HStack>
        <Box
          borderBottom="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          mb={4}
          pb={2}
          width="100%"
        />
        <VStack spacing={4} align="stretch">
          <HStack justifyContent="space-between">
            <Text>Theme</Text>
            <ColorModeSwitch />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default UserSetting;
