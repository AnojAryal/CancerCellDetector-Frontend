import {
  Box,
  Heading,
  IconButton,
  VStack,
  useColorModeValue,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdClose, MdBusiness, MdGroup } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BoxGrid from "../generic/BoxGrid";

const Admin = () => {
  const navigate = useNavigate();
  const totalHospitalCount = 10;
  const totalAdminCount = 5;

  const handleCreateHospital = () => {
    console.log("create hospital clicked");
   
  };

  const handleCreateUser = () => {
    console.log("create user clicked");
    navigate("/create-user");
  };

  const handleNavigateHome = () => {
    navigate("/home");
  };

  return (
   <BoxGrid>
        <HStack justifyContent="space-between" mb={4}>
          <Heading as="h3" size="md" mb={2}>
            Admin
          </Heading>
          <IconButton
            icon={<MdClose />}
            onClick={handleNavigateHome}
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
            <Text>Create Hospital</Text>
            <IconButton
              icon={<MdBusiness />}
              onClick={handleCreateHospital}
              aria-label="Create Hospital"
            />
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Create User</Text>
            <IconButton
              icon={<MdGroup />}
              onClick={handleCreateUser}
              aria-label="Create User"
            />
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Total Hospitals</Text>
            <Text fontWeight="bold" color="blue.500">
              {totalHospitalCount}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Total Admins</Text>
            <Text fontWeight="bold" color="blue.500">
              {totalAdminCount}
            </Text>
          </HStack>
        </VStack>
    </BoxGrid >
  );
};

export default Admin;
