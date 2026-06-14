import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactLeads } from "@/lib/db/schema";
import { sendEmail, contactLeadNotificationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
    try {
        const { name, phone, email, subject, message } = await req.json();
        if (!name || !phone || !message) {
            return NextResponse.json({ error: "Name, phone, and message are required" }, { status: 400 });
        }

        // Save to database
        await db.insert(contactLeads).values({ name, phone, email, subject, message });

        // Send email notification to admin
        const notifyEmail = process.env.NOTIFY_EMAIL;
        if (notifyEmail) {
            const { subject: emailSubject, html } = contactLeadNotificationEmail({ name, phone, email, subject, message });
            sendEmail({ to: notifyEmail, subject: emailSubject, html }).catch(console.error); // non-blocking
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
