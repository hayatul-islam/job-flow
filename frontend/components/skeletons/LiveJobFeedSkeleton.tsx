const SkeletonItem = () => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />

        <div className="space-y-2">
          <div className="w-40 h-3 rounded bg-gray-200 animate-pulse" />

          <div className="w-24 h-2 rounded bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div className="w-16 h-2 rounded bg-gray-200 animate-pulse" />
    </div>
  );
};

const LiveJobFeedSkeleton = () => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-md p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="w-28 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-36 h-3 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="w-16 h-6 rounded-full bg-gray-200 animate-pulse" />
      </div>

      <div>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>

      <div className="pt-2">
        <div className="w-full h-10 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default LiveJobFeedSkeleton;
