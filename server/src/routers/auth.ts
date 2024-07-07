import fs from "node:fs";
import { tokenPath } from "../lib/filesystem";
import { Router } from "express";
import { createGoogleAuthClient } from "../lib/googleAuthClient";

import dotenv from "dotenv";
dotenv.config();

const router = Router();

// handle callback when request is made to /auth/callback and extract the authorisation code
// authorisation code is exchanged for access/refresh tokens using OAuth client
router.get("/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (typeof code === "string") {
      const oauth2Client = createGoogleAuthClient();
      const { tokens } = await oauth2Client.getToken(code);
      const tokenJSON = JSON.stringify(tokens, null, 2);
      fs.writeFileSync(tokenPath, tokenJSON, "utf8");
      res.send("Authentication successful!");
    } else {
      res.send("Error: Authorization code is missing or invalid.");
    }
  } catch (e) {
    if (e instanceof Error) {
      res.send(`Error: ${e.message}`);
    } else {
      res.send("An unknown error occurred.");
    }
  }
});

export const authRouter = router;
