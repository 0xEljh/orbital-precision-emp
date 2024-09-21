import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

// TODO: Fetch airdrops from the backend
const airdrops = [
  {
    id: 1,
    title: "Airdrop #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    token: {
      name: "Orbital Token",
      imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/13502.png",
    },
    project: {
      name: "Project Name",
      //   description: "Project description",
    },
    maxReward: "100",
  },
];

export default function Drops() {
  return (
    <Container py={{ base: "16", md: "24" }}>
      <Stack spacing={{ base: "16", md: "24" }}>
        <Stack spacing={{ base: "8", md: "10" }} align="center">
          <Stack spacing={{ base: "4", md: "6" }} textAlign="center">
            <Stack spacing="4">
              <Heading size={{ base: "md", md: "lg" }}>
                Upcoming Airdrops
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                maxW="2xl"
                color="fg.muted"
              >
                Fair distributions. Free from bots.
              </Text>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Text
              fontSize={{ base: "md", md: "lg" }}
              maxW="2xl"
              color="fg.muted"
            >
              Subscribe to get email updates about new airdrops.
            </Text>
            <Stack
              spacing="4"
              direction={{ base: "column", md: "row" }}
              width="full"
              justify="center"
            >
              <Input
                size="xl"
                type="email"
                placeholder="Enter your email"
                maxW={{ md: "sm" }}
              />
              <Button size="xl" colorScheme="orange">
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          rowGap={{ base: "8", md: "12" }}
          columnGap="8"
        >
          {airdrops.map((airdrop) => (
            <Link key={airdrop.id} _hover={{ textDecor: "none" }} role="group">
              <Box
                p="6"
                bg="bg.surface"
                boxShadow="md"
                _groupHover={{ boxShadow: "xl" }}
                transition="all 0.2s"
                height="full"
              >
                <Stack
                  spacing={{ base: "8", lg: "16" }}
                  justify="space-between"
                  height="full"
                >
                  <Stack spacing="8">
                    <Stack spacing="3">
                      <Heading size="xs">{airdrop.title}</Heading>
                      <Text color="fg.muted">{airdrop.description}</Text>
                    </Stack>
                  </Stack>
                  <HStack>
                    <Avatar
                      src={airdrop.token.imageUrl}
                      name={airdrop.token.name}
                      boxSize="10"
                    />
                    <Box fontSize="sm">
                      <Text fontWeight="medium">{airdrop.maxReward}</Text>
                    </Box>
                  </HStack>
                </Stack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
