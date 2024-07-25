import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreatePatient from "../../hooks/useCreatePatient";
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
}

const PatientCreate = ({ isOpen, onClose }: PatientCreateProps) => {
  const { createPatient } = useCreatePatient();
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
    },
  });

  const [hospital, setHospital] = useState<string | undefined>(undefined);

  const handleHospitalChange = (selectedHospitalId: string | null) => {
    setHospital(selectedHospitalId ?? undefined);
  };

  const onSubmit = async (data: FormValues) => {
    const [first_name = "", last_name = ""] = data.fullName.split(" ");

    const patientData = {
      first_name,
      last_name,
      email: data.email,
      phone: data.phone,
      birth_date: data.birth_date,
      hospital_id: isAdmin ? hospital ?? "" : hospitalId?.toString() ?? "",
    };

    try {
      await createPatient(patientData);
      toast({
        title: "Patient created.",
        description: "A new patient has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      setHospital(undefined);
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

  // Reset the form when the modal is closed
  const handleClose = () => {
    reset();
    setHospital(undefined);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Patient</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" isInvalid={!!errors.fullName} />
                )}
              />
              {errors.fullName && (
                <FormLabel color="red.500">{errors.fullName.message}</FormLabel>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="email" isInvalid={!!errors.email} />
                )}
              />
              {errors.email && (
                <FormLabel color="red.500">{errors.email.message}</FormLabel>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" isInvalid={!!errors.phone} />
                )}
              />
              {errors.phone && (
                <FormLabel color="red.500">{errors.phone.message}</FormLabel>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Birth Date</FormLabel>
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="date"
                    isInvalid={!!errors.birth_date}
                  />
                )}
              />
              {errors.birth_date && (
                <FormLabel color="red.500">
                  {errors.birth_date.message}
                </FormLabel>
              )}
            </FormControl>
            {isAdmin && (
              <FormControl>
                <HospitalSelect
                  value={hospital ?? ""}
                  onChange={handleHospitalChange}
                />
              </FormControl>
            )}
          </Stack>
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
