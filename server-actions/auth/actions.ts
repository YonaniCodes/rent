"use server";

import { CreateUserPayload } from "../../types/user";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";

export const signInwithTelegram = async (body: CreateUserPayload) => {
  // 2. Prepare transformed body with correct types
  const transformedBody = {
    ...body,
    id: String(body.id),
    auth_date: String(body.auth_date),
  };

  // 3. Call Telegram OAuth endpoint
  const session = await auth.api.telegramCallback({ body: transformedBody });

  // 4. Redirect if successful
  if (session) redirect("/");
};
