import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `orbital-precision-emp-client_${name}`
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  discordId: varchar("discord_id", { length: 255 }).unique().notNull(),
  isVerifiedHuman: boolean("is_verified_human").default(false).notNull(),
});

export const wallets = createTable("wallet", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
  addedAt: timestamp("added_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const airdrops = createTable("airdrop", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  tokenName: varchar("token_name", { length: 255 }).notNull(),
  tokenImageUrl: varchar("token_image_url", { length: 255 }),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  projectDescription: text("project_description"),
  maxReward: varchar("max_reward", { length: 255 }).notNull(),
});

export const airdropWallets = createTable("airdrop_wallet", {
  airdropId: integer("airdrop_id")
    .notNull()
    .references(() => airdrops.id),
  walletAddress: varchar("wallet_address", { length: 255 }).notNull(),
  addedAt: timestamp("added_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// export const userAirdrops = createTable("user_airdrop", {
//   userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
//   airdropId: integer("airdrop_id").notNull().references(() => airdrops.id),
//   claimedAt: timestamp("claimed_at", { withTimezone: true }),
// }, (ua) => ({
//   primaryKey: primaryKey(ua.userId, ua.airdropId),
// }));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    provider: varchar("provider", { length: 255 }).notNull().default("discord"),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);
