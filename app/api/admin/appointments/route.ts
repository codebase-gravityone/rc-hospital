import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    return NextResponse.json({ appointments: data });
}
