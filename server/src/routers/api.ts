import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const apiRouter = router({
  hi: publicProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {}),
});
