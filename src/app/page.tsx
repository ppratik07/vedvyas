import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DailyContemplation from "@/components/explorer/DailyContemplation";
import StudyLibrary from "@/components/explorer/StudyLibrary";
import DeepStudyAI from "@/components/explorer/DeepStudyAI";
import StudyStreak from "@/components/explorer/StudyStreak";
import { fetchGitaVerse, getDailyVerseRef, FALLBACK_VERSE } from "@/lib/api/gita";

export default async function ExplorerPage() {
  const { chapter, verse } = getDailyVerseRef();
  const dailyVerse = (await fetchGitaVerse(chapter, verse)) ?? FALLBACK_VERSE;
  const chapterRef = `/reader/bhagavad-gita/${chapter}/${verse}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            <DailyContemplation verse={dailyVerse} chapterRef={chapterRef} />
            <StudyLibrary />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <DeepStudyAI />
              </div>
              <StudyStreak />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
