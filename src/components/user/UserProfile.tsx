import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Avatar,
  VStack,
  HStack,
  Button,
  Input,
  IconButton,
  Card,
  CardBody,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import useUserProfile, {
  UserProfile as UserProfileType,
} from "../../hooks/user/useUserProfile";

const UserProfile = () => {
  const { profileData, error, isLoading } = useUserProfile();
  const [isEditingDetails, setIsEditingDetails] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<
    string | ArrayBuffer | null
  >(null);
  const [formData, setFormData] = useState<UserProfileType | null>(null);

  useEffect(() => {
    console.log("Profile Data from Hook:", profileData);
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleEditDetailsClick = () => setIsEditingDetails(!isEditingDetails);

  const handleEditPictureClick = () => {
    document.getElementById("profile-picture-input")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!formData) {
    return <Text>No profile data found</Text>;
  }

  return (
    <Flex justify="center" mt="8">
      <Card width="100%" maxW="600px" boxShadow="lg" borderRadius="lg">
        <CardBody>
          <Flex direction="column" align="center" p="4">
            <Flex align="center" mb="6">
              <Avatar
                size="2xl"
                name={formData.full_name}
                src={profilePicture as string}
                mr="4"
              />
              <IconButton
                aria-label="Edit profile picture"
                icon={<FiEdit />}
                onClick={handleEditPictureClick}
                ml="4"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                display="none"
                id="profile-picture-input"
              />
            </Flex>
            <VStack spacing="4" align="stretch" width="100%">
              <HStack justify="space-between" width="100%">
                <Text fontWeight="bold" minW="100px">
                  USERNAME:
                </Text>
                {isEditingDetails ? (
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    width="250px"
                  />
                ) : (
                  <Text>{formData.username}</Text>
                )}
              </HStack>
              {!isEditingDetails && (
                <HStack justify="space-between" width="100%">
                  <Text fontWeight="bold" minW="100px">
                    EMAIL:
                  </Text>
                  <Text>{formData.email}</Text>
                </HStack>
              )}
              {Object.entries(formData).map(([key, value]) => {
                if (key === "username" || key === "email") return null;
                return (
                  <HStack justify="space-between" key={key} width="100%">
                    <Text fontWeight="bold" minW="100px">
                      {key.replace(/_/g, " ").toUpperCase()}:
                    </Text>
                    {isEditingDetails ? (
                      <Input
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        width="250px"
                      />
                    ) : (
                      <Text>{value}</Text>
                    )}
                  </HStack>
                );
              })}
            </VStack>
            <Button mt="6" colorScheme="green" onClick={handleEditDetailsClick}>
              {isEditingDetails ? "Save Changes" : "Edit Profile"}
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default UserProfile;
