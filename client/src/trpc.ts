import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "server/src/main";
import { type CreateTRPCReact, createTRPCReact } from "@trpc/react-query";

export const trpcHooks: CreateTRPCReact<AppRouter, unknown, null> =
  createTRPCReact<AppRouter>();

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
