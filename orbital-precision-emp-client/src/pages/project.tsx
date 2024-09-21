import { useState } from "react";
import {
  Box,
  Heading,
  Container,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import Papa from "papaparse";
import { useForm } from "react-hook-form";

import type { Airdrop } from "../types/drops";

interface AirdropForm extends Airdrop {
  walletAddresses: string[];
}

export default function Project() {
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AirdropForm>();

  // file upload for wallet addresses
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: function (results: any) {
          const parsedAddresses = results.data.map((row: string[]) => row[0]);
          setWalletAddresses(parsedAddresses);
          setValue("walletAddresses", parsedAddresses); // Set parsed addresses in form
        },
        header: false,
      });
    }
  };

  // Handle form submission
  const onSubmit = (data: Airdrop) => {
    console.log("Form Data:", data);
    console.log("Wallet Addresses:", walletAddresses);
    // TODO: submit form data to backend
  };

  return (
    <Container p={4} pb={{ base: "16", md: "24" }}>
      <Heading size={{ base: "md", md: "lg" }} py={12} textAlign="center">
        Create an Airdrop
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} maxW={{ base: "full", md: "2xl" }} mx="auto">
          {/* Title */}
          <FormControl id="title" isInvalid={!!errors.title} isRequired mb={4}>
            <FormLabel>Airdrop Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter airdrop title"
              {...register("title", { required: "Airdrop title is required" })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          {/* Description */}
          <FormControl
            id="description"
            isInvalid={!!errors.description}
            isRequired
            mb={4}
          >
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Enter airdrop description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          {/* Token Selector */}
          <FormControl id="token" isInvalid={!!errors.token} isRequired mb={4}>
            <FormLabel>Select Token</FormLabel>
            <Select
              {...register("token", {
                required: "Token selection is required",
              })}
            >
              <option value="">Select a token</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="BNB">Binance Coin (BNB)</option>
            </Select>
            <FormErrorMessage>
              {errors.token && errors.token.message}
            </FormErrorMessage>
          </FormControl>

          {/* Project Name */}
          <FormControl
            id="projectName"
            isInvalid={!!errors.project?.name}
            isRequired
            mb={4}
          >
            <FormLabel>Project Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter project name"
              {...register("project.name", {
                required: "Project name is required",
              })}
            />
            <FormErrorMessage>
              {errors.project?.name && errors.project?.name.message}
            </FormErrorMessage>
          </FormControl>

          {/* Project Description */}
          <FormControl
            id="projectDescription"
            isInvalid={!!errors.project?.description}
            isRequired
            mb={4}
          >
            <FormLabel>Project Description</FormLabel>
            <Textarea
              placeholder="Enter project description"
              {...register("project.description", {
                required: "Project description is required",
              })}
            />
            <FormErrorMessage>
              {errors.project?.description &&
                errors.project?.description.message}
            </FormErrorMessage>
          </FormControl>

          {/* Max Reward */}
          <FormControl
            id="maxReward"
            isInvalid={!!errors.maxReward}
            isRequired
            mb={4}
          >
            <FormLabel>Max Reward Per User</FormLabel>
            <Input
              type="text"
              placeholder="Enter max reward per user"
              {...register("maxReward", { required: "Max reward is required" })}
            />
            <FormErrorMessage>
              {errors.maxReward && errors.maxReward.message}
            </FormErrorMessage>
          </FormControl>

          {/* Wallet Upload */}
          <FormControl
            id="walletUpload"
            isInvalid={!!errors.walletAddresses}
            isRequired
            mb={4}
          ></FormControl>
          <FormLabel>Upload Wallet Addresses</FormLabel>
          <Input type="file" onChange={handleFileUpload} />
          <FormErrorMessage>
            {errors.walletAddresses && errors.walletAddresses.message}
          </FormErrorMessage>

          {/* Submit Button */}
          <Button type="submit" colorScheme="orange">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
