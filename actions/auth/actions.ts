"use server";
import { CreateUserPayload, UserSyncPayload } from "../../types/user";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";

import supabaseAdmin from "@/db/supabase-admin";

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
  if (session)
    await syncUserWithSupabase({
      telegram_id: session.user.email.split("#")[1],
      role: session.user.role,
    });
  redirect("/");
};

async function syncUserWithSupabase(payload: UserSyncPayload) {
  try {
    const { telegram_id, role } = payload;

    const { error } = await supabaseAdmin.from("profiles").upsert({
      telegram_id,
      role,
    });

    if (error) {
      console.error("Supabase upsert error:", error);
      return { success: false, message: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error syncing user role:", error);
    return { success: false, message: "Internal server error" };
  }
}
