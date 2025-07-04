"use client";
import { LoginButton } from "@telegram-auth/react";
import { signInwithTelegram } from "@/actions/auth/actions";
import { CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function SignIn() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>

        <DialogContent className="max-w-md bg-white/80 backdrop-blur-md border border-white/30 shadow-2xl rounded-xl">
          <DialogHeader className="text-center">
            <DialogTitle className="flex items-center justify-center gap-2 text-2xl font-semibold text-gray-800">
              {/* <TelegramIcon className="w-6 h-6 text-blue-600" /> */}
              Sign in to HabeshaHome
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              Sign in with Telegram to continue
            </DialogDescription>
            <DialogClose className="absolute top-3 right-3 rounded-full p-1 hover:bg-gray-200">
              <X className="w-5 h-5" />
            </DialogClose>
          </DialogHeader>

          <CardContent>
            <CardContent>
              <LoginButton
                botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME!}
                onAuthCallback={(data) => {
                  signInwithTelegram(data);
                }}
              />
            </CardContent>
          </CardContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
