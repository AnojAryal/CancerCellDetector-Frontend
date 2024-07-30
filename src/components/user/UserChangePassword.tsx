import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useChangePassword, {
  ChangePasswordValues,
} from "../../hooks/user/useChangePassword";

interface UserChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserChangePassword = ({ isOpen, onClose }: UserChangePasswordProps) => {
  const { error, successMessage, validationSchema, handleChangePassword } =
    useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const handleToggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const initialValues: ChangePasswordValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: ChangePasswordValues) => {
    handleChangePassword(values, () => {
      console.log("Password changed successfully!");
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={useColorModeValue("white", "gray.700")}
        borderRadius="md"
        maxWidth="lg"
      >
        <ModalBody p={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <VStack spacing={5} align="stretch">
                  <Field name="currentPassword">
                    {({ field }: FieldProps<string>) => (
                      <FormControl
                        isInvalid={Boolean(
                          errors.currentPassword && touched.currentPassword
                        )}
                      >
                        <FormLabel htmlFor="currentPassword" mb={1}>
                          Current Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            size="lg"
                          />
                          <InputRightElement>
                            <IconButton
                              aria-label={
                                showCurrentPassword
                                  ? "Hide current password"
                                  : "Show current password"
                              }
                              onClick={handleToggleCurrentPassword}
                              icon={
                                showCurrentPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )
                              }
                              variant="ghost"
                              size="sm"
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage mt={2}>
                          {errors.currentPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="newPassword">
                    {({ field }: FieldProps<string>) => (
                      <FormControl
                        isInvalid={Boolean(
                          errors.newPassword && touched.newPassword
                        )}
                      >
                        <FormLabel htmlFor="newPassword" mb={1}>
                          New Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            size="lg"
                          />
                          <InputRightElement>
                            <IconButton
                              aria-label={
                                showNewPassword
                                  ? "Hide new password"
                                  : "Show new password"
                              }
                              onClick={handleToggleNewPassword}
                              icon={
                                showNewPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )
                              }
                              variant="ghost"
                              size="sm"
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage mt={2}>
                          {errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="confirmPassword">
                    {({ field }: FieldProps<string>) => (
                      <FormControl
                        isInvalid={Boolean(
                          errors.confirmPassword && touched.confirmPassword
                        )}
                      >
                        <FormLabel htmlFor="confirmPassword" mb={1}>
                          Confirm New Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            size="lg"
                          />
                          <InputRightElement>
                            <IconButton
                              aria-label={
                                showConfirmPassword
                                  ? "Hide confirm password"
                                  : "Show confirm password"
                              }
                              onClick={handleToggleConfirmPassword}
                              icon={
                                showConfirmPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )
                              }
                              variant="ghost"
                              size="sm"
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage mt={2}>
                          {errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    colorScheme="green"
                    size="lg"
                    width="full"
                  >
                    Change Password
                  </Button>

                  {error && (
                    <Text mt={3} color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}

                  {successMessage && (
                    <Text mt={3} color="green.500" fontSize="sm">
                      {successMessage}
                    </Text>
                  )}
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserChangePassword;
