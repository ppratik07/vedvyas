import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { accounts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email?.includes("@")) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!password) return NextResponse.json({ error: "Password is required" }, { status: 400 });

    const normalizedEmail = email.trim().toLowerCase();

    const rows = await db.select().from(accounts).where(eq(accounts.email, normalizedEmail));
    if (rows.length === 0) {
      return NextResponse.json({ error: "Email or password is incorrect" }, { status: 401 });
    }

    const account = rows[0];
    const valid = await bcrypt.compare(password, account.password);
    if (!valid) {
      return NextResponse.json({ error: "Email or password is incorrect" }, { status: 401 });
    }

    return NextResponse.json({
      id: account.id,
      name: account.name,
      email: account.email,
      avatarInitial: account.name.charAt(0).toUpperCase(),
    });
  } catch (err) {
    console.error("[login]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
