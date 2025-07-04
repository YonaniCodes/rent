import { ListIcon, MapIcon } from "lucide-react";

type MapListControllerProps = {
  view: "map" | "list";
  setView: (view: "map" | "list") => void;
};

export default function MapListController({
  view,
  setView,
}: MapListControllerProps) {
  return (
    <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-full flex overflow-hidden border divide-x">
      <button
        onClick={() => setView("map")}
        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium ${
          view === "map" ? "bg-black text-white" : "text-black"
        }`}
      >
        <MapIcon size={18} />
        Map
      </button>
      <button
        onClick={() => setView("list")}
        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium ${
          view === "list" ? "bg-black text-white" : "text-black"
        }`}
      >
        <ListIcon size={18} />
        List
      </button>
    </div>
  );
}
