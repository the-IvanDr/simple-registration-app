import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { UserModel } from "@/models/user.model";

const user: UserModel = {
  _id: "1",
  name: "John Doe",
  address: "123 Main St, Anytown, USA",
  phoneNumber: "123-456-7890",
};

export function ProfilePage() {
  const onLogout = () => {
    console.log("Logout()");
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Profile
        </Heading>
        <Box>
          <Text fontWeight="bold">Name:</Text>
          <Text fontStyle="italic">{user.name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Address:</Text>
          <Text fontStyle="italic">{user.address}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Phone Number:</Text>
          <Text fontStyle="italic">{user.phoneNumber}</Text>
        </Box>
        <Button mt={4} onClick={onLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
