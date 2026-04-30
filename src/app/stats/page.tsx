import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatsOverview from "@/components/stats/StatsOverview";
import ReadingPath from "@/components/stats/ReadingPath";
import JournalSection from "@/components/stats/JournalSection";
import BookmarksSection from "@/components/stats/BookmarksSection";
import WeeklyWisdom from "@/components/stats/WeeklyWisdom";

export default function StatsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar title="Digital Sanctuary" subtitle="Welcome, Seeker" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            {/* Header */}
            <div>
              <h1 className="font-display text-3xl font-bold text-[#3B2415]">Sanctuary Overview</h1>
              <p className="text-sm text-[#8B6344] italic mt-1">Your path of contemplation and growth.</p>
            </div>

            <StatsOverview />
            <ReadingPath />

            {/* Bottom split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <JournalSection />
              <div className="flex flex-col gap-4">
                <BookmarksSection />
                <WeeklyWisdom />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
