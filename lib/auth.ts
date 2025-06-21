import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/drizzle";
import { schema } from "../db/schema";
import { nextCookies } from "better-auth/next-js";
import { telegramOAuth } from "../telegram-oauth/index";
const botToken = process.env.TELEGRAM_BOT_TOKEN!;
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
        input: false,
      },
      username: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },

  plugins: [telegramOAuth({ botToken }), nextCookies()],
});
