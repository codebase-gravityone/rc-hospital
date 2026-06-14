import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
    try {
        await transporter.sendMail({
            from: `"R.C. Eye & Dental Hospital" <${process.env.SMTP_FROM}>`,
            to,
            subject,
            html,
        });
        console.log(`✉️ Email sent to ${to}: ${subject}`);
        return true;
    } catch (error) {
        console.error("Email send failed:", error);
        return false;
    }
}

// ── Email Templates ───────────────────────────────────────────

export function appointmentNotificationEmail(data: {
    patientName: string;
    phone: string;
    department: string;
    preferredDate: string;
}) {
    return {
        subject: `🏥 New Appointment: ${data.patientName} - ${data.department}`,
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
        <div style="background: #1a5f3a; padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 18px;">R.C. Eye & Dental Hospital</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">New Appointment Booking</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #111827; font-size: 16px; margin: 0 0 20px;">New appointment request received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; width: 120px;">Patient Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827; font-size: 14px;">${data.patientName}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827; font-size: 14px;"><a href="tel:${data.phone}" style="color: #1a5f3a; text-decoration: none;">${data.phone}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Department</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827; font-size: 14px;">${data.department}</td></tr>
            <tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Preferred Date</td><td style="padding: 10px 0; font-weight: 600; color: #111827; font-size: 14px;">${data.preferredDate}</td></tr>
          </table>
          <div style="margin-top: 24px;">
            <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display: inline-block; background: #25d366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 8px;">WhatsApp Patient</a>
            <a href="tel:${data.phone}" style="display: inline-block; background: #1a5f3a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">Call Patient</a>
          </div>
        </div>
        <div style="padding: 16px 32px; background: #f3f4f6; text-align: center; font-size: 11px; color: #9ca3af;">
          R.C. Eye & Dental Hospital, Bairaj Road, Bijnor | +91 8171742659
        </div>
      </div>
    `,
    };
}

export function contactLeadNotificationEmail(data: {
    name: string;
    phone: string;
    email?: string;
    subject?: string;
    message: string;
}) {
    return {
        subject: `📩 New Contact: ${data.name} - ${data.subject || "General Query"}`,
        html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
        <div style="background: #1a5f3a; padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 18px;">R.C. Eye & Dental Hospital</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">New Contact Form Submission</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #111827; font-size: 16px; margin: 0 0 20px;">New enquiry received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; width: 100px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827; font-size: 14px;">${data.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #111827; font-size: 14px;">${data.phone}</td></tr>
            ${data.email ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${data.email}</td></tr>` : ""}
            ${data.subject ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${data.subject}</td></tr>` : ""}
          </table>
          <div style="margin-top: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">${data.message}</p>
          </div>
          <div style="margin-top: 20px;">
            <a href="tel:${data.phone}" style="display: inline-block; background: #1a5f3a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">Call Back</a>
          </div>
        </div>
      </div>
    `,
    };
}
