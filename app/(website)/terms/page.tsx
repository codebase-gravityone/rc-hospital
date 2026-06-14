import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions", description: "Terms and Conditions for R.C. Eye & Dental Hospital Bijnor website." };

export default function TermsPage() {
    return (
        <section className="pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
                <div className="prose prose-gray prose-sm max-w-none space-y-4 text-gray-600 leading-relaxed">
                    <p><strong>Last updated:</strong> June 2026</p>
                    <p>By using the R.C. Eye & Dental Hospital website (rceyebijnor.com), you agree to the following terms.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Appointment Booking</h2>
                    <ul className="list-disc pl-5 space-y-1"><li>Online appointment requests are subject to confirmation by our team</li><li>We will contact you within 30 minutes during OPD hours to confirm</li><li>Appointments may be rescheduled based on doctor availability</li></ul>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Medical Disclaimer</h2>
                    <p>Information on this website is for general awareness only and does not constitute medical advice. Always consult a qualified doctor for diagnosis and treatment.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Website Usage</h2>
                    <ul className="list-disc pl-5 space-y-1"><li>Content on this website is owned by R.C. Eye & Dental Hospital</li><li>Unauthorized reproduction or commercial use is prohibited</li><li>We reserve the right to modify content without prior notice</li></ul>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Limitation of Liability</h2>
                    <p>R.C. Eye & Dental Hospital is not liable for any damages arising from the use of this website. Treatment outcomes vary by individual and are not guaranteed.</p>
                    <h2 className="text-lg font-bold text-gray-900 mt-6">Governing Law</h2>
                    <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Bijnor, Uttar Pradesh.</p>
                </div>
            </div>
        </section>
    );
}
