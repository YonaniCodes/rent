import { createAuthClient } from "better-auth/react";

import { telegramAuthClient } from "../telegram-oauth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [telegramAuthClient()],
});
