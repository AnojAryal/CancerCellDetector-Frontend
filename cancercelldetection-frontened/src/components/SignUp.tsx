import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Grid,
  GridItem,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { signUpStore } from "../store/signUpStore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    address: "",
    bloodGroup: "",
    gender: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { signUp, formErrors } = signUpStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          padding: "6px",
          borderRadius: "lg",
          boxShadow: "md",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem colSpan={{ base: "auto", md: 1 }}>
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

                <FormControl isInvalid={!!formErrors.address}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                  <FormErrorMessage>{formErrors.address}</FormErrorMessage>
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
              </Stack>
            </GridItem>
            <GridItem colSpan={{ base: "auto", md: 1 }}>
              <Stack spacing="4">
                <FormControl isInvalid={!!formErrors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder=""
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

                <FormControl isInvalid={!!formErrors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        aria-label={
                          showPassword ? "Show password" : "Hide password"
                        }
                        h="1.75rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                        icon={showPassword ? <FaEye /> : <FaEyeSlash />}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formErrors.confirmPassword}>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        aria-label={
                          showPassword ? "show password" : "Hide password"
                        }
                        h="1.75rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                        icon={showPassword ? <FaEye /> : <FaEyeSlash />}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {formErrors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>

                <Flex justify="center">
                  <Button type="submit" colorScheme="blue" size="lg">
                    Sign Up
                  </Button>
                </Flex>
              </Stack>
            </GridItem>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
