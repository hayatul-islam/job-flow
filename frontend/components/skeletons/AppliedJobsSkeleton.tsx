"use client";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/70 dark:bg-gray-800 ${className}`}
    />
  );
};

const RowSkeleton = () => {
  return (
    <div className="grid grid-cols-12 items-center gap-4 px-5 py-4 border border-gray-100  ">
      <div className="col-span-5 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* STATUS */}
      <div className="col-span-3">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* DATE */}
      <div className="col-span-3">
        <Skeleton className="h-4 w-28" />
      </div>

      {/* ACTION */}
      <div className="col-span-1 flex gap-3 justify-end">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-5 rounded" />
      </div>
    </div>
  );
};

const AppliedJobsSkeleton = ({ length = 6 }: { length?: number }) => {
  return (
    <div className="border border-gray-100 border-gray-200-gray-200 rounded-2xl overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 dark:bg-gray-900 text-xs font-medium text-gray-500 uppercase">
        <div className="col-span-5">Jobs</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-3">Date Applied</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {Array(length)
        .fill(0)
        .map((_i, idx) => (
          <RowSkeleton key={idx} />
        ))}
    </div>
  );
};

export default AppliedJobsSkeleton;
