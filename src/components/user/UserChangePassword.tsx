import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  VStack,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Formik, Field, Form, FieldProps } from "formik";
import { AiOutlineClose, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useChangePassword, {
  ChangePasswordValues,
} from "../../hooks/useChangePassword";

const UserChangePassword = () => {
  const navigate = useNavigate();
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
    });
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
    >
      <Box
        maxW="md"
        width="100%"
        mx={4}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
      >
        <HStack justifyContent="space-between" mb={4}>
          <Heading as="h3" size="lg">
            Change Password
          </Heading>
          <IconButton
            icon={<AiOutlineClose />}
            onClick={() => navigate(-1)}
            aria-label="Close"
          />
        </HStack>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={4} align="stretch">
                <Field name="currentPassword">
                  {({ field }: FieldProps<string>) => (
                    <FormControl
                      isInvalid={Boolean(
                        errors.currentPassword && touched.currentPassword
                      )}
                    >
                      <FormLabel htmlFor="currentPassword">
                        Current Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
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
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
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
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
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
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
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
                      <FormLabel htmlFor="confirmPassword">
                        Confirm New Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          {...field}
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
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
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button type="submit" colorScheme="teal" width="full">
                  Change
                </Button>

                {error && (
                  <Text mt={2} color="red.500" fontSize="sm">
                    {error}
                  </Text>
                )}

                {successMessage && (
                  <Text mt={2} color="green.500" fontSize="sm">
                    {successMessage}
                  </Text>
                )}
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default UserChangePassword;
