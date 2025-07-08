"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { type SupabaseClient } from "@supabase/supabase-js";
import { HomeForm } from "@/types/home";
import { useSupabase } from "@/providers/supabase-client";

type AddPropertiesInput = {
  home: HomeForm;
};

async function addHomesAPI(home: HomeForm, supabase: SupabaseClient) {
  const { data, error } = await supabase.from("homes").insert(home).select();

  if (error) {
    console.error(error);
    throw new Error(error.message || "Failed to add home");
  }

  return data;
}

export const useAddHomes = () => {
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  const { mutate: addHome, isPending } = useMutation({
    mutationFn: ({ home }: AddPropertiesInput) => addHomesAPI(home, supabase),
    onSuccess: () => {
      toast.success("Properties added ✅");
      queryClient.invalidateQueries({ queryKey: ["homes"] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to add home ❌ ${error.message}`);
    },
  });

  return { addHome, isPending };
};
