import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useToast,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useState } from "react";

import type { Airdrop } from "@/types/drops";

import { IDKitWidget, VerificationLevel, useIDKit } from "@worldcoin/idkit";

// TODO: Fetch drop from the backend
const drop = {
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
};

const fetchAirdropDetails = async (dropId: string) => {
  return drop;
};

export async function getServerSideProps({
  params,
}: {
  params: { dropId: string };
}) {
  // Fetch airdrop details based on dropId
  const airdropDetails = await fetchAirdropDetails(params.dropId);

  return {
    props: {
      airdropDetails,
    },
  };
}

export default function AirdropClaimPage({
  airdropDetails,
}: {
  airdropDetails: Airdrop;
}) {
  const router = useRouter();
  const toast = useToast();
  const { setOpen } = useIDKit();

  console.log(process.env.NEXT_PUBLIC_WORLDID_APP_ID);
  console.log(process.env.NEXT_PUBLIC_WORLDID_ACTION_ID);

  const [wallets, setWallets] = useState<string[]>([]);
  const [newWallet, setNewWallet] = useState("");

  const [isFlagged, setIsFlagged] = useState(false);

  const handleAddWallet = () => {
    if (newWallet && !wallets.includes(newWallet)) {
      setWallets([...wallets, newWallet]);
      setNewWallet("");
    } else {
      toast({
        title: "Invalid wallet",
        description: "Please enter a valid and unique wallet address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const checkIfUserIsFlagged = async (wallets: string[]): Promise<boolean> => {
    // TODO: Implement actual API call to check if user is flagged
    // For now, we'll randomly flag users for demonstration purposes
    return Math.random() < 0.5;
  };

  const submitClaims = async (wallets: string[]) => {
    // TODO: Implement actual API call to submit claims
    console.log("Submitting claims:", wallets);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement logic to submit claims for each wallet
    console.log("Submitting claims:", wallets);

    // Check if user is flagged
    checkIfUserIsFlagged(wallets).then((isFlagged) => {
      setIsFlagged(isFlagged);
    });
  };

  const handleWorldIDVerification = async (verificationResponse: any) => {
    try {
      // TODO: Implement API call to verify WorldID proof
      console.log("WorldID verification response:", verificationResponse);

      // If verification is successful, submit claims
      await submitClaims(wallets);
      // worldID stuff...
      // redirect user...
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "WorldID verification failed. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          {airdropDetails.title}
        </Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Wallet Address</FormLabel>
              <HStack>
                <Input
                  value={newWallet}
                  onChange={(e) => setNewWallet(e.target.value)}
                  placeholder="Enter wallet address"
                />
                <Button onClick={handleAddWallet} colorScheme="blue">
                  Add Wallet
                </Button>
              </HStack>
            </FormControl>

            {wallets.length > 0 && (
              <Box color="brand.text">
                <Text fontWeight="bold" mb={2}>
                  Added Wallets:
                </Text>
                <VStack align="stretch">
                  {wallets.map((wallet, index) => (
                    <Text key={index}>{wallet}</Text>
                  ))}
                </VStack>
              </Box>
            )}

            <Button type="submit" colorScheme="orange">
              Claim Airdrop
            </Button>
          </VStack>
        </Box>
        {isFlagged && (
          <Container>
            <Stack spacing={4}>
              <Text size="lg" mb={4}>
                You have been flagged as a sybil user. Use WorldID to prove
                humanity.
              </Text>
              <IDKitWidget
                app_id={
                  (process.env.NEXT_PUBLIC_WORLDID_APP_ID as `app_${string}`) ||
                  "app_missing"
                }
                action={
                  process.env.NEXT_PUBLIC_WORLDID_ACTION_ID || "action_missing"
                }
                onSuccess={handleWorldIDVerification}
                // TODO: handleVerify=...
                verification_level={VerificationLevel.Device} // for testing
                onError={(error: any) => {
                  console.log("WorldID error:", error);
                  toast({
                    title: "WorldID Error",
                    description:
                      "WorldID verification failed. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              />
              <Button colorScheme="blue" onClick={() => setOpen(true)}>
                Verify with WorldID
              </Button>
            </Stack>
          </Container>
        )}

        {/* <Box>
          <Heading as="h2" size="lg" mb={4}>
            Airdrop Details:
          </Heading>
          <Box as="pre" p={4} borderRadius="md" whiteSpace="pre-wrap">
            {JSON.stringify(airdropDetails, null, 2)}
          </Box>
        </Box> */}
      </VStack>
    </Container>
  );
}
