import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <Box as="section" bg="brand.background" color="brand.text" py="7.5rem">
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Box textAlign="center">
            <Heading
              as="h1"
              size="3xl"
              fontWeight="extrabold"
              maxW="48rem"
              mx="auto"
              lineHeight="1.2"
              letterSpacing="tight"
            >
              Fair airdrop campaigns, liberated from the bot invasion.
            </Heading>
            <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </Text>
          </Box>

          <Stack
            justify="center"
            direction={{ base: "column", md: "row" }}
            mt="10"
            mb="20"
            spacing="4"
          >
            <Button
              as="a"
              size="lg"
              colorScheme="orange"
              px="8"
              fontWeight="bold"
              fontSize="md"
              href="/drops"
            >
              For Claimers
            </Button>
            <Button
              as="a"
              href="/project"
              size="lg"
              colorScheme="blue"
              px="8"
              fontWeight="bold"
              fontSize="md"
            >
              For Projects
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
