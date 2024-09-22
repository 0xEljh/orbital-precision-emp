import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import { transformer } from "@/lib/transformer";

export const serverSideTrpc = createServerSideHelpers({
  router: appRouter,
  ctx: {},
  transformer,
});
