"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, Clock, Mail, CheckCircle, Loader2 } from "lucide-react";
import { SITE } from "@/lib/siteData";
import { toast } from "sonner";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); setLoading(true);
        const f = e.currentTarget;
        const data = { patientName: (f.elements.namedItem("name") as HTMLInputElement).value, phone: (f.elements.namedItem("phone") as HTMLInputElement).value, department: (f.elements.namedItem("dept") as HTMLSelectElement).value, preferredDate: (f.elements.namedItem("date") as HTMLInputElement).value };
        try { const r = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (r.ok) { setSuccess(true); toast.success("Appointment requested!"); } else toast.error("Error. Try again."); } catch { toast.error("Network error."); } finally { setLoading(false); }
    }

    return (
        <>
            <section className="pt-32 pb-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6"><p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Contact</p><h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Get in touch</h1><p className="text-gray-500 mt-4 max-w-xl">Book an appointment or reach out for any queries.</p></div></section>

            <section className="py-16"><div className="max-w-7xl mx-auto px-6">
                {/* Info cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {[{ icon: Phone, title: "Phone", val: SITE.phone, href: `tel:${SITE.phone}` }, { icon: Mail, title: "Email", val: "rceyehospital@gmail.com", href: "mailto:rceyehospital@gmail.com" }, { icon: MapPin, title: "Address", val: "Bairaj Road, Bijnor – 246701", href: "#map" }, { icon: Clock, title: "Hours", val: "Mon–Sat: 10am–6pm", href: "#book" }].map(({ icon: Icon, title, val, href }) => (
                        <a key={title} href={href} className="group p-6 rounded-2xl border border-gray-100 hover:border-[#1a5f3a]/20 hover:shadow-lg transition-all">
                            <div className="w-11 h-11 rounded-xl bg-[#1a5f3a]/5 flex items-center justify-center mb-4 group-hover:bg-[#1a5f3a] transition-colors"><Icon className="w-5 h-5 text-[#1a5f3a] group-hover:text-white transition-colors" strokeWidth={1.5} /></div>
                            <div className="font-semibold text-gray-900 text-sm mb-0.5">{title}</div>
                            <div className="text-gray-500 text-sm">{val}</div>
                        </a>
                    ))}
                </div>

                {/* Form + Map */}
                <div className="grid lg:grid-cols-2 gap-10" id="book">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        {success ? (
                            <div className="text-center py-16"><CheckCircle className="w-14 h-14 text-[#1a5f3a] mx-auto mb-4" /><h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3><p className="text-gray-500 text-sm mb-6">We&apos;ll call you to confirm the time.</p><button onClick={() => setSuccess(false)} className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold">Book Another</button></div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input type="text" name="name" required placeholder="Full Name *" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all" />
                                    <input type="tel" name="phone" required placeholder="Phone *" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all" />
                                </div>
                                <select name="dept" required defaultValue="" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all appearance-none">
                                    <option value="" disabled>Select Department *</option>
                                    <option value="eye">Eye Care</option><option value="cataract">Cataract/Laser</option><option value="retina">Retina</option><option value="dental">Dental</option><option value="pediatric">Pediatric Eye</option>
                                </select>
                                <input type="date" name="date" required min={today} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all" />
                                <button type="submit" disabled={loading} className="w-full py-4 bg-[#1a5f3a] text-white rounded-xl font-semibold text-sm hover:bg-[#28845a] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</> : "Confirm Appointment"}
                                </button>
                            </form>
                        )}
                    </div>
                    <div id="map" className="rounded-2xl overflow-hidden border border-gray-200 min-h-[400px]">
                        <iframe src={SITE.googleMapsUrl} width="100%" height="100%" style={{ border: 0, minHeight: 400 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location" />
                    </div>
                </div>
            </div></section>
        </>
    );
}
