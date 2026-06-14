import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contactLeads } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// GET all contact leads
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const leads = await db.select().from(contactLeads).orderBy(desc(contactLeads.createdAt));
    return NextResponse.json({ leads });
}

// PATCH mark as read
export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, isRead } = await req.json();
    await db.update(contactLeads).set({ isRead }).where(eq(contactLeads.id, id));
    return NextResponse.json({ success: true });
}

// DELETE contact lead
export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await db.delete(contactLeads).where(eq(contactLeads.id, id));
    return NextResponse.json({ success: true });
}
