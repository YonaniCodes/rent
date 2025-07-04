import { createAuthClient } from "better-auth/react";

import { telegramAuthClient } from "../telegram-oauth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
  plugins: [telegramAuthClient()],
});
