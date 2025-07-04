import { Button } from "@/components/ui/button";
import { useAddProperties } from "@/queries/properties/useAddProperties";
import { generateProperties } from "./properties";

export default function Uploader() {
  const { isPending, addTasks } = useAddProperties("721748418");
  if (isPending) return <h1>Hello world</h1>;
  return (
    <Button
      onClick={() => {
        console.log("cliecked");
        const properties = generateProperties(3, "721748418");
        console.log(properties);
        addTasks({
          properties,
          telegram_id: "721748418",
        });
      }}
      disabled={isPending}
    >
      Upload data
    </Button>
  );
}
