import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSignUpStore } from "../hooks/useSignUpStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    gender: "",
    contactNo: "",
    bloodGroup: "",
  });

  const { signUp, formErrors } = useSignUpStore();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxW="md" w="100%" p="6" borderRadius="lg" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl isInvalid={!!formErrors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <FormErrorMessage>{formErrors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <FormErrorMessage>{formErrors.fullName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.gender}>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Select Gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              <FormErrorMessage>{formErrors.gender}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.contactNo}>
              <FormLabel>Contact Number</FormLabel>
              <Input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Enter your contact number"
              />
              <FormErrorMessage>{formErrors.contactNo}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.bloodGroup}>
              <FormLabel>Blood Group</FormLabel>
              <Input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                placeholder="Enter your blood group"
              />
              <FormErrorMessage>{formErrors.bloodGroup}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="blue" mt="4" size="lg">
              Sign Up
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
