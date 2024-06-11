import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  IconButton,
  InputGroup,
  InputRightElement,
  Box,
} from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, formErrors } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData, navigate);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Heading as="h1" size="lg" mb="4" textAlign="center">
          Welcome Back!
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <FormControl isInvalid={!!formErrors?.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
              />
              <FormErrorMessage>{formErrors?.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors?.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={formData.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    aria-label={
                      formData.showPassword ? "Hide password" : "Show password"
                    }
                    h="1.75rem"
                    size="sm"
                    onClick={togglePasswordVisibility}
                    icon={formData.showPassword ? <FaEye /> : <FaEyeSlash />}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formErrors?.password}</FormErrorMessage>
            </FormControl>
            <Box />
            <Button type="submit" colorScheme="blue" width="100%">
              Login
            </Button>

            <Box display="flex" justifyContent="flex-end">
              <Link
                color="blue.500"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </Link>
            </Box>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Login;
