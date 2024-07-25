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
  Checkbox,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserCreate } from "../../hooks/useCreateUser";
import HospitalSelect from "./HospitalSelect";
import { isAdmin } from "../generic/DecodeToken";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    address: "",
    bloodGroup: "",
    gender: "",
    contactNo: "",
    hospital: null as string | null,
    password: "",
    is_hospital_admin: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const { userCreate, formErrors } = useUserCreate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      is_hospital_admin: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    try {
      await userCreate(formData, () => {
        alert("Successfully created user");
      });
    } catch (error) {
      console.error("User creation failed:", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "lg",
          color: "gray.600",
          marginBottom: "24px",
        }}
      >
        Add user to the system
      </div>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <GridItem colSpan={{ base: "auto", md: 1 }}>
            <Stack spacing="4">
              <FormControl isInvalid={!!formErrors?.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter the username"
                  autoComplete="username"
                />
                <FormErrorMessage>{formErrors?.username}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formErrors?.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter the email"
                  autoComplete="email"
                />
                <FormErrorMessage>{formErrors?.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formErrors?.fullName}>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter the full name"
                  autoComplete="name"
                />
                <FormErrorMessage>{formErrors?.fullName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formErrors?.address}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter the address"
                  autoComplete="street-address"
                />
                <FormErrorMessage>{formErrors?.address}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formErrors?.bloodGroup}>
                <FormLabel htmlFor="bloodGroup">Blood Group</FormLabel>
                <Input
                  type="text"
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="Enter the blood group"
                  autoComplete="off"
                />
                <FormErrorMessage>{formErrors?.bloodGroup}</FormErrorMessage>
              </FormControl>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: "auto", md: 1 }}>
            <Stack spacing="4">
              <FormControl isInvalid={!!formErrors?.gender}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  placeholder="Select the gender"
                  autoComplete="sex"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formErrors?.gender}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formErrors?.contactNo}>
                <FormLabel htmlFor="contactNo">Contact Number</FormLabel>
                <Input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter the contact number"
                  autoComplete="tel"
                />
                <FormErrorMessage>{formErrors?.contactNo}</FormErrorMessage>
              </FormControl>

              {isAdmin && (
                <FormControl isInvalid={!!formErrors?.hospital}>
                  <HospitalSelect
                    value={formData.hospital}
                    onChange={(selectedHospitalId) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        hospital: selectedHospitalId,
                      }))
                    }
                    error={formErrors?.hospital}
                  />
                </FormControl>
              )}

              <FormControl isInvalid={!!formErrors?.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter the password"
                    autoComplete="new-password"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Show password" : "Hide password"}
                      h="1.75rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                      icon={showPassword ? <FaEye /> : <FaEyeSlash />}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formErrors?.password}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Checkbox
                  id="isHospitalAdmin"
                  name="isHospitalAdmin"
                  isChecked={formData.is_hospital_admin}
                  onChange={handleAdminChange}
                >
                  Hospital Admin
                </Checkbox>
              </FormControl>
            </Stack>
          </GridItem>
        </Grid>
        <Flex justify="center" mt="4">
          <Button onClick={goBack} colorScheme="blue" size="lg" mr={4}>
            Back
          </Button>
          <Button type="submit" colorScheme="green" size="lg">
            Create User
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default CreateUser;