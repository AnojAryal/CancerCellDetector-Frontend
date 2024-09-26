import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Input,
  Spinner,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
  useColorModeValue, // Import the useColorModeValue hook
} from "@chakra-ui/react";
import useGetProfile, {
  UserProfile as UserProfileType,
} from "../../hooks/user/useGetProfile";
import useUpdateUserProfile from "../../hooks/user/useUpdateProfile";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const { data: profileData, error: fetchError, isLoading } = useGetProfile();
  const {
    updateProfile,
    isLoading: isUpdating,
    error: updateError,
    success: updateSuccess,
  } = useUpdateUserProfile();

  const [isEditingDetails, setIsEditingDetails] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserProfileType | null>(null);
  const toast = useToast();

  const textColor = useColorModeValue("gray.800", "white");
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("teal.400", "teal.600");
  const focusBorderColor = useColorModeValue("teal.600", "teal.300");

  useEffect(() => {
    if (profileData) {
      setFormData(profileData as UserProfileType);
    }
  }, [profileData]);

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: "Profile Updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [updateSuccess, toast]);

  const handleEditDetailsClick = () => {
    if (isEditingDetails && formData) {
      updateProfile(formData);
    }
    setIsEditingDetails(!isEditingDetails);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (fetchError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {(fetchError as Error).message || "An error occurred"}
      </Alert>
    );
  }

  if (!formData) {
    return <Text>No profile data found</Text>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Profile</ModalHeader>
        <ModalBody>
          <Flex direction="column" align="center" py="6">
            <VStack spacing="4" align="stretch" width="100%">
              <HStack justify="space-between" width="100%">
                <HStack>
                  <Text fontWeight="bold" fontSize="lg" color={labelColor}>
                    Username:
                  </Text>
                </HStack>
                {isEditingDetails ? (
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    width="250px"
                    borderColor={borderColor}
                    focusBorderColor={focusBorderColor}
                  />
                ) : (
                  <Text fontSize="lg" color={textColor}>
                    {formData.username}
                  </Text>
                )}
              </HStack>
              {/* Only display email when not editing */}
              {!isEditingDetails && (
                <HStack justify="space-between" width="100%">
                  <Text fontWeight="bold" fontSize="lg" color={labelColor}>
                    Email:
                  </Text>
                  <Text fontSize="lg" color={textColor}>
                    {formData.email}
                  </Text>
                </HStack>
              )}
              {Object.entries(formData).map(([key, value]) => {
                // Skip rendering username and email fields
                if (key === "username" || key === "email") return null;
                return (
                  <HStack justify="space-between" key={key} width="100%">
                    <Text fontWeight="bold" fontSize="lg" color={labelColor}>
                      {key.replace(/_/g, " ").toUpperCase()}:
                    </Text>
                    {isEditingDetails ? (
                      <Input
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        width="250px"
                        borderColor={borderColor}
                        focusBorderColor={focusBorderColor}
                      />
                    ) : (
                      <Text fontSize="lg" color={textColor}>
                        {value}
                      </Text>
                    )}
                  </HStack>
                );
              })}
            </VStack>
          </Flex>
          {updateError && (
            <Alert status="error" mt="4">
              <AlertIcon />
              {updateError || "An error occurred"}
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            onClick={handleEditDetailsClick}
            isLoading={isUpdating}
            size="md"
            borderRadius="md"
            px="4"
          >
            {isEditingDetails ? "Save Changes" : "Edit Profile"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
