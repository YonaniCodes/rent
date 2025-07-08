// components/forms/text-input.tsx
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: "text" | "email" | "number";
}

export function TextInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
}: TextInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ""}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(
                    e.target.value === "" ? undefined : e.target.valueAsNumber
                  );
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
