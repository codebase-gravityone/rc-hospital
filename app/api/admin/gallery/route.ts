import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// GET all gallery items
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await db.select().from(gallery).orderBy(gallery.sortOrder);
    return NextResponse.json({ items });
}

// POST new gallery item
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { imageUrl, label, description } = await req.json();
    if (!imageUrl) return NextResponse.json({ error: "Image URL required" }, { status: 400 });
    const result = await db.insert(gallery).values({ imageUrl, label, description }).returning();
    return NextResponse.json({ item: result[0] }, { status: 201 });
}

// DELETE gallery item
export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await db.delete(gallery).where(eq(gallery.id, id));
    return NextResponse.json({ success: true });
}
