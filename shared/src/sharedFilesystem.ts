import * as path from "node:path";
import * as fs from "node:fs";

export const customDotEnvFile = path.join(__dirname, "../../.env");
export const defaultDotEnvFile = path.join(__dirname, "../../.env.default");
export function getDotEnvFilePath() {
  if (fs.existsSync(customDotEnvFile)) {
    return customDotEnvFile;
  }
  return defaultDotEnvFile;
}
