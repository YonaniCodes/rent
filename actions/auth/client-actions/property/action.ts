import { supabaseClient } from "@/db/supabase";

export const addProperty = async (property: Property) => {
  const { data, error } = await supabaseClient
    .from("properties")
    .insert(property);
  if (error) {
    throw error;
  }
  return data;
};
