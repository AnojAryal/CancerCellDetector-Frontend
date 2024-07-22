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
import HospitalSelect from "../admin/HospitalSelect";
import { hospitalId, isAdmin } from "../generic/DecodeToken";

interface Patient {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  hospital_id: string;
}

const UserCreatePatient = () => {
  const navigate = useNavigate();
  const { isLoading, error, createPatient } = useCreatePatient();
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState<
    Omit<Patient, "first_name" | "last_name" | "hospital_id">
  >({
    email: "",
    phone: "",
    birth_date: "",
  });
  const [hospital, setHospital] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHospitalChange = (selectedHospitalId: string | null) => {
    setHospital(selectedHospitalId || undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Split full name into first name and last name
    const [first_name = "", last_name = ""] = fullName.split(" ");

    const patientData: Patient = {
      first_name,
      last_name,
      email: formData.email,
      phone: formData.phone,
      birth_date: formData.birth_date,
      hospital_id: isAdmin ? hospital || "" : hospitalId?.toString() || "",
    };

    try {
      await createPatient(patientData);
      setSuccessMessage("Patient created successfully!");
      setFullName("");
      setFormData({
        email: "",
        phone: "",
        birth_date: "",
      });
      setHospital(undefined);
    } catch (error) {
      console.error("Error creating patient:", error);
      setSuccessMessage(null);
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
            <FormLabel htmlFor="full_name">Full Name</FormLabel>
            <Input
              type="text"
              id="full_name"
              value={fullName}
              onChange={handleFullNameChange}
              placeholder="Enter full name"
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

          {isAdmin && (
            <FormControl>
              <HospitalSelect
                value={hospital || ""}
                onChange={handleHospitalChange}
              />
            </FormControl>
          )}

          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Create Patient
          </Button>
          {successMessage && (
            <Text color="green" mt={2} aria-live="polite">
              {successMessage}
            </Text>
          )}
          {error && (
            <Text color="red" mt={2} aria-live="polite">
              Error: {error}
            </Text>
          )}
        </VStack>
      </form>
    </BoxGrid>
  );
};

export default UserCreatePatient;
