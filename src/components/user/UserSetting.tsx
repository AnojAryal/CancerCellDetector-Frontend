import {
  Box,
  Heading,
  IconButton,
  VStack,
  useColorModeValue,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ColorModeSwitch from "../generic/ColorModeSwitch";
import BoxGrid from "../generic/BoxGrid";

const UserSetting = () => {
  const navigate = useNavigate();

  return (
    <BoxGrid>
      <HStack justifyContent="space-between" mb={4}>
        <Heading as="h3" size="md" mb={2}>
          Settings
        </Heading>
        <IconButton
          icon={<AiOutlineClose />}
          onClick={() => navigate(-1)}
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
      <Divider my={4} />
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Text>Change Password</Text>
          <IconButton
            icon={<AiOutlineRight />}
            onClick={() => navigate('/change-password')}
            aria-label="Change Password"
          />
        </HStack>
      </VStack>
      <Divider my={4} />
    </BoxGrid>
  );
};

export default UserSetting;
