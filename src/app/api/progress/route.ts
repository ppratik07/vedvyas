import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userProgress } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { UserProgress } from "@/lib/types";

// GET /api/progress?accountId=xxx
export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId");
  if (!accountId) return NextResponse.json({ error: "accountId is required" }, { status: 400 });

  try {
    const rows = await db.select().from(userProgress).where(eq(userProgress.accountId, accountId));
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const row = rows[0];
    const progress: UserProgress = {
      _v: 1,
      versesRead: row.versesRead,
      streakDays: row.streakDays,
      lastReadDate: row.lastReadDate,
      streakHistory: (row.streakHistory as string[]) ?? [],
      milestones: row.milestones,
      bookmarks: (row.bookmarks as UserProgress["bookmarks"]) ?? [],
      journal: (row.journal as UserProgress["journal"]) ?? [],
      scriptureProgress: (row.scriptureProgress as Record<string, number>) ?? {},
      currentReadingPath: row.currentReadingPath,
      readingPathIndex: row.readingPathIndex,
    };
    return NextResponse.json({ progress });
  } catch (err) {
    console.error("[progress GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/progress  — body: { accountId, progress }
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { accountId, progress } = body as { accountId?: string; progress?: UserProgress };

    if (!accountId || !progress) return NextResponse.json({ error: "accountId and progress are required" }, { status: 400 });

    await db
      .update(userProgress)
      .set({
        versesRead: progress.versesRead,
        streakDays: progress.streakDays,
        lastReadDate: progress.lastReadDate ?? "",
        streakHistory: progress.streakHistory,
        milestones: progress.milestones,
        bookmarks: progress.bookmarks,
        journal: progress.journal,
        scriptureProgress: progress.scriptureProgress,
        currentReadingPath: progress.currentReadingPath,
        readingPathIndex: progress.readingPathIndex,
        updatedAt: new Date(),
      })
      .where(eq(userProgress.accountId, accountId));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[progress PUT]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
