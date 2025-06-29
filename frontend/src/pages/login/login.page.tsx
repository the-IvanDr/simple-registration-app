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

export function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log("Login with phone number:", phoneNumber);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
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
              value={phoneNumber}
              onChange={handleChange}
            />
          </Field.Root>

          <Button type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>

      <Box mt={4}>
        <Link to="/registration" color="teal.500">
          <Text color="teal.500">Register if you don't have an account</Text>
        </Link>
      </Box>
    </Box>
  );
}
