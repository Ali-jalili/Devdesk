/** @format */

export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="space-y-3">
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      <div className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 animate-pulse rounded-xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    </div>
  );
}
