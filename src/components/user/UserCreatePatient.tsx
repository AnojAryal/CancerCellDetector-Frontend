import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import BoxGrid from "../generic/BoxGrid";
import useCreatePatient from "../../hooks/useCreatePatient";


const UserCreatePatient = () => {
  const navigate = useNavigate();
  const { isLoading, error, createPatient } = useCreatePatient();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
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
      await createPatient(formData);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        birth_date: "",
      });
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <BoxGrid>
      <HStack justifyContent="space-between" mb={4}>
        <Heading as="h5" size="md">
          Create Patient
        </Heading>
        <IconButton
          icon={<AiOutlineClose />}
          onClick={() => navigate(-1)}
          aria-label="Close"
        />
      </HStack>
      <form onSubmit={handleSubmit}>
        <VStack spacing={3.5} align="stretch">
          <FormControl>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="birth_date">Birth Date</FormLabel>
            <Input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              placeholder="Enter birth date"
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Create Patient
          </Button>
          {error && (
            <Text color="red" mt={2}>
              Error: {error}
            </Text>
          )}
        </VStack>
      </form>
    </BoxGrid>
  );
};

export default UserCreatePatient;
