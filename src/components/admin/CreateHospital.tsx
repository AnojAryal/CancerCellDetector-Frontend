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
  Stack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { hospitalSchema } from "../../schema/validationSchema";
import useCreateHospital from "../../hooks/admin/useCreateHospital";

interface CreateHospitalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  address: string;
  phone: string;
  email: string;
}

function CreateHospital({ isOpen, onClose }: CreateHospitalProps) {
  const { createHospital } = useCreateHospital();
  const toast = useToast();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(hospitalSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createHospital(data);
      toast({
        title: "Hospital created.",
        description: "A new hospital has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error creating hospital.",
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
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Hospital</ModalHeader>
        <ModalBody>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Hospital Name</FormLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" isInvalid={!!errors.name} />
                )}
              />
              {errors.name && (
                <FormLabel color="red.500">{errors.name.message}</FormLabel>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Hospital Address</FormLabel>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" isInvalid={!!errors.address} />
                )}
              />
              {errors.address && (
                <FormLabel color="red.500">{errors.address.message}</FormLabel>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Hospital Phone Number</FormLabel>
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
              <FormLabel>Hospital Email</FormLabel>
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
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSubmit(onSubmit)}>
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateHospital;
