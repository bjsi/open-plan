import { tokenPath } from "./filesystem";
import { OAuth2Client } from "google-auth-library";
import fs from "node:fs";
import open from "open";

export function createGoogleAuthClient(): OAuth2Client {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://127.0.0.1:3001/auth/callback"
  );
}

export async function getGoogleAuthClientOrAuthenticate(): Promise<
  OAuth2Client | undefined
> {
  const oauth2Client = createGoogleAuthClient();
  if (fs.existsSync(tokenPath)) {
    const token_data = fs.readFileSync(tokenPath, "utf8");
    const token = JSON.parse(token_data);
    oauth2Client.setCredentials(token);
    return oauth2Client;
  }

  // Generate a URL that asks permissions for the Google Calendar API
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    response_type: "code",
    prompt: "consent",
  });

  open(authorizeUrl, { wait: false }).then((cp) => cp.unref());
  return undefined;
}
