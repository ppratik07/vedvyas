import { WEEKLY_WISDOM } from "@/lib/data/scriptures";

function getDayQuote(): string {
  const idx = new Date().getDay();
  return WEEKLY_WISDOM[idx % WEEKLY_WISDOM.length];
}

export default function WeeklyWisdom() {
  const quote = getDayQuote();
  return (
    <div className="bg-[#2C1A0E] rounded-2xl p-5 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 flex items-center justify-center text-[80px] select-none pointer-events-none">🕉</div>
      <p className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-2">Weekly Wisdom</p>
      <p className="font-display italic text-white/90 text-sm leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
