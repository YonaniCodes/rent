"use client";
import { LoginButton } from "@telegram-auth/react";
import { signInwithTelegram } from "@/server-actions/auth/actions";
export default function SignIN() {
  return (
    <LoginButton
      botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME!}
      onAuthCallback={(data) => {
        signInwithTelegram(data);
        // call your backend here to validate the data and sign in the user
      }}
    />
  );
}
