import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Grid,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreatePatient from "../../hooks/user/useCreatePatient";
import { patientSchema } from "../../schema/validationSchema";
import HospitalSelect from "../admin/HospitalSelect";
import { hospitalId, isAdmin } from "../generic/DecodeToken";
import { useState } from "react";

interface PatientCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  birth_date: string;
  street: string;
  city: string;
}

const PatientCreate = ({ isOpen, onClose }: PatientCreateProps) => {
  const { createPatient, createAddress } = useCreatePatient();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      birth_date: "",
      street: "",
      city: "",
    },
  });

  const [hospital, setHospital] = useState<string>("");

  const handleHospitalChange = (selectedHospitalId: string | null) => {
    setHospital(selectedHospitalId ?? "");
  };

  const onSubmit = async (data: FormValues) => {
    const [first_name = "", last_name = ""] = data.fullName.split(" ");

    const patientData = {
      first_name,
      last_name,
      email: data.email,
      phone: data.phone,
      birth_date: data.birth_date,
      hospital_id: isAdmin ? hospital : hospitalId?.toString() ?? "",
    };

    const addressData = {
      street: data.street,
      city: data.city,
      hospital_id: isAdmin ? hospital : hospitalId?.toString() ?? "",
    };

    try {
      const patientId = await createPatient(patientData);
      if (data.street && data.city && patientId) {
        await createAddress({
          ...addressData,
          patient_id: patientId,
        });
      }
      toast({
        title: "Patient created.",
        description: "A new patient has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      setHospital("");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error creating patient.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Unknown error.",
          description: "An unknown error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleClose = () => {
    reset();
    setHospital("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Patient</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Box>
                <FormControl isInvalid={!!errors.fullName}>
                  <FormLabel>Full Name</FormLabel>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" />}
                  />
                  {errors.fullName && (
                    <FormLabel color="red.500">
                      {errors.fullName.message}
                    </FormLabel>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email Address</FormLabel>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} type="email" />}
                  />
                  {errors.email && (
                    <FormLabel color="red.500">
                      {errors.email.message}
                    </FormLabel>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={!!errors.phone}>
                  <FormLabel>Phone Number</FormLabel>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" />}
                  />
                  {errors.phone && (
                    <FormLabel color="red.500">
                      {errors.phone.message}
                    </FormLabel>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={!!errors.birth_date}>
                  <FormLabel>Birth Date</FormLabel>
                  <Controller
                    name="birth_date"
                    control={control}
                    render={({ field }) => <Input {...field} type="date" />}
                  />
                  {errors.birth_date && (
                    <FormLabel color="red.500">
                      {errors.birth_date.message}
                    </FormLabel>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={!!errors.street}>
                  <FormLabel>Street</FormLabel>
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" />}
                  />
                  {errors.street && (
                    <FormLabel color="red.500">
                      {errors.street.message}
                    </FormLabel>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={!!errors.city}>
                  <FormLabel>City</FormLabel>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => <Input {...field} type="text" />}
                  />
                  {errors.city && (
                    <FormLabel color="red.500">{errors.city.message}</FormLabel>
                  )}
                </FormControl>
              </Box>
              {isAdmin && (
                <Box gridColumn="span 2">
                  <FormControl>
                    <HospitalSelect
                      value={hospital}
                      onChange={handleHospitalChange}
                    />
                  </FormControl>
                </Box>
              )}
            </Grid>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={2} onClick={handleSubmit(onSubmit)}>
            Create
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PatientCreate;
