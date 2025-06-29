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

interface RegistrationFormData {
  name: string;
  phone: string;
  address: string;
}

export function RegistrationPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
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
              value={formData.name}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Phone Number</Field.Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Address</Field.Label>
            <Input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </Field.Root>

          <Button type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>

      <Box mt={4}>
        <Link to="/login" color="teal.500">
          <Text color="teal.500">Login if you already have an account</Text>
        </Link>
      </Box>
    </Box>
  );
}
