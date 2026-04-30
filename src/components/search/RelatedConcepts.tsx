interface RelatedConceptsProps {
  concepts: string[];
  visualStudyTitle: string;
}

export default function RelatedConcepts({ concepts, visualStudyTitle }: RelatedConceptsProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Related concepts */}
      <div className="bg-white rounded-2xl border border-[#E8D5B8] p-4 shadow-sm">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[#C17D3C]">✦</span>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#3B2415]">Related Concepts</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {concepts.map((c) => (
            <span
              key={c}
              className="text-xs bg-[#FDF6EC] border border-[#E8D5B8] text-[#5C3A20] px-3 py-1 rounded-full font-medium hover:bg-[#F5E6D0] hover:border-[#C17D3C] cursor-pointer transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Visual study card */}
      <div className="rounded-2xl overflow-hidden shadow-sm">
        <div className="relative h-28 bg-gradient-to-br from-amber-950 via-amber-800 to-amber-600 flex items-end p-3">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-6xl">🕉</span>
          </div>
          <div className="relative z-10">
            <p className="text-[9px] uppercase tracking-widest text-amber-300 font-semibold">Visual Study</p>
            <p className="text-white font-display font-semibold text-sm leading-tight">{visualStudyTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
