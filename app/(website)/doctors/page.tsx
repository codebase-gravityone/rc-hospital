import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Our Doctors", description: "Dr. Rachit Agarwal (Eye Surgeon) & Dr. Surbhi Agarwal (Dentist) at R.C. Eye & Dental Hospital Bijnor." };

export default function DoctorsPage() {
    return (
        <>
            <section className="pt-32 pb-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6"><p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Our Team</p><h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Specialists</h1></div></section>
            {/* Dr Rachit */}
            <section className="py-20"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative rounded-3xl overflow-hidden h-[500px]"><Image src="/photos/Owner.jpeg" alt="Dr. Rachit Agarwal" fill className="object-cover object-top" /></div>
                <div>
                    <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Eye Specialist</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Dr. Rachit Agarwal</h2>
                    <p className="text-[#1a5f3a] font-medium mb-1">Senior Eye Surgeon</p>
                    <p className="text-gray-500 text-sm mb-6">Cornea & Refractive Surgery Specialist</p>
                    <p className="text-gray-600 leading-relaxed mb-6">Dedicated to world-class eye care with advanced technology and a patient-first approach. Over a decade of experience restoring vision for thousands.</p>
                    <div className="space-y-2 mb-6">{[["MBBS", "UCMS & GTB Hospital, Delhi"], ["MS Ophthalmology", "S.N. Medical College, Agra"], ["Fellowship", "Cornea & Refractive Surgery, Sadguru Netra Chikitsalaya"]].map(([d, c]) => <div key={d} className="flex items-start gap-3 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#1a5f3a] mt-2 flex-shrink-0" /><span><strong className="text-gray-900">{d}</strong> — <span className="text-gray-500">{c}</span></span></div>)}</div>
                    <div className="flex gap-8 mb-8">{[["10,000+", "Surgeries"], ["500+", "Transplants"], ["10+", "Years"]].map(([n, l]) => <div key={l}><div className="text-2xl font-bold text-[#1a5f3a]">{n}</div><div className="text-gray-400 text-xs">{l}</div></div>)}</div>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a5f3a] text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all">Book Consultation <ArrowRight className="w-4 h-4" /></Link>
                </div>
            </div></section>
            {/* Dr Surbhi */}
            <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="lg:order-2 relative rounded-3xl overflow-hidden h-[500px]"><Image src="/photos/Surbhi.jpeg" alt="Dr. Surbhi R Agarwal" fill className="object-cover object-top" /></div>
                <div className="lg:order-1">
                    <p className="text-pink-500 text-xs font-bold uppercase tracking-[3px] mb-2">Dental Specialist</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Dr. Surbhi R Agarwal</h2>
                    <p className="text-pink-500 font-medium mb-1">Senior Dentist</p>
                    <p className="text-gray-500 text-sm mb-6">BDS — IDEAS Dental College, Gwalior</p>
                    <p className="text-gray-600 leading-relaxed mb-6">Gentle, ethical, and high-quality dental care for healthy smiles and long-term oral wellness.</p>
                    <div className="space-y-2 mb-6">{[["BDS", "IDEAS Dental College, Gwalior"], ["Tutor", "MPCT Dental College, Gwalior"], ["Senior Dentist", "Tandon Dental Clinic, Gwalior"], ["Senior Dentist", "R.C. Multispeciality Hospital, Bijnor"]].map(([d, c]) => <div key={c} className="flex items-start gap-3 text-sm"><span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" /><span><strong className="text-gray-900">{d}</strong> — <span className="text-gray-500">{c}</span></span></div>)}</div>
                    <div className="flex flex-wrap gap-2 mb-8">{["Root Canal", "Whitening", "Cosmetic", "Gum Care", "Extractions", "Restorations"].map(t => <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">{t}</span>)}</div>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all">Book Consultation <ArrowRight className="w-4 h-4" /></Link>
                </div>
            </div></section>
        </>
    );
}
