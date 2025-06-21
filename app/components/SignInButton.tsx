// components/SignInButton.tsx
"use client";

import { LoginButton } from "@telegram-auth/react";
import { signInwithTelegram } from "../../server-actions/auth/actions";
import { CreateUserPayload } from "@/types/user";

// Define UserData type for Telegram Login Widget data

export default function SignInButton() {
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME!;

  return (
    <LoginButton
      botUsername={botUsername}
      onAuthCallback={async (data: CreateUserPayload) => {
        console.log(data);
        await signInwithTelegram(data);
      }}
      buttonSize="large"
      cornerRadius={5}
      showAvatar={true}
      lang="en"
    />
  );
}
