import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET all settings
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const settings = await db.select().from(siteSettings);
    const map: Record<string, unknown> = {};
    settings.forEach(s => { map[s.key] = s.value; });
    return NextResponse.json({ settings: map });
}

// POST upsert a setting
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { key, value } = await req.json();
    if (!key) return NextResponse.json({ error: "Key required" }, { status: 400 });

    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (existing[0]) {
        await db.update(siteSettings).set({ value, updatedAt: new Date() }).where(eq(siteSettings.key, key));
    } else {
        await db.insert(siteSettings).values({ key, value });
    }
    return NextResponse.json({ success: true });
}
