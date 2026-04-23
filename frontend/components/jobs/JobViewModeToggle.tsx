import { JobViewMode } from "@/types";
import { LayoutGrid, LayoutList } from "lucide-react";

interface JobViewModeProps {
  viewMode: string;
  setViewMode: (mode: JobViewMode) => void;
}

const JobViewModeToggle = ({ viewMode, setViewMode }: JobViewModeProps) => {
  return (
    <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5 bg-white">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === "grid"
            ? "bg-gray-100 text-black"
            : "text-gray-400 hover:text-black/60"
        }`}
        aria-label="List view"
      >
        <LayoutList className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode("card")}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === "card"
            ? "bg-gray-100 text-black"
            : "text-gray-400 hover:text-black/60"
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
    </div>
  );
};

export default JobViewModeToggle;
