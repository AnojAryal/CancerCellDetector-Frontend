import {
  IconButton,
  VStack,
  useColorModeValue,
  HStack,
  Text,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import ColorModeSwitch from "../generic/ColorModeSwitch";
import { useState } from "react";
import UserChangePassword from "./UserChangePassword";

interface UserSettingProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSetting = ({ isOpen, onClose }: UserSettingProps) => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleOpenChangePassword = () => setIsChangePasswordOpen(true);
  const handleCloseChangePassword = () => setIsChangePasswordOpen(false);

  const iconSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent borderRadius="lg" maxWidth="600px">
          <ModalHeader
            fontSize="xl"
            fontWeight="semibold"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
            borderBottomWidth={1}
            borderColor={useColorModeValue("gray.200", "gray.600")}
          >
            <Text>Settings</Text>
            <IconButton
              aria-label="Close"
              icon={<AiOutlineClose />}
              onClick={onClose}
              variant="outline"
              colorScheme="teal"
              borderRadius="full"
              size={iconSize}
              p={2}
              alignSelf="center"
            />
          </ModalHeader>
          <ModalBody p={4}>
            <VStack spacing={4} align="stretch">
              <HStack justifyContent="space-between" align="center">
                <Text fontSize="lg" fontWeight="medium">
                  Theme
                </Text>
                <ColorModeSwitch />
              </HStack>
              <Divider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
              <HStack justifyContent="space-between" align="center">
                <Text fontSize="lg" fontWeight="medium">
                  Change Password
                </Text>
                <IconButton
                  icon={<AiOutlineRight />}
                  onClick={handleOpenChangePassword}
                  aria-label="Change Password"
                  variant="outline"
                  colorScheme="teal"
                  borderRadius="full"
                  size={iconSize}
                  p={2}
                  alignSelf="center"
                />
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <UserChangePassword
        isOpen={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
      />
    </>
  );
};

export default UserSetting;
