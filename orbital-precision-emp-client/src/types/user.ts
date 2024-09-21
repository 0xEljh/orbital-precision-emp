import { User as NextAuthUser } from "next-auth";

export interface User extends NextAuthUser {
  id: string;
  username: string;
  avatar: string;
  wallets: string[];
  isVerified: boolean;
  nonce?: string;
  nonceExpiresAt?: Date;
}
