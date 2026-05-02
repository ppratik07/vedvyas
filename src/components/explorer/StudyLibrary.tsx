import { SCRIPTURES } from "@/lib/data/scriptures";
import ScriptureCard from "./ScriptureCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function StudyLibrary() {
  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-[#3B2415] leading-tight">Your Study Library</h2>
          <p className="text-sm text-[#8B6344] mt-0.5">Track your progress across the sacred texts</p>
        </div>
        <Link href="/reader" className="text-sm text-[#C17D3C] hover:text-[#9B6020] font-medium transition-colors">
          View All Collections
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4">
        {SCRIPTURES.slice(0, 5).map((s, i) => (
          <ScriptureCard key={s.id} scripture={s} index={i} />
        ))}

        {/* Add Scripture card */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#E8D5B8] flex flex-col items-center justify-center min-h-[200px] gap-2.5 text-[#B8906A] hover:border-[#C17D3C] hover:text-[#C17D3C] hover:bg-[#FDF6EC] transition-all cursor-pointer group">
          <div className="w-11 h-11 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-[#F5E6D0] transition-colors">
            <Plus size={20} strokeWidth={2.5} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">Add Scripture</p>
            <p className="text-xs opacity-70 mt-0.5">Expand your library</p>
          </div>
        </div>
      </div>
    </section>
  );
}
