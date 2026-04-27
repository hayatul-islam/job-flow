export function JobsSkeletonList({
  length = 4,
  view,
}: {
  length?: number;
  view: string;
}) {
  if (view === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length }).map((_, i) => (
          <JobCardCompactSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white border-gray-200 p-4 space-y-4 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-200" />
          <div className="space-y-2 min-w-0">
            <div className="w-28 h-3 rounded bg-gray-200" />
            <div className="w-20 h-2 rounded bg-gray-200" />
          </div>
        </div>
        <div className="w-20 h-6 shrink-0 rounded-full bg-gray-200" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="w-48 h-4 rounded bg-gray-200" />
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-6 rounded-full bg-gray-200" />
          <div className="w-24 h-6 rounded-full bg-gray-200" />
          <div className="w-24 h-6 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function JobCardCompactSkeleton() {
  return (
    <div className="rounded-xl border bg-white border-gray-200 animate-pulse flex flex-col">
      <div className="px-3.5 pt-3 pb-2.5 border-b border-gray-100 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-gray-200" />
          <div className="w-14 h-4 rounded bg-gray-200" />
        </div>
        <div className="w-24 h-2.5 rounded bg-gray-200" />
      </div>

      <div className="px-3.5 py-3 flex flex-col gap-2 flex-1">
        <div className="w-full h-3.5 rounded bg-gray-200" />
        <div className="w-3/4 h-3.5 rounded bg-gray-200" />
        <div className="w-20 h-2.5 rounded bg-gray-200 mt-1" />
      </div>

      <div className="px-3.5 py-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          <div className="w-16 h-5 rounded-md bg-gray-200" />
          <div className="w-16 h-5 rounded-md bg-gray-200" />
        </div>
        <div className="w-14 h-5 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
