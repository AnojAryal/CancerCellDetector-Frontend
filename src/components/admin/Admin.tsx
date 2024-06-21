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
import { MdClose, MdBusiness, MdGroup, MdManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BoxGrid from "../generic/BoxGrid";
import { FaStethoscope } from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();
  const totalHospitalCount = 10;
  const totalAdminCount = 5;

  const handleCreateHospital = () => {
    console.log("create hospital clicked");
    navigate("/create-hospital")
  };

  const handleManageHospital = () => {
    console.log("Manage hospital clicked");
    navigate("/manage-hospital");
    
  }

  const handleManageUsers = () => {
    console.log("Manage users clicked");
    
  }

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
          <Divider/>
          <HStack justifyContent="space-between">
            <Text>Manage Hospital</Text>
            <IconButton
              icon={<FaStethoscope/>}
              onClick={handleManageHospital}
              aria-label="Manage Hospital"
            />
          </HStack>
          <Divider/>
          <HStack justifyContent="space-between">
            <Text>Create User</Text>
            <IconButton
              icon={<MdGroup />}
              onClick={handleCreateUser}
              aria-label="Create User"
            />
          </HStack>
          <Divider/>
          <HStack justifyContent="space-between">
            <Text>Manage Users</Text>
            <IconButton
              icon={<MdManageAccounts />}
              onClick={handleManageUsers}
              aria-label="Manage Users"
            />
          </HStack>
          <Divider/>
          <HStack justifyContent="space-between">
            <Text>Total Hospitals</Text>
            <Text fontWeight="bold" color="blue.500">
              {totalHospitalCount}
            </Text>
          </HStack>
          <Divider/>
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
