import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { airdrops } from "@/server/db/schema";

export const airdropsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const airdrops = await ctx.db.query.airdrops.findMany();
    return airdrops ?? [];
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const airdrop = await ctx.db.query.airdrops.findFirst({
        where: (airdrops, { eq }) => eq(airdrops.id, input.id),
      });
      return airdrop ?? null;
    }),
});
