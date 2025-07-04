import { authClient } from "@/lib/auth-client";

export const getUserIdFromSession = async (): Promise<string> => {
  const { data: session } = await authClient.getSession();

  if (!session || !session.user?.id) {
    throw new Error("No valid session or user ID found");
  }

  return session.user.email.split("#")[1];
};
