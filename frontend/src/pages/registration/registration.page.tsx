import React, { useState } from "react";
import { Link } from "react-router";
import {
  Box,
  Text,
  Button,
  Field,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";

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

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted Data:", {
        name: formData.name.value,
        phone: formData.phone.value,
        address: formData.address.value,
      });
    }
  };

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
