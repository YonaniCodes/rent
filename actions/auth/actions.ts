"use server";
import { CreateUserPayload, UserType } from "../../types/user";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import supabaseAdmin from "@/db/supabase-admin";

export const signInwithTelegram = async (body: CreateUserPayload) => {
  const transformedBody = {
    ...body,
    id: String(body.id),
    auth_date: String(body.auth_date),
  };

  const session = await auth.api.telegramCallback({ body: transformedBody });

  const telegramId = session.user.email.split("#")[1];
  if (!telegramId) throw new Error("Invalid Telegram ID");

  const supabaseJWT = await generateSupabaseJWT(session.user);

  const { error } = await supabaseAdmin.from("profiles").upsert(
    {
      telegram_id: telegramId,
      username: session.user.username,
      role: session.user.role,
      image: session.user.image,
      name: session.user.name,
    },
    { onConflict: "telegram_id" }
  );

  if (error) throw new Error("Error creating user");

  const cookieStore = await cookies();
  cookieStore.set("supabase_auth_token", supabaseJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600, // 1 hour
  });

  redirect("/");
};

export async function generateSupabaseJWT(user: UserType) {
  const payload = {
    sub: user.email.split("#")[1], // Telegram user ID
    role: "authenticated", // Required for Supabase RLS
    app_metadata: { role: user.role, username: user.username },
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
  };
  return jwt.sign(payload, process.env.SUPABASE_JWT_SECRET!);
}
