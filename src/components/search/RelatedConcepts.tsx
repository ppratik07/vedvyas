import { useRouter } from "next/navigation";

interface RelatedConceptsProps {
  concepts: string[];
  visualStudyTitle: string;
}

export default function RelatedConcepts({ concepts, visualStudyTitle }: RelatedConceptsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Related concepts */}
      <div className="bg-white rounded-2xl border border-[#E8D5B8] overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-[#F5E6D0]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#C17D3C] text-xs">✦</span>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#3B2415]">Related Concepts</h3>
          </div>
        </div>
        <div className="p-4 flex flex-wrap gap-2">
          {concepts.map((c) => (
            <span
              key={c}
              className="text-xs bg-[#FDF6EC] border border-[#E8D5B8] text-[#5C3A20] px-3 py-1.5 rounded-full font-medium hover:bg-[#F5E6D0] hover:border-[#C17D3C] hover:text-[#C17D3C] cursor-pointer transition-all"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Visual study card */}
      <div className="rounded-2xl overflow-hidden shadow-sm relative h-32"
        style={{ background: "linear-gradient(135deg, #1E0F06 0%, #3D2312 50%, #8B4513 100%)" }}
      >
        {/* Top border glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        {/* Om watermark */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 font-display text-7xl text-white/8 select-none">ॐ</div>
        <div className="relative z-10 flex flex-col justify-end h-full p-4">
          <p className="text-[9px] uppercase tracking-widest text-amber-400/80 font-bold mb-0.5">Visual Study</p>
          <p className="text-white font-display font-semibold text-sm leading-snug">{visualStudyTitle}</p>
        </div>
      </div>
    </div>
  );
}
