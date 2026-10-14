export default function PostsLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-16">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full space-y-10">
        {/* Banner Skeleton */}
        <div className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-xl space-y-5 text-center shadow-2xl animate-pulse">
          {/* Badge Skeleton */}
          <div className="inline-flex items-center justify-center">
            <div className="h-6 w-56 bg-slate-800 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <div className="flex justify-center">
            <div className="h-10 md:h-12 w-72 bg-slate-800 rounded-2xl" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2 max-w-xl mx-auto">
            <div className="h-4 bg-slate-800/80 rounded w-full" />
            <div className="h-4 bg-slate-800/60 rounded w-3/4 mx-auto" />
          </div>

          {/* Channel Tag Skeletons */}
          <div className="pt-2 flex justify-center gap-4">
            <div className="h-7 w-60 bg-slate-800/60 rounded-lg" />
            <div className="h-7 w-32 bg-slate-800/60 rounded-lg" />
          </div>
        </div>

        {/* Loading Indicator Status */}
        <div className="flex flex-col items-center justify-center gap-3 text-center py-2">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900/90 border border-rose-500/40 backdrop-blur-md shadow-xl shadow-rose-500/10">
            <svg
              className="animate-spin h-6 w-6 text-rose-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-lg md:text-xl font-bold text-white tracking-wide">
              กำลังโหลดข้อมูล...
            </span>
          </div>
          <p className="text-sm text-slate-400">
            กำลังดึงคลิปวิดีโอล่าสุดจาก YouTube RSS Feed กรุณารอสักครู่
          </p>
        </div>

        {/* Video Cards Grid Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-xl animate-pulse"
            >
              {/* Thumbnail 16:9 Skeleton */}
              <div className="relative aspect-video bg-slate-800/70 overflow-hidden flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-slate-700/50" />
                <div className="absolute bottom-3 right-3 h-5 w-20 bg-slate-900/80 rounded" />
              </div>

              {/* Card Body Skeleton */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  {/* Views & ID Badges */}
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-slate-800 rounded" />
                    <div className="h-4 w-20 bg-slate-800/60 rounded" />
                  </div>

                  {/* Title Lines Skeleton */}
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-800 rounded w-11/12" />
                    <div className="h-5 bg-slate-800 rounded w-3/4" />
                  </div>

                  {/* Description Skeleton */}
                  <div className="space-y-1.5 pt-1">
                    <div className="h-3.5 bg-slate-800/60 rounded w-full" />
                    <div className="h-3.5 bg-slate-800/60 rounded w-5/6" />
                    <div className="h-3.5 bg-slate-800/40 rounded w-2/3" />
                  </div>
                </div>

                {/* Footer Skeleton */}
                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="h-3.5 w-28 bg-slate-800/50 rounded" />
                  <div className="h-8 w-32 bg-slate-800 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
