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
import usePostCellTest from "../../hooks/user/useCellTests";

interface CellTestProps {
  patient_id: string;
}

function PatientCellTests({ patient_id }: CellTestProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postCellTest, loading, error } = usePostCellTest();

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

  const onSubmit = async (data: { Title: string; Description: string }) => {
    const timestamp = new Date().toISOString();
    const cellTestData = {
      title: data.Title,
      description: data.Description,
      updated_at: timestamp,
      created_at: timestamp,
      detection_status: "pending",
    };

    try {
      await postCellTest({
        patient_id,
        cellTestData,
      });
      reset();
      onClose();
    } catch (err) {
      console.log("Error posting cell test:", err);
    }
  };

  const handleModalClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <CardGrid onAddCellTest={onOpen} />
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
                <Button
                  colorScheme="green"
                  mr={3}
                  type="submit"
                  isLoading={loading}
                >
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
      {error && <p>{error}</p>}
    </>
  );
}

export default PatientCellTests;
