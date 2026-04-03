export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 space-y-2">
        <div className="h-10 w-48 rounded-xl shimmer-bg" />
        <div className="h-5 w-24 rounded-lg shimmer-bg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800">
            <div className="h-48 shimmer-bg" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded shimmer-bg" />
                <div className="h-4 w-14 rounded-full shimmer-bg" />
              </div>
              <div className="h-6 w-full rounded shimmer-bg" />
              <div className="h-4 w-3/4 rounded shimmer-bg" />
              <div className="flex gap-3">
                <div className="h-4 w-16 rounded shimmer-bg" />
                <div className="h-4 w-20 rounded shimmer-bg" />
              </div>
              <div className="flex gap-2">
                <div className="h-5 w-16 rounded-full shimmer-bg" />
                <div className="h-5 w-12 rounded-full shimmer-bg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
