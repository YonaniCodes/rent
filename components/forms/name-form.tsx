"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditName } from "@/queries/profile/useEditName";

const nameSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type NameFormProps = {
  initialName: string;
  telegramId: string;
};

export function NameForm({ initialName, telegramId }: NameFormProps) {
  const { editName, isPending } = useEditName(telegramId);

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: initialName,
    },
  });

  const hasChanges = form.watch("name") !== initialName;

  const onSubmit = (values: z.infer<typeof nameSchema>) => {
    editName({ telegram_id: telegramId, newUsername: values.name });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 text-center"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your full name"
                  className="text-2xl font-bold text-gray-900 text-center"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!hasChanges || isPending}
          className="w-full mt-4 py-3 text-sm "
        >
          {isPending ? "Saving..." : hasChanges ? "Save Changes" : "No Changes"}
        </Button>
      </form>
    </Form>
  );
}
