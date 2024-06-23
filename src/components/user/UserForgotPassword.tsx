import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import apiClient from "../../services/api-client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function UserForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("black", "white");
  const errorColor = useColorModeValue("red.500", "red.300");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (timerRunning && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTimerRunning(false);
    }

    return () => clearTimeout(timer);
  }, [timerRunning, countdown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      const resetResponse = await apiClient.post("/send-reset-email", {
        email,
        token: "",
        used: true,
        created_at: new Date().toISOString(),
      });
      if (resetResponse.status === 200) {
        setEmailSent(true);
        setTimerRunning(true);
        setCountdown(60); // Start the countdown when the email is sent
      } else {
        throw new Error("Failed to send reset email");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send reset email. Please try again later.");
    }
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResendClick = async () => {
    if (timerRunning) return; // Prevent resending if timer is still running

    try {
      const resetResponse = await apiClient.post("/send-reset-email", {
        email,
        token: "",
        used: true,
        created_at: new Date().toISOString(),
      });
      if (resetResponse.status === 200) {
        setEmailSent(true);
        setTimerRunning(true);
        setCountdown(60); // Start the countdown again
      } else {
        throw new Error("Failed to resend reset email");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to resend reset email. Please try again later.");
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={8}
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="lg"
      bg={bgColor}
      color={textColor}
    >
      {emailSent ? (
        <>
          <Text mb={4}>
            An email with instructions to reset your password has been sent to:{" "}
            {email}.
          </Text>
          <Text>Resend in {countdown} seconds</Text>
          <Flex justify="center" mt={4}>
            <Button
              onClick={handleResendClick}
              colorScheme="blue"
              borderRadius="xl"
              disabled={timerRunning}
              _hover={{ bg: "blue.600" }}
            >
              Resend Email
            </Button>
          </Flex>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              isInvalid={!!error}
              borderRadius="xl"
              borderColor={borderColor}
            />
          </FormControl>
          {error && (
            <Text color={errorColor} mt={2} fontSize="sm">
              {error}
            </Text>
          )}
          <Flex justify="center" mt={4}>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={emailSent}
              borderRadius="xl"
              _hover={{ bg: "blue.600" }}
            >
              Send Reset Link
            </Button>
          </Flex>
        </form>
      )}
      <Text mt={4} fontSize="sm" textAlign="center">
        <Link as={RouterLink} to="/login" color="blue.500">
          Back to Login
        </Link>
      </Text>
    </Box>
  );
}

export default UserForgotPassword;
