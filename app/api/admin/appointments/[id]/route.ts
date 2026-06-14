import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/admin/appointments/[id]">) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await ctx.params;
    const { status } = await request.json();

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await db.update(appointments).set({ status }).where(eq(appointments.id, parseInt(id)));
    return NextResponse.json({ success: true });
}
