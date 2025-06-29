import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  Box,
  Text,
  Button,
  Field,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useUser } from "@/api/hooks/useUser.hook";

interface FieldState {
  value: string;
  error: string;
}

interface RegistrationFormState {
  name: FieldState;
  phone: FieldState;
  address: FieldState;
}

export function RegistrationPage() {
  const navigate = useNavigate();

  const { createUser, isLogin } = useUser();

  const [generalErrorMessage, setGeneralErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<RegistrationFormState>({
    name: { value: "", error: "" },
    phone: { value: "", error: "" },
    address: { value: "", error: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { value, error: "" },
    }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    const updatedForm = { ...formData };

    if (!formData.name.value.trim()) {
      updatedForm.name.error = "Name is required.";
      valid = false;
    }

    if (!formData.address.value.trim()) {
      updatedForm.address.error = "Address is required.";
      valid = false;
    }

    const phone = formData.phone.value.trim();
    if (!phone) {
      updatedForm.phone.error = "Phone number is required.";
      valid = false;
    } else if (!/^\d{12}$/.test(phone)) {
      updatedForm.phone.error = "Phone number must be exactly 12 digits.";
      valid = false;
    }

    setFormData(updatedForm);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await createUser({
        name: formData.name.value,
        phoneNumber: formData.phone.value,
        address: formData.address.value,
      });

      if (response.errors && response.errors.length > 0) {
        setGeneralErrorMessage(response.errors[0]);
      } else {
        navigate("/profile");
      }
    }
  };

  if (isLogin) {
    return <Navigate to="/profile" />;
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb={6} size="lg" textAlign="center">
        Register
      </Heading>

      {generalErrorMessage && (
        <Text mb={4} color="red.500">
          {generalErrorMessage}
        </Text>
      )}

      <form onSubmit={handleSubmit}>
        <VStack>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              name="name"
              placeholder="Name"
              value={formData.name.value}
              onChange={handleChange}
            />
            <Text color="red.500">{formData.name.error}</Text>
          </Field.Root>

          <Field.Root>
            <Field.Label>Phone Number</Field.Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone.value}
              onChange={handleChange}
            />
            <Text color="red.500">{formData.phone.error}</Text>
          </Field.Root>

          <Field.Root>
            <Field.Label>Address</Field.Label>
            <Input
              name="address"
              placeholder="Address"
              value={formData.address.value}
              onChange={handleChange}
            />
            <Text color="red.500">{formData.address.error}</Text>
          </Field.Root>

          <Button type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>

      <Box mt={4}>
        <Link to="/login">
          <Text color="teal.500">Login if you already have an account</Text>
        </Link>
      </Box>
    </Box>
  );
}
