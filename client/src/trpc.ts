import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server/src/main";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_SERVER_URL}/api`,
    }),
  ],
});

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
