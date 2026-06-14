import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments, contactLeads, analyticsDaily } from "@/lib/db/schema";
import { count, desc, sql } from "drizzle-orm";

// GET analytics overview
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Count totals
    const [appointmentCount] = await db.select({ total: count() }).from(appointments);
    const [leadCount] = await db.select({ total: count() }).from(contactLeads);

    // Daily stats (last 7 days)
    const daily = await db.select().from(analyticsDaily).orderBy(desc(analyticsDaily.date)).limit(7);

    return NextResponse.json({
        totals: {
            appointments: appointmentCount.total,
            contactLeads: leadCount.total,
        },
        daily: daily.reverse(),
    });
}
