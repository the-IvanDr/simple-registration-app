import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { UserModel } from "@/models/user.model";
import { LocalStorageService } from "@/services/local-storage.service";
import { useUser } from "@/api/hooks/useUser.hook";

export function ProfilePage() {
  const navigate = useNavigate();

  const { logout } = useUser();

  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const userData = LocalStorageService.getUser();
    if (userData) {
      setUser(userData);
    } else {
      navigate("/registration");
    }
  }, []);

  const onLogout = () => {
    logout();
    navigate("/login");
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
          <Text fontStyle="italic">{user?.name}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Address:</Text>
          <Text fontStyle="italic">{user?.address}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Phone Number:</Text>
          <Text fontStyle="italic">{user?.phoneNumber}</Text>
        </Box>
        <Button mt={4} onClick={onLogout}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
}
