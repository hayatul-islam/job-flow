import { Search } from "lucide-react";

export default function EmptyJobs() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Search className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <h6>No jobs found</h6>
        <p>Try adjusting your filters</p>
      </div>
    </div>
  );
}
