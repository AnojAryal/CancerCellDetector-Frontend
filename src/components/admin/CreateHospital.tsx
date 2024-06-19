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
import useCreateHospital from "../../hooks/useCreateHospital";

const CreateHospital = () => {
  const navigate = useNavigate();
  const { isLoading, error, createHospital } = useCreateHospital();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

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
      await createHospital(formData);
      setSuccessMessage("Hospital created successfully.");
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  return (
    <BoxGrid>
      <HStack justifyContent="space-between" mb={4}>
        <Heading as="h5" size="md">
          Create Hospital
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
            <FormLabel htmlFor="name">Hospital Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter hospital name"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter hospital address"
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
              placeholder="Enter hospital phone number"
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
              placeholder="Enter hospital email address"
              required
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Create Hospital
          </Button>

          {successMessage && (
            <Text color="green" mt={2}>
              {successMessage}
            </Text>
          )}

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

export default CreateHospital;
