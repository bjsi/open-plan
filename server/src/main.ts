import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { authRoutes } from "./routes/auth";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, mergeRouters } from "./trpc";
import { apiRouter } from "./routers/api";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const authCheck = (req: any, res: any, next: any) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

// set up routes
// app.use("/auth", authRoutes);

const appRouter = mergeRouters(apiRouter);

app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export type AppRouter = typeof apiRouter;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
