"use client";

const CategorySkeleton = () => {
  const renderItems = (count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="flex items-center gap-3 p-4 rounded-2xl border bg-white border-gray-300 shadow-sm animate-pulse"
      >
        <div className="w-16 h-12 rounded-lg bg-gray-200" />
        <div className="flex flex-col gap-2 w-full">
          <div className="h-4  bg-gray-200 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    ));

  return (
    <div className="w-full px-4 py-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {renderItems(3)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {renderItems(4)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {renderItems(3)}
      </div>
    </div>
  );
};

export default CategorySkeleton;
