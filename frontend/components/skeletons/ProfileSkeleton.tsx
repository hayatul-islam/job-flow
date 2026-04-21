export default function ProfileSkeleton() {
  return (
    <div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-6">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center space-y-3 -mt-16">
          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
          <div className="h-3 w-52 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-gray-300 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-gray-400 rounded-lg animate-pulse" />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <SkeletonField />
          <SkeletonField />
        </div>

        <SkeletonFull />

        <SkeletonFull />

        <div className="grid grid-cols-2 gap-4">
          <SkeletonField />
          <SkeletonField />
        </div>
      </div>
    </div>
  );
}

function SkeletonField() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
      <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse" />
    </div>
  );
}

function SkeletonFull() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
      <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse" />
    </div>
  );
}
