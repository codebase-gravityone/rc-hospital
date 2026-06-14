import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { sendEmail, appointmentNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { patientName, phone, department, preferredDate } = body;

        if (!patientName || !phone || !department || !preferredDate) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Save to database
        await db.insert(appointments).values({ patientName, phone, department, preferredDate });

        // Send email notification to admin
        const notifyEmail = process.env.NOTIFY_EMAIL;
        if (notifyEmail) {
            const { subject, html } = appointmentNotificationEmail({ patientName, phone, department, preferredDate });
            sendEmail({ to: notifyEmail, subject, html }).catch(console.error); // non-blocking
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Appointment creation error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
