import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "About Us", description: "Learn about R.C. Eye & Dental Hospital Bijnor – our history, mission, and team." };

export default function AboutPage() {
    return (
        <>
            <section className="pt-32 pb-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6"><p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">About Us</p><h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Story</h1></div></section>
            <section className="py-20"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div><Image src="/photos/Hospital.jpeg" alt="Hospital" width={700} height={500} className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]" /></div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">A Trusted Name in Advanced Eye Care in Bijnor</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">R.C. Eye & Dental Hospital is dedicated to providing world-class eye treatment with modern technology, experienced doctors, and compassionate patient care.</p>
                    <p className="text-gray-600 leading-relaxed mb-4">Named in loving memory of <strong>Late Shri Rajesh Chand Agarwal</strong>, a respected advocate of Bijnor admired for his integrity and service.</p>
                    <p className="text-gray-600 leading-relaxed mb-8">Our aim is to combine modern medical technology with compassionate patient care so every patient receives trustworthy treatment.</p>
                    <div className="grid grid-cols-2 gap-3">{["Advanced Technology", "20+ Years Legacy", "Ayushman Bharat", "Expert Specialists", "Modern Equipment", "Cashless Insurance"].map(i => <div key={i} className="flex items-center gap-2 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-[#1a5f3a]" />{i}</div>)}</div>
                </div>
            </div></section>
            <section className="py-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our People</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[{ name: "Mr. Abhay K. Agarwal", role: "Founder", sub: "Retired District Govt. Counsellor", photo: "/photos/Founder.png" }, { name: "Mrs. Sadhna Agarwal", role: "Director", sub: "R.C. Eye & Dental Hospital", photo: "/photos/Director.jpeg" }, { name: "Late Shri R.C. Agarwal", role: "In Loving Memory", sub: "Respected Advocate of Bijnor", photo: "/photos/Late.png" }].map(p => (
                        <div key={p.name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all text-center">
                            <div className="h-56 overflow-hidden bg-gray-100"><Image src={p.photo} alt={p.name} width={400} height={224} className="w-full h-full object-cover object-top" /></div>
                            <div className="p-6"><h3 className="font-bold text-gray-900">{p.name}</h3><p className="text-[#1a5f3a] text-sm font-medium">{p.role}</p><p className="text-gray-500 text-xs mt-1">{p.sub}</p></div>
                        </div>
                    ))}
                </div>
            </div></section>
            <section className="py-20 bg-[#1a5f3a] text-center"><div className="max-w-2xl mx-auto px-6"><h2 className="text-3xl font-bold text-white mb-4">Ready to visit?</h2><p className="text-white/70 mb-8">Book your appointment today.</p><Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#1a5f3a] px-7 py-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition-all">Book Appointment <ArrowRight className="w-4 h-4" /></Link></div></section>
        </>
    );
}
