import { signIn } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

import { Container, Button, Stack, Text } from "@chakra-ui/react";

export const LoginCard = () => {
  const handleLogin = () => {
    signIn("discord");
  };
  return (
    <Container
      maxW="container.md"
      py={8}
      border="1px solid"
      borderColor="gray"
      borderRadius="lg"
    >
      <Stack spacing={4} align="stretch">
        <Text size="lg" mb={4}>
          Welcome to Orbital Precision EMP!
        </Text>
        <Button
          onClick={handleLogin}
          colorScheme="orange"
          leftIcon={<FaDiscord color="white" />}
        >
          Login with Discord
        </Button>
      </Stack>
    </Container>
  );
};
