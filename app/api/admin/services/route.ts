import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET all services
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = await db.select().from(services).orderBy(services.sortOrder);
    return NextResponse.json({ services: items });
}

// POST new service
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const result = await db.insert(services).values(body).returning();
    return NextResponse.json({ service: result[0] }, { status: 201 });
}

// PATCH update service
export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await db.update(services).set(data).where(eq(services.id, id));
    return NextResponse.json({ success: true });
}

// DELETE service
export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await db.delete(services).where(eq(services.id, id));
    return NextResponse.json({ success: true });
}
