import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import type { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";
import crypto from "crypto";

interface SessionUser extends NextAuthUser {
  id: string;
  nonce?: string;
  nonceExpiresAt?: Date;
}

interface ExtendedSession extends Session {
  user: SessionUser;
}

interface CustomToken extends JWT {
  uid: string;
  nonce?: string;
  nonceExpiresAt?: Date;
}

const generateNonce = () => {
  const nonce = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  return { nonce, expiresAt };
};

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }): Promise<CustomToken> {
      // This callback is invoked when the user signs in or when the JWT is refreshed
      if (user) {
        token.uid = user.id;
      }
      if (trigger === "update") {
        // update the nonce and expiration
        const { nonce, expiresAt } = generateNonce();

        token.nonce = nonce;
        token.nonceExpiresAt = expiresAt;
      }

      return token as CustomToken;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      const customToken = token as CustomToken;
      if (session?.user) {
        (session.user as SessionUser).id = customToken.uid;
        (session.user as SessionUser).nonce = customToken.nonce;
        (session.user as SessionUser).nonceExpiresAt =
          customToken.nonceExpiresAt;
      }
      return session as ExtendedSession;
    },
  },
} satisfies NextAuthOptions;

export default NextAuth(authOptions);
