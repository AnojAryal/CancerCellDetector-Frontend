import { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useLogin } from "../../hooks/useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, formErrors, authError } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const bgColor = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue(
    "0 4px 8px rgba(0, 0, 0, 0.1)",
    "0 4px 8px rgba(0, 0, 0, 0.9)"
  );

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useColorModeValue("gray.50", "gray.900"),
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "450px",
          width: "100%",
          padding: "30px",
          borderRadius: "12px",
          boxShadow,
          backgroundColor: bgColor,
        }}
      >
        <Heading as="h3" size="lg" mb="6" textAlign="center">
          Welcome Back!
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <FormControl isInvalid={!!formErrors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                bg={useColorModeValue("white", "gray.700")}
              />
              <FormErrorMessage>{formErrors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formErrors.password}>
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
                  bg={useColorModeValue("white", "gray.700")}
                />
                <InputRightElement>
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
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
            </FormControl>

            {authError && (
              <Box textAlign="center" color="red" mt="2">
                {authError}
              </Box>
            )}

            <Button type="submit" colorScheme="green" width="100%">
              Login
            </Button>

            <Box display="flex" justifyContent="flex-end">
              <Link
                color="green.500"
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
}

export default Login;
