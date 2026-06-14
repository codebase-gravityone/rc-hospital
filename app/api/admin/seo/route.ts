import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { seoSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET all SEO settings
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const settings = await db.select().from(seoSettings);
    return NextResponse.json({ settings });
}

// POST/PATCH upsert SEO for a page
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { page, title, description, keywords, ogImage } = await req.json();
    if (!page) return NextResponse.json({ error: "Page required" }, { status: 400 });

    const existing = await db.select().from(seoSettings).where(eq(seoSettings.page, page)).limit(1);
    if (existing[0]) {
        await db.update(seoSettings).set({ title, description, keywords, ogImage, updatedAt: new Date() }).where(eq(seoSettings.page, page));
    } else {
        await db.insert(seoSettings).values({ page, title, description, keywords, ogImage });
    }
    return NextResponse.json({ success: true });
}
