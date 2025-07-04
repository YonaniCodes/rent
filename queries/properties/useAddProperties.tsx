import supabaseClient from "@/db/supabase";
import { PropertyForm } from "@/types/home";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type AddPropertiesInput = {
  telegram_id: string;
  properties: PropertyForm[];
};

// Mocked async function that performs the actual update
async function addProperties(properties: PropertyForm[], telegram_id: string) {
  const { data, error } = await supabaseClient
    .from("homes")
    .insert(properties)
    .select();

  if (data) {
    return data;
    console.log(data);
  }

  if (error) {
    console.log(error);
    throw new Error(error.message || String(error));
  }
}

export const useAddProperties = (telegram_id: string) => {
  const queryClient = useQueryClient();

  const { mutate: addTasks, isPending } = useMutation({
    mutationFn: ({ telegram_id, properties }: AddPropertiesInput) =>
      addProperties(properties, telegram_id),

    onSuccess: () => {
      toast.success("Properties updated ✅");
      queryClient.invalidateQueries({ queryKey: ["properies", telegram_id] });
    },

    onError: () => {
      toast.error("Failed to Add tasks ❌");
    },
  });

  return { addTasks, isPending };
};
