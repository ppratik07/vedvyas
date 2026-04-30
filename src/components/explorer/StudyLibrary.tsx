import { SCRIPTURES } from "@/lib/data/scriptures";
import ScriptureCard from "./ScriptureCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function StudyLibrary() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-semibold text-[#3B2415] text-base">Your Study Library</h2>
          <p className="text-xs text-[#8B6344]">Track your progress across the sacred texts</p>
        </div>
        <Link href="/reader" className="text-sm text-[#C17D3C] hover:text-[#9B6020] font-medium">
          View All Collections
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {SCRIPTURES.map((s) => (
          <ScriptureCard key={s.id} scripture={s} />
        ))}

        {/* Add Scripture placeholder */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-[#E8D5B8] flex flex-col items-center justify-center h-48 gap-2 text-[#B8906A] hover:border-[#C17D3C] hover:text-[#C17D3C] transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-[#F5E6D0]">
            <Plus size={20} />
          </div>
          <p className="text-sm font-medium">Add Scripture</p>
          <p className="text-xs text-center px-4 opacity-70">Expand your library</p>
        </div>
      </div>
    </section>
  );
}
