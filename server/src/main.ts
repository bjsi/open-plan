import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routers/auth";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, mergeRouters } from "./lib/trpc";
import { apiRouter } from "./routers/api";
import { getDotEnvFilePath } from "shared/src/sharedFilesystem";
import { getGoogleAuthClientOrAuthenticate } from "./lib/googleAuthClient";

dotenv.config({ path: getDotEnvFilePath() });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/auth", authRouter);

const appRouter = mergeRouters(apiRouter);

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export type AppRouter = typeof apiRouter;

const split = process.env.SERVER_URL!.split(":")!;
const PORT = Number.parseInt(split[split.length - 1]);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  getGoogleAuthClientOrAuthenticate();
});
