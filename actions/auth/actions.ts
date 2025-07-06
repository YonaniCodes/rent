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

  console.log(session);

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

export const signInwithTelegrammmm = async (body: CreateUserPayload) => {
  // 1. Transform body and call your existing auth
  const transformedBody = {
    ...body,
    id: String(body.id),
    auth_date: String(body.auth_date),
  };
  const session = await auth.api.telegramCallback({ body: transformedBody });

  // 2. Create/update Supabase user and mapping
  const telegramUserId = transformedBody.id;

  // Check if mapping exists
  const { data: mapping } = await supabaseAdmin
    .from("private.auth_mapping")
    .select("supabase_user_id")
    .eq("external_user_id", telegramUserId)
    .single();

  if (!mapping) {
    // Create new Supabase user
    const { data: user } = await supabaseAdmin.auth.admin.createUser({
      email: `telegram.${telegramUserId}@example.com`,
      email_confirm: true,
      user_metadata: { telegram_id: telegramUserId },
    });

    // Create mapping
    await supabaseAdmin.from("private.auth_mapping").insert({
      external_user_id: telegramUserId,
      supabase_user_id: user.user.id,
    });
  }

  return { success: true };
};
