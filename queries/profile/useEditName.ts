import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type EditNameInput = {
  telegram_id: string;
  newUsername: string;
};

// Mocked async function that performs the actual update
async function updateName(telegramId: string, newUsername: string) {
  console.log("Updating:", telegramId, newUsername);
  // Replace with real API call (e.g., axios.post or fetch)
  return { success: true };
}

export const useEditName = (telegramId: string) => {
  const queryClient = useQueryClient();

  const { mutate: editName, isPending } = useMutation({
    mutationFn: ({ telegram_id, newUsername }: EditNameInput) =>
      updateName(telegram_id, newUsername),

    onSuccess: () => {
      console.log("suuse");
      toast.success("Name updated successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["profile", telegramId] });
    },

    onError: () => {
      toast.error("Failed to update name ❌");
    },
  });

  return { editName, isPending };
};
