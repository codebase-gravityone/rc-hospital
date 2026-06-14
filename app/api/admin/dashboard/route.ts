import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments, contactLeads, blogPosts, gallery, services } from "@/lib/db/schema";
import { count, eq } from "drizzle-orm";

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [apptTotal] = await db.select({ total: count() }).from(appointments);
    const [apptPending] = await db.select({ total: count() }).from(appointments).where(eq(appointments.status, "pending"));
    const [leadsTotal] = await db.select({ total: count() }).from(contactLeads);
    const [blogTotal] = await db.select({ total: count() }).from(blogPosts);
    const [galleryTotal] = await db.select({ total: count() }).from(gallery);
    const [servicesTotal] = await db.select({ total: count() }).from(services);

    // Recent appointments
    const recent = await db.select().from(appointments).orderBy(appointments.createdAt).limit(5);

    return NextResponse.json({
        stats: {
            appointments: apptTotal.total,
            pending: apptPending.total,
            contactLeads: leadsTotal.total,
            blogPosts: blogTotal.total,
            gallery: galleryTotal.total,
            services: servicesTotal.total,
        },
        recentAppointments: recent,
    });
}
