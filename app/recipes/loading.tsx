export default function RecipesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-9 w-64 skeleton rounded-lg mb-2" />
        <div className="h-5 w-48 skeleton rounded-lg" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters skeleton */}
        <div className="lg:w-72 shrink-0">
          <div className="p-5 rounded bg-gray-800 border border-gray-700 space-y-4">
            <div className="h-6 w-20 skeleton rounded mb-2" />
            <div className="h-10 skeleton rounded" />
            <div className="h-10 skeleton rounded" />
            <div className="h-10 skeleton rounded" />
            <div className="flex flex-wrap gap-2 pt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-7 w-16 skeleton rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded bg-gray-800 border border-gray-700 overflow-hidden"
            >
              <div className="h-48 skeleton" />
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-4 w-16 skeleton rounded" />
                  <div className="h-4 w-12 skeleton rounded" />
                </div>
                <div className="h-6 skeleton rounded" />
                <div className="flex justify-between mt-2">
                  <div className="h-4 w-20 skeleton rounded" />
                  <div className="h-4 w-24 skeleton rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
