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
} from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login, formErrors } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

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
      await login(formData);
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
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <FormErrorMessage>{formErrors?.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors?.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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

            <Button type="submit" colorScheme="blue" width="100%">
              Login
            </Button>

            <Stack direction="row" justify="space-between">
              <Link color="blue.500" href="/forgot-password">
                Forgot Password?
              </Link>
              <Link color="blue.500" href="/signup">
                Don't have an account? Sign up
              </Link>
            </Stack>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Login;
