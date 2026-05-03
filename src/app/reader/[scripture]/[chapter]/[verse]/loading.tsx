import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

function Shimmer({ className }: { className: string }) {
  return (
    <div className={`animate-pulse rounded bg-[#F0DEC8] ${className}`} />
  );
}

export default function ReaderLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar title="Loading…" subtitle="Sacred Text" />

        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Toolbar skeleton */}
          <div className="flex items-center justify-end gap-2 p-3 border-b border-[#E8D5B8]">
            <Shimmer className="w-7 h-7" />
            <Shimmer className="w-7 h-7" />
            <Shimmer className="w-7 h-7" />
            <Shimmer className="w-7 h-7" />
          </div>

          {/* Main content */}
          <div className="flex flex-1 overflow-y-auto">
            {/* Left: verse number */}
            <div className="w-16 shrink-0 flex items-start justify-center pt-8">
              <Shimmer className="w-8 h-4" />
            </div>

            {/* Center: verse + commentary */}
            <div className="flex-1 min-w-0 px-4 py-8 flex flex-col gap-8">
              {/* AI-loading indicator */}
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-[#E8D5B8] border-t-[#C17D3C] animate-spin" />
                  <div className="absolute inset-2 rounded-full bg-[#FDF6EC] flex items-center justify-center">
                    <span className="font-display text-xl text-[#C17D3C]">ॐ</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[#3B2415]">Retrieving the sacred verse…</p>
                  <p className="text-xs text-[#8B6344] mt-1">Consulting ancient wisdom</p>
                </div>
              </div>

              {/* Sanskrit text skeleton */}
              <div className="rounded-xl border border-[#E8D5B8] bg-[#FDFAF5] p-6 flex flex-col gap-3">
                <Shimmer className="h-6 w-3/4 mx-auto" />
                <Shimmer className="h-6 w-2/3 mx-auto" />
                <Shimmer className="h-4 w-1/2 mx-auto mt-2 opacity-60" />
              </div>

              {/* Commentary skeleton */}
              <div className="rounded-xl border border-[#E8D5B8] bg-white p-5 flex flex-col gap-3">
                <Shimmer className="h-4 w-24" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-5/6" />
                <Shimmer className="h-3 w-4/5" />
              </div>

              <div className="rounded-xl border border-[#E8D5B8] bg-white p-5 flex flex-col gap-3">
                <Shimmer className="h-4 w-28" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-3/4" />
              </div>
            </div>

            {/* Right panel skeleton */}
            <div className="w-56 shrink-0 p-4 pt-8 hidden lg:flex flex-col gap-3">
              <Shimmer className="h-4 w-20" />
              <Shimmer className="h-3 w-full" />
              <Shimmer className="h-3 w-5/6" />
              <Shimmer className="h-3 w-4/5" />
              <Shimmer className="h-3 w-full" />
            </div>
          </div>

          {/* Navigation bar skeleton */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E8D5B8]">
            <Shimmer className="w-24 h-8 rounded-lg" />
            <Shimmer className="w-16 h-4" />
            <Shimmer className="w-24 h-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
