import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { whatsappTemplates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET all templates
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const templates = await db.select().from(whatsappTemplates);
    return NextResponse.json({ templates });
}

// POST new template
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { name, message } = await req.json();
    if (!name || !message) return NextResponse.json({ error: "Name and message required" }, { status: 400 });
    const result = await db.insert(whatsappTemplates).values({ name, message }).returning();
    return NextResponse.json({ template: result[0] }, { status: 201 });
}

// DELETE template
export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await db.delete(whatsappTemplates).where(eq(whatsappTemplates.id, id));
    return NextResponse.json({ success: true });
}
