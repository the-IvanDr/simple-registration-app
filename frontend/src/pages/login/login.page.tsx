import React, { useState } from "react";
import { Link } from "react-router";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

interface PhoneNumberField {
  value: string;
  error: string;
}

export function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumberField>({
    value: "",
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber({ value: e.target.value, error: "" });
  };

  const validate = (): boolean => {
    const trimmed = phoneNumber.value.trim();

    if (!trimmed) {
      setPhoneNumber({ ...phoneNumber, error: "Phone number is required." });
      return false;
    }

    if (!/^\d{12}$/.test(trimmed)) {
      setPhoneNumber({
        ...phoneNumber,
        error: "Phone number must be exactly 12 digits.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (validate()) {
      console.log("Login with phone number:", phoneNumber.value);
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
        Login
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack>
          <Field.Root>
            <Field.Label>Phone Number</Field.Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phoneNumber.value}
              onChange={handleChange}
            />
            <Text color="red.500">{phoneNumber.error}</Text>
          </Field.Root>

          <Button type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>

      <Box mt={4}>
        <Link to="/registration">
          <Text color="teal.500">Register if you don't have an account</Text>
        </Link>
      </Box>
    </Box>
  );
}
