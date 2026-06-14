"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, CheckCircle, Loader2, Calendar, User, Stethoscope, MessageSquare, Clock, Shield, MapPin } from "lucide-react";
import { SITE } from "@/lib/siteData";
import { toast } from "sonner";

export default function BookAppointmentPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const today = new Date().toISOString().split("T")[0];

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const f = e.currentTarget;
        const data = {
            patientName: (f.elements.namedItem("name") as HTMLInputElement).value,
            phone: (f.elements.namedItem("phone") as HTMLInputElement).value,
            department: (f.elements.namedItem("dept") as HTMLSelectElement).value,
            preferredDate: (f.elements.namedItem("date") as HTMLInputElement).value,
            message: (f.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
        };
        try {
            const r = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
            if (r.ok) { setSuccess(true); toast.success("Appointment booked successfully!"); }
            else toast.error("Something went wrong. Please try again.");
        } catch { toast.error("Network error."); }
        finally { setLoading(false); }
    }

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-3">Book Appointment</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Schedule Your Visit</h1>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">Fill in the form below and our team will confirm your appointment within 30 minutes during OPD hours.</p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                                {success ? (
                                    <div className="text-center py-16">
                                        <CheckCircle className="w-16 h-16 text-[#1a5f3a] mx-auto mb-5" />
                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Appointment Requested!</h2>
                                        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Thank you! Our team will call you within 30 minutes to confirm your appointment time.</p>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            <button onClick={() => setSuccess(false)} className="px-6 py-3 bg-[#1a5f3a] text-white rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all">Book Another</button>
                                            <Link href="/" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all">Go to Home</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">Request Appointment</h2>
                                        <p className="text-gray-500 text-sm mb-6">All fields marked * are required.</p>
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input type="text" name="name" required placeholder="Full Name *" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all" />
                                                </div>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input type="tel" name="phone" required placeholder="Phone Number *" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all" />
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <select name="dept" required defaultValue="" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all appearance-none cursor-pointer">
                                                    <option value="" disabled>Select Department *</option>
                                                    <option value="eye">Eye Care (Ophthalmology)</option>
                                                    <option value="cataract">Cataract / Laser Surgery</option>
                                                    <option value="retina">Retina Services</option>
                                                    <option value="glaucoma">Glaucoma Care</option>
                                                    <option value="cornea">Cornea Services</option>
                                                    <option value="pediatric">Pediatric Eye Care</option>
                                                    <option value="dental">Dental Care</option>
                                                </select>
                                            </div>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input type="date" name="date" required min={today} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all" />
                                            </div>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                                <textarea name="message" rows={3} placeholder="Any specific concern or message (optional)" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 transition-all resize-none" />
                                            </div>
                                            <button type="submit" disabled={loading} className="w-full py-4 bg-[#1a5f3a] text-white rounded-xl font-semibold text-sm hover:bg-[#28845a] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Calendar className="w-4 h-4" /> Confirm Appointment</>}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-2 space-y-5">
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Why Book With Us?</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: Clock, text: "Confirmed within 30 minutes" },
                                        { icon: Shield, text: "Ayushman Bharat & cashless insurance" },
                                        { icon: Stethoscope, text: "Expert specialist consultation" },
                                        { icon: Calendar, text: "Flexible scheduling" },
                                    ].map(({ icon: Icon, text }) => (
                                        <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                                            <Icon className="w-4 h-4 text-[#1a5f3a] flex-shrink-0" />{text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-900 rounded-2xl p-6 text-white">
                                <h3 className="font-bold mb-1">Prefer to Call?</h3>
                                <p className="text-white/60 text-sm mb-4">Our reception is available during OPD hours</p>
                                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-xl font-bold text-[#4ade80] hover:text-[#86efac] transition-colors">
                                    <Phone className="w-5 h-5" />{SITE.phone}
                                </a>
                                <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/50">
                                    <p>Mon – Sat: 10:00 AM – 6:00 PM</p>
                                    <p>Sunday: 10:00 AM – 2:00 PM</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1a5f3a]" /> Location</h3>
                                <p className="text-gray-500 text-sm">Opp. Vaishno Vihar, Bairaj Road,<br />Bijnor, Uttar Pradesh – 246701</p>
                                <a href="https://maps.google.com/?q=R.C.+EYE+%26+DENTAL+HOSPITAL+Bijnor" target="_blank" rel="noopener noreferrer" className="text-[#1a5f3a] text-xs font-semibold mt-3 inline-block hover:underline">
                                    Get Directions →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
