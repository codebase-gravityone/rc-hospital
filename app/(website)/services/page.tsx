import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Zap, Activity, Shield, Circle, Baby, Smile, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Our Services", description: "Complete eye and dental care in Bijnor — Cataract, LASIK, Retina, Glaucoma, Cornea, Pediatric Eye, Dental." };

const services = [
    { slug: "cataract-surgery", title: "Cataract Surgery", desc: "Advanced robotic no-stitch surgery with premium IOL options and same-day recovery.", icon: Eye },
    { slug: "laser-vision-correction", title: "Laser Vision Correction", desc: "LASIK and PRK for permanent freedom from glasses and contact lenses.", icon: Zap },
    { slug: "retina-services", title: "Retina Services", desc: "Treatment for diabetic retinopathy, retinal injections, and complex retinal conditions.", icon: Activity },
    { slug: "glaucoma-care", title: "Glaucoma Care", desc: "Early detection, IOP management, laser therapy, and surgical options.", icon: Shield },
    { slug: "cornea-services", title: "Cornea Services", desc: "Expert cornea treatment and transplant by fellowship-trained specialist.", icon: Circle },
    { slug: "pediatric-eye-care", title: "Pediatric Eye Care", desc: "Squint correction, amblyopia treatment, and comprehensive vision screening for children.", icon: Baby },
    { slug: "dental-care", title: "Dental Care", desc: "Complete dental solutions — root canal, whitening, restorations, cosmetic dentistry.", icon: Smile },
];

export default function ServicesPage() {
    return (
        <>
            <section className="pt-32 pb-20 bg-gray-50"><div className="max-w-7xl mx-auto px-6"><p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Services</p><h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Specialities</h1><p className="text-gray-500 mt-4 max-w-xl">Comprehensive eye and dental care under one roof.</p></div></section>
            <section className="py-20"><div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(({ slug, title, desc, icon: Icon }) => (
                    <Link key={slug} href={`/services/${slug}`} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#1a5f3a]/20 hover:shadow-xl hover:shadow-[#1a5f3a]/5 transition-all duration-300 hover:-translate-y-1 bg-white">
                        <div className="w-14 h-14 rounded-2xl bg-[#1a5f3a]/5 flex items-center justify-center mb-6 group-hover:bg-[#1a5f3a] transition-colors"><Icon className="w-7 h-7 text-[#1a5f3a] group-hover:text-white transition-colors" strokeWidth={1.5} /></div>
                        <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
                        <span className="text-[#1a5f3a] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">Learn More <ArrowRight className="w-4 h-4" /></span>
                    </Link>
                ))}
            </div></section>
        </>
    );
}
