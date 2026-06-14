import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy Policy of R.C. Eye & Dental Hospital Bijnor." };

export default function PrivacyPolicyPage() {
    return (
        <section className="pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-gray prose-sm max-w-none space-y-4 text-gray-600 leading-relaxed">
                    <p><strong>Last updated:</strong> June 2026</p>
                    <p>R.C. Eye & Dental Hospital (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of our patients and website visitors. This Privacy Policy describes how we collect, use, and safeguard your personal information.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Information We Collect</h2>
                    <ul className="list-disc pl-5 space-y-1"><li>Name, phone number, and email address when you book an appointment or submit a contact form</li><li>Medical information relevant to your treatment (collected in-person only)</li><li>Website usage data through Google Analytics (anonymized)</li></ul>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-1"><li>To confirm and manage your appointments</li><li>To communicate about your treatment and follow-up care</li><li>To improve our website and services</li><li>To send appointment reminders (via phone/WhatsApp)</li></ul>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Data Security</h2>
                    <p>We implement appropriate security measures to protect your personal information. Patient medical records are kept strictly confidential in accordance with applicable healthcare regulations.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Third-Party Services</h2>
                    <p>We use Google Analytics for website traffic analysis, Cloudinary for image hosting, and Neon for secure database storage. These services have their own privacy policies.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Your Rights</h2>
                    <p>You may request to view, update, or delete your personal information by contacting us at +91 8171742659 or visiting our hospital.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Contact</h2>
                    <p>R.C. Eye & Dental Hospital<br />Opp. Vaishno Vihar, Bairaj Road, Bijnor, UP – 246701<br />Phone: +91 8171742659</p>
                </div>
            </div>
        </section>
    );
}
