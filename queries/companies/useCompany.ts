import { useQuery } from "@tanstack/react-query";
import supabaseClient from "@/db/supabase";

import { getUserIdFromSession } from "@/utils/session-utils";

type Company = {
  id: number;
  name: string;
  email: string;
  website: string;
  logo_url: string;
};

type ProfileWithCompany = {
  telegram_id: string;
  company: Company;
};

const getProfileByTelegramId = async (): Promise<ProfileWithCompany> => {
  const telegram_id = await getUserIdFromSession();
  const { data, error } = await supabaseClient
    .from("profiles")
    .select(
      `
      telegram_id,
      company:companies (
        id,
        name,
        email,
        website,
        logo_url
      )
    `
    )
    .eq("telegram_id", telegram_id)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  return data;
};

export const useCompany = () => {
  const { data, isLoading, error } = useQuery<ProfileWithCompany>({
    queryKey: ["company"],
    queryFn: getProfileByTelegramId,
  });

  const company = data?.company;

  return { company, isLoading, error };
};
