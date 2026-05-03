import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { accounts, userProgress } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body as { name?: string; email?: string; password?: string };

    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email?.includes("@")) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!password || password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate
    const existing = await db.select({ id: accounts.id }).from(accounts).where(eq(accounts.email, normalizedEmail));
    if (existing.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const accountId = randomUUID();
    const progressId = randomUUID();

    await db.insert(accounts).values({
      id: accountId,
      name: name.trim(),
      email: normalizedEmail,
      password: hashed,
    });

    await db.insert(userProgress).values({
      id: progressId,
      accountId,
    });

    return NextResponse.json({
      id: accountId,
      name: name.trim(),
      email: normalizedEmail,
      avatarInitial: name.trim().charAt(0).toUpperCase(),
    });
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
