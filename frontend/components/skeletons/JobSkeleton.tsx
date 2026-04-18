export function JobsSkeletonList({ length = 4 }: { length?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white border-gray-200 p-4 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-200" />
          <div className="space-y-2">
            <div className="w-28 h-3 rounded bg-gray-200" />
            <div className="w-20 h-2 rounded bg-gray-200" />
          </div>
        </div>
        <div className="w-20 h-6 rounded-full bg-gray-200" />
      </div>

      <div className="flex items-center justify-between">
        <div className="w-48 h-4 rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="w-20 h-6 rounded-full bg-gray-200" />
          <div className="w-24 h-6 rounded-full bg-gray-200" />
          <div className="w-24 h-6 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
