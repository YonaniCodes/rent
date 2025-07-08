import { Button } from "@/components/ui/button";
import { useAddHomes } from "@/queries/properties/useAddHomes";
import { generateProperties } from "./properties";

export default function Uploader() {
  const { isPending, addHome } = useAddHomes();
  if (isPending) return <h1>Hello world</h1>;
  return (
    <Button
      onClick={() => {
        console.log("cliecked");
        const properties = generateProperties(3, "721748418");
        console.log(properties);
        addHome({
          home: properties,
        });
      }}
      disabled={isPending}
    >
      Upload data
    </Button>
  );
}
