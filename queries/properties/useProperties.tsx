import { useQuery } from "@tanstack/react-query";
import supabaseClient from "@/db/supabase";
import { getUserIdFromSession } from "@/utils/session-utils";

const getPropertiesByTelegramId = async () => {
  const telegram_id = await getUserIdFromSession();
  console.log(telegram_id);

  const { data, error } = await supabaseClient
    .from("homes")
    .select("*")
    .eq("owner_id", telegram_id);
  if (error) throw error;
  return data;
};

export const useProperties = () => {
  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["homes"],
    queryFn: () => {
      return getPropertiesByTelegramId();
    },
  });

  return { properties, isLoading, error };
};
