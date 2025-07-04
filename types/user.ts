export type CreateUserPayload = {
  id: string | number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string | number;
  hash: string;
};

export type UserType = {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
  role: string;
  username?: string | null | undefined;
};

export type UserSyncPayload = {
  telegram_id: string;
  role: "user" | "admin" | "landlord" | "agent"; // expand as needed
};
