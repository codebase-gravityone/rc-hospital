import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Shield, Clock, Users, Eye, Zap, Activity, Smile, Star, CheckCircle, Calendar } from "lucide-react";
import { SITE } from "@/lib/siteData";

export const metadata: Metadata = {
    title: "R.C. Eye & Dental Hospital – Best Eye Hospital in Bijnor",
    description: SITE.seo.defaultDescription,
};

export default function HomePage() {
    return (
        <>
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
                <Image src="/photos/Hospital.jpeg" alt="R.C. Eye & Dental Hospital Bijnor – Trusted Eye & Dental Care" fill priority className="object-cover opacity-40" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/30 to-gray-950/80" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-2 rounded-full border border-white/10 mb-8">
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                            R.C. Eye & Dental Hospital Bijnor
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
                            Complete Eye & Dental Care You Can <span className="text-emerald-400">Trust</span>
                        </h1>
                        <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-10">
                            Get advanced eye treatment and comprehensive dental care under one roof. Our experienced specialists use modern diagnostic technology and patient-focused care to help you and your family achieve better vision and oral health.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/book-appointment" className="inline-flex items-center gap-2 bg-[#1a5f3a] text-white px-7 py-4 rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all shadow-xl shadow-emerald-900/30">
                                Book Appointment <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-7 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-all">
                                <Phone className="w-4 h-4" /> {SITE.phone}
                            </a>
                        </div>
                    </div>
                </div>
                {/* Stats bar */}
                <div className="absolute bottom-0 inset-x-0 z-10 bg-white/5 backdrop-blur-lg border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[["10,000+", "Happy Patients"], ["20+", "Years Experience"], ["4.9★", "Google Rating"], ["24/7", "Emergency Care"]].map(([num, lbl]) => (
                            <div key={lbl} className="text-center">
                                <div className="text-white font-bold text-xl">{num}</div>
                                <div className="text-white/50 text-xs font-medium mt-0.5">{lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight mb-4">
                            Expert Care for Your Vision & Smile
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed">
                            Our experienced specialists offer a full range of eye and dental treatments, including cataract surgery, glaucoma management, pediatric eye care, dental consultations, and preventive care using advanced diagnostic equipment.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {[
                            { icon: Eye, title: "Cataract Surgery", desc: "Advanced no-stitch, no-injection robotic surgery with premium IOL options and same-day recovery for clearer vision.", slug: "cataract-surgery", color: "from-emerald-500 to-teal-600" },
                            { icon: Zap, title: "Laser Eye Treatment", desc: "Modern LASIK and PRK laser procedures for permanent freedom from glasses — customized for your unique eye profile.", slug: "laser-vision-correction", color: "from-blue-500 to-indigo-600" },
                            { icon: Activity, title: "Retina & Glaucoma Care", desc: "Specialized diagnosis and management of diabetic retinopathy, macular degeneration, and glaucoma to protect your vision.", slug: "retina-services", color: "from-violet-500 to-purple-600" },
                            { icon: Eye, title: "Cornea & Pediatric Eye Care", desc: "Expert corneal disease treatment, keratoconus management, and comprehensive children's eye health screening.", slug: "cornea-services", color: "from-amber-500 to-orange-600" },
                            { icon: Smile, title: "Complete Dental Services", desc: "Root canal, teeth whitening, dental restorations, cosmetic dentistry, and gum care by experienced dental specialist.", slug: "dental-care", color: "from-pink-500 to-rose-600" },
                            { icon: Shield, title: "Ayushman Bharat Facility", desc: "Eligible patients can access cashless eye and dental treatment through the Ayushman Bharat (PMJAY) scheme.", slug: "cataract-surgery", color: "from-emerald-500 to-green-600" },
                        ].map(({ icon: Icon, title, desc, slug, color }, i) => (
                            <Link
                                key={title}
                                href={`/services/${slug}`}
                                className="group relative p-7 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                {/* Hover gradient bg */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                                {/* Icon */}
                                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <Icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                                </div>

                                {/* Content */}
                                <h3 className="relative font-bold text-gray-900 text-lg mb-3 group-hover:text-gray-950 transition-colors">
                                    {title}
                                </h3>
                                <p className="relative text-gray-500 text-sm leading-relaxed mb-5">
                                    {desc}
                                </p>

                                {/* Arrow link */}
                                <span className="relative inline-flex items-center gap-1.5 text-[#1a5f3a] text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </span>

                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-12">
                        <Link href="/services" className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-7 py-3.5 rounded-full font-semibold text-sm hover:border-[#1a5f3a] hover:text-[#1a5f3a] hover:shadow-lg transition-all duration-300">
                            View All Services <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── ABOUT ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-3">About R.C. Eye & Dental Hospital</p>
                        <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight mb-5">
                            Trusted Eye & Dental Care for Bijnor Families
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed">
                            Committed to better vision, healthier smiles, and compassionate care since 2004.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-5 gap-10 items-start">
                        {/* Left — Image */}
                        <div className="lg:col-span-2">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <Image src="/photos/Hospital.jpeg" alt="R.C. Eye & Dental Hospital Bijnor – Trusted Healthcare Since 2004" width={600} height={700} className="w-full object-cover aspect-[3/4]" />
                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <div className="text-white text-3xl font-bold">20+</div>
                                    <div className="text-white/70 text-sm">Years Serving Bijnor</div>
                                </div>
                            </div>
                        </div>

                        {/* Right — Text + Trust */}
                        <div className="lg:col-span-3">
                            <p className="text-gray-600 text-[15px] leading-[1.8] mb-5">
                                R.C. Eye & Dental Hospital is one of the trusted healthcare institutions in Bijnor, committed to providing advanced eye and dental care with modern technology, experienced specialists, and a patient-first approach. Our mission is to help every patient achieve better vision, healthier smiles, and improved quality of life through accurate diagnosis and effective treatment.
                            </p>
                            <p className="text-gray-600 text-[15px] leading-[1.8] mb-5">
                                Established in the loving memory of <strong className="text-gray-900">Late Shri Rajesh Chand Agarwal</strong>, a respected advocate and distinguished personality of Bijnor, the hospital carries forward his values of integrity, compassion, and service to society.
                            </p>
                            <p className="text-gray-600 text-[15px] leading-[1.8] mb-8">
                                We combine advanced medical equipment, evidence-based treatments, and personalized care to ensure every patient receives safe, reliable, and comfortable healthcare.
                            </p>

                            {/* Trust Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                {[
                                    { icon: Zap, label: "Advanced Technology" },
                                    { icon: Users, label: "Experienced Specialists" },
                                    { icon: Shield, label: "Patient First Approach" },
                                    { icon: CheckCircle, label: "Affordable & Transparent" },
                                    { icon: Activity, label: "Hygienic Environment" },
                                    { icon: Star, label: "Ayushman Bharat" },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                                        <Icon className="w-4 h-4 text-[#1a5f3a] flex-shrink-0" strokeWidth={2} />
                                        <span className="text-gray-700 text-sm font-medium">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/about" className="inline-flex items-center gap-2 bg-[#1a5f3a] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all shadow-lg shadow-[#1a5f3a]/15">
                                Learn More About Us <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Founder + Director + Memorial */}
                    <div className="mt-20">
                        <div className="text-center mb-12">
                            <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Our Leadership</p>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">The People Behind Our Care</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {/* Founder */}
                            <div className="group bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-gray-100 group-hover:ring-[#1a5f3a]/20 transition-all">
                                    <Image src="/photos/Founder.png" alt="Mr. Abhay K. Agarwal – Founder, R.C. Eye & Dental Hospital Bijnor" width={128} height={128} className="w-full h-full object-cover object-top" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Mr. Abhay K. Agarwal</h4>
                                <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-wider mt-1">Founder</p>
                                <p className="text-gray-500 text-sm mt-2">Retired District Govt. Counsellor</p>
                            </div>
                            {/* Director */}
                            <div className="group bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg hover:border-gray-300 transition-all duration-300">
                                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-gray-100 group-hover:ring-[#1a5f3a]/20 transition-all">
                                    <Image src="/photos/Director.jpeg" alt="Mrs. Sadhna Agarwal – Director, R.C. Eye & Dental Hospital Bijnor" width={128} height={128} className="w-full h-full object-cover object-[center_25%]" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-lg">Mrs. Sadhna Agarwal</h4>
                                <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-wider mt-1">Director</p>
                                <p className="text-gray-500 text-sm mt-2">R.C. Eye & Dental Hospital</p>
                            </div>
                            {/* Memorial */}
                            <div className="group bg-amber-50/60 rounded-2xl border border-amber-200 p-8 text-center hover:shadow-lg hover:border-amber-300 transition-all duration-300">
                                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-amber-100 group-hover:ring-amber-200 transition-all opacity-90">
                                    <Image src="/photos/Late.png" alt="Late Shri Rajesh Chand Agarwal – In Loving Memory" width={128} height={128} className="w-full h-full object-cover object-top" />
                                </div>
                                <p className="text-amber-600 text-[9px] font-bold uppercase tracking-[2px]">In Loving Memory Of</p>
                                <h4 className="font-bold text-gray-900 text-lg mt-1">Late Shri R.C. Agarwal</h4>
                                <p className="text-gray-500 text-sm mt-2">A respected advocate of Bijnor and a well-known public figure admired for his integrity, dedication and service to society.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WHY CHOOSE US ─── */}
            <section className="py-20 md:py-28 bg-gray-950 relative overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white'/%3E%3C/svg%3E")` }} />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-[3px] mb-3">Why Patients Trust Us</p>
                        <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight leading-tight mb-5">
                            Why Choose R.C. Eye & Dental Hospital?
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed">
                            At R.C. Eye & Dental Hospital, we combine advanced medical technology, experienced specialists, and compassionate care to deliver the best possible outcomes for our patients.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            { title: "Advanced Diagnostic Technology", desc: "State-of-the-art diagnostic equipment for accurate evaluation and effective treatment planning.", icon: "🔬" },
                            { title: "Robotic Cataract Surgery", desc: "Advanced robotic-assisted cataract surgery for enhanced precision, safety, and faster recovery.", icon: "🤖" },
                            { title: "No Injection, No Stitch Surgery", desc: "Modern cataract procedures designed for greater comfort, minimal discomfort, and quicker healing.", icon: "✨" },
                            { title: "Advanced Laser Treatments", desc: "Latest laser technology for the treatment of various eye conditions with precision and efficiency.", icon: "⚡" },
                            { title: "Ayushman Bharat Facility", desc: "Eligible patients can avail treatment benefits under the Ayushman Bharat health scheme.", icon: "🏛️" },
                            { title: "Cashless Insurance Support", desc: "Hassle-free cashless treatment through supported health insurance providers.", icon: "💳" },
                        ].map(({ title, desc, icon }, i) => (
                            <div
                                key={title}
                                className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.08] hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-3xl mb-5">{icon}</div>
                                <h3 className="font-bold text-white text-base mb-3">{title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Promise */}
                    <div className="mt-14 text-center">
                        <div className="inline-flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-full px-8 py-4">
                            <span className="text-emerald-400 text-sm font-bold">Our Promise:</span>
                            <span className="text-white/70 text-sm">Expert Care • Advanced Technology • Trusted Results</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-4 max-w-lg mx-auto">
                            Delivering quality eye and dental healthcare with a focus on patient safety, comfort, and long-term well-being.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── DOCTORS ─── */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-3">Our Specialists</p>
                        <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">Meet Our Expert Doctors</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Dr. Rachit */}
                        <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Top: Photo + Name */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-36 h-40 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                                    <Image src="/photos/Owner.jpeg" alt="Dr. Rachit Agarwal – Senior Eye Surgeon" width={80} height={96} className="w-full h-full object-cover object-top" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a5f3a] bg-[#1a5f3a]/5 px-2 py-0.5 rounded">Eye Specialist</span>
                                    <h3 className="font-bold text-gray-900 text-lg mt-1">Dr. Rachit Agarwal</h3>
                                    <p className="text-[#1a5f3a] font-semibold text-sm">Senior Eye Surgeon</p>
                                    <p className="text-gray-500 text-xs">Cornea & Refractive Surgery Specialist</p>
                                </div>
                            </div>
                            {/* Stats */}
                            <div className="flex gap-6 mb-4 pb-4 border-b border-gray-100">
                                {[["10,000+", "Surgeries"], ["500+", "Transplants"], ["10+", "Years"]].map(([n, l]) => (
                                    <div key={l}>
                                        <div className="text-lg font-bold text-[#1a5f3a]">{n}</div>
                                        <div className="text-gray-400 text-[10px] font-medium">{l}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Bio */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Dedicated to world-class eye care with advanced technology and surgical excellence. Over a decade of experience restoring vision for thousands.
                            </p>
                            {/* Qualifications */}
                            <div className="space-y-1.5 mb-5">
                                {[["MBBS", "UCMS & GTB Hospital, Delhi"], ["MS Ophthalmology", "S.N. Medical College, Agra"], ["Fellowship", "Cornea & Refractive Surgery, Chitrakoot"]].map(([d, c]) => (
                                    <div key={d} className="flex items-start gap-2 text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a5f3a] mt-1.5 flex-shrink-0" />
                                        <span><strong className="text-gray-800">{d}</strong> — <span className="text-gray-500">{c}</span></span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a5f3a] text-white px-5 py-2.5 rounded-full font-semibold text-xs hover:bg-[#28845a] transition-all">
                                Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Dr. Surbhi */}
                        <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Top: Photo + Name */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-36 h-40 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                                    <Image src="/photos/Surbhi.jpeg" alt="Dr. Surbhi R Agarwal – Senior Dentist" width={80} height={96} className="w-full h-full object-cover object-center" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-0.5 rounded">Dental Specialist</span>
                                    <h3 className="font-bold text-gray-900 text-lg mt-1">Dr. Surbhi R Agarwal</h3>
                                    <p className="text-pink-500 font-semibold text-sm">Senior Dentist</p>
                                    <p className="text-gray-500 text-xs">BDS — IDEAS Dental College, Gwalior</p>
                                </div>
                            </div>
                            {/* Expertise tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-gray-100">
                                {["Root Canal", "Whitening", "Cosmetic", "Gum Care", "Extractions", "Restorations"].map((t) => (
                                    <span key={t} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100">{t}</span>
                                ))}
                            </div>
                            {/* Bio */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Gentle, ethical, and high-quality dental care for healthy smiles and long-term oral wellness.
                            </p>
                            {/* Qualifications */}
                            <div className="space-y-1.5 mb-5">
                                {[["BDS", "IDEAS Dental College, Gwalior"], ["Tutor", "MPCT Dental College, Gwalior"], ["Senior Dentist", "Tandon Dental Clinic, Gwalior"], ["Senior Dentist", "R.C. Multispeciality Hospital, Bijnor"]].map(([d, c]) => (
                                    <div key={c} className="flex items-start gap-2 text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                                        <span><strong className="text-gray-800">{d}</strong> — <span className="text-gray-500">{c}</span></span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/contact" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-semibold text-xs hover:bg-gray-800 transition-all">
                                Book Consultation <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-3">Testimonials</p>
                        <h2 className="text-3xl md:text-[40px] font-bold text-gray-900 tracking-tight leading-tight">What Our Patients Say</h2>
                    </div>

                    {/* Testimonial Marquee */}
                    <div className="relative overflow-hidden mb-12">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

                        <div className="flex gap-5 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] w-max">
                            {[
                                { emoji: "👴", name: "Ramesh Kumar", city: "Bijnor", text: "My cataract surgery was painless and the vision improved the next day. Very good care and support from the whole team." },
                                { emoji: "👵", name: "Savitri Devi", city: "Najibabad", text: "Very clean hospital with advanced machines. Doctors explained everything clearly. Highly satisfied with treatment." },
                                { emoji: "👨", name: "Ankit Agarwal", city: "Dhampur", text: "I got LASIK done here. Now my vision is clear and I am free from glasses. Very modern and professional hospital." },
                                { emoji: "👩", name: "Pooja Sharma", city: "Kiratpur", text: "My mother's cataract surgery was very smooth. Staff is very cooperative and caring." },
                                { emoji: "👩", name: "Pallavi Sarvaniya", city: "Bijnor", text: "I had a wonderful experience at R.C Eye and Dental Hospital. The staff was friendly and helpful. Highly recommend this hospital for anyone needing eye and dental care." },
                                { emoji: "👨", name: "Indrapal Singh", city: "Bijnor", text: "I underwent cataract operation. Excellent service. No pain. Doctor is so good natured, supportive and always motivates you. That is the best part." },
                                { emoji: "👨", name: "Rahul Kumar", city: "Bijnor", text: "Dr Rachit Agarwal is a great ophthalmologist in this region. He takes care of all eye related issues very carefully and the hospital staff is also very helpful." },
                                { emoji: "👴", name: "Ramesh Kumar", city: "Bijnor", text: "My cataract surgery was painless and the vision improved the next day. Very good care and support from the whole team." },
                                { emoji: "👵", name: "Savitri Devi", city: "Najibabad", text: "Very clean hospital with advanced machines. Doctors explained everything clearly. Highly satisfied with treatment." },
                                { emoji: "👨", name: "Ankit Agarwal", city: "Dhampur", text: "I got LASIK done here. Now my vision is clear and I am free from glasses. Very modern and professional hospital." },
                                { emoji: "👩", name: "Pooja Sharma", city: "Kiratpur", text: "My mother's cataract surgery was very smooth. Staff is very cooperative and caring." },
                                { emoji: "👩", name: "Pallavi Sarvaniya", city: "Bijnor", text: "I had a wonderful experience at R.C Eye and Dental Hospital. The staff was friendly and helpful. Highly recommend this hospital for anyone needing eye and dental care." },
                                { emoji: "👨", name: "Indrapal Singh", city: "Bijnor", text: "I underwent cataract operation. Excellent service. No pain. Doctor is so good natured, supportive and always motivates you. That is the best part." },
                                { emoji: "👨", name: "Rahul Kumar", city: "Bijnor", text: "Dr Rachit Agarwal is a great ophthalmologist in this region. He takes care of all eye related issues very carefully and the hospital staff is also very helpful." },
                            ].map((t, i) => (
                                <div key={`${t.name}-${i}`} className="bg-white rounded-2xl border border-gray-100 p-6 w-[320px] flex-shrink-0 hover:shadow-lg transition-shadow">
                                    <div className="flex gap-0.5 mb-3">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 italic line-clamp-4">
                                        &ldquo;{t.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-base">
                                            {t.emoji}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                                            <div className="text-gray-400 text-xs">{t.city}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Google Review Bar */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                        {/* Rating */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <span className="text-3xl font-black bg-gradient-to-br from-[#4285f4] via-[#ea4335] to-[#34a853] bg-clip-text text-transparent">G</span>
                            <div>
                                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Google Rating</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-2xl font-bold text-gray-900">4.9</span>
                                    <div>
                                        <div className="text-amber-400 text-sm">★★★★★</div>
                                        <div className="text-gray-400 text-xs">(210+ Reviews)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mini Reviews */}
                        <div className="flex-1 grid sm:grid-cols-2 gap-4 w-full">
                            {[
                                { initials: "SG", text: "Excellent treatment, modern equipment and very supportive staff." },
                                { initials: "NV", text: "Best hospital for eye care in Bijnor. Doctors are very experienced." },
                            ].map((r) => (
                                <div key={r.initials} className="flex items-start gap-3 pl-4 sm:border-l border-gray-100">
                                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold flex-shrink-0">
                                        {r.initials}
                                    </div>
                                    <div>
                                        <div className="text-amber-400 text-xs mb-1">★★★★★</div>
                                        <p className="text-gray-500 text-xs leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Read Reviews Button */}
                        <a
                            href="https://share.google/Ux6upkkddBqLumEs1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full text-xs font-semibold hover:bg-gray-800 transition-all"
                        >
                            Read All Reviews <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 bg-[#1a5f3a] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='white'/%3E%3C/svg%3E")` }} />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">Ready for better vision?</h2>
                    <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">Book a consultation with our experts today. Early care makes all the difference.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/book-appointment" className="inline-flex items-center gap-2 bg-white text-[#1a5f3a] px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all shadow-xl">
                            <Calendar className="w-4 h-4" /> Book Appointment
                        </Link>
                        <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-all">
                            <Phone className="w-4 h-4" /> Call Now
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
