import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cellTestSchema } from "../../schema/validationSchema";
import CardGrid from "../generic/CardGrid";

interface CellTestProps {
  initialCellTests?: { title: string; description: string }[];
}

function PatientCellTests({ initialCellTests = [] }: CellTestProps) {
  const [cellTests, setCellTests] =
    useState<{ title: string; description: string }[]>(initialCellTests);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(cellTestSchema),
    defaultValues: {
      Title: "",
      Description: "",
    },
  });

  const onSubmit = (data: { Title: string; Description: string }) => {
    setCellTests((prevTests) => [
      ...prevTests,
      { title: data.Title, description: data.Description },
    ]);
    reset();
    onClose();
  };

  const handleModalClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <CardGrid cellTests={cellTests} onAddCellTest={onOpen} />

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Cell Test</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.Title}>
                <FormLabel>Title</FormLabel>
                <Input {...register("Title")} placeholder="Enter the title" />
                <FormErrorMessage>{errors.Title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isInvalid={!!errors.Description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("Description")}
                  placeholder="Enter the description"
                />
                <FormErrorMessage>
                  {errors.Description?.message}
                </FormErrorMessage>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="green" mr={3} type="submit">
                  Add
                </Button>
                <Button variant="ghost" onClick={handleModalClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PatientCellTests;
