import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import dotenv from "dotenv";
import { getDotEnvFilePath } from "../shared/src/sharedFilesystem";
import fs from "node:fs";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const fp = getDotEnvFilePath();
  const text = fs.readFileSync(fp, "utf8");
  const env = dotenv.parse(text);
  const viteEnv = {
    VITE_SERVER_URL: env.SERVER_URL,
    VITE_CLIENT_URL: env.CLIENT_URL,
  };
  process.env = { ...process.env, ...viteEnv };
  return {
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      viteTsconfigPaths(),
    ],
  };
});
