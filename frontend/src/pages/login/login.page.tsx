import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  Box,
  Button,
  Field,
  Input,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useUser } from "@/api/hooks/useUser.hook";

interface PhoneNumberField {
  value: string;
  error: string;
}

export function LoginPage() {
  const navigate = useNavigate();

  const { getUserByPhoneNumber, isLogin } = useUser();

  const [generalErrorMessage, setGeneralErrorMessage] = useState<string>("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const response = await getUserByPhoneNumber(phoneNumber.value);

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
        Login
      </Heading>

      {generalErrorMessage && (
        <Text mb={4} color="red.500">
          {generalErrorMessage}
        </Text>
      )}

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
