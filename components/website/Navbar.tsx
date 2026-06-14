"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, ArrowRight, Eye, Zap, Activity, Shield, Circle, Baby, Smile } from "lucide-react";
import { SITE } from "@/lib/siteData";

const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
        label: "Services", href: "/services", children: [
            { label: "Cataract Surgery", href: "/services/cataract-surgery" },
            { label: "Laser Vision", href: "/services/laser-vision-correction" },
            { label: "Retina Services", href: "/services/retina-services" },
            { label: "Glaucoma Care", href: "/services/glaucoma-care" },
            { label: "Cornea Services", href: "/services/cornea-services" },
            { label: "Pediatric Eye", href: "/services/pediatric-eye-care" },
            { label: "Dental Care", href: "/services/dental-care" },
        ]
    },
    { label: "Doctors", href: "/doctors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const megaMenuItems = [
    { icon: Eye, label: "Cataract Surgery", desc: "No-stitch robotic surgery with premium IOLs", href: "/services/cataract-surgery" },
    { icon: Zap, label: "Laser Eye Treatment", desc: "LASIK & PRK for freedom from glasses", href: "/services/laser-vision-correction" },
    { icon: Activity, label: "Retina Services", desc: "Diabetic retinopathy & retinal care", href: "/services/retina-services" },
    { icon: Shield, label: "Glaucoma Care", desc: "Early detection & pressure management", href: "/services/glaucoma-care" },
    { icon: Circle, label: "Cornea Services", desc: "Transplant & infection treatment", href: "/services/cornea-services" },
    { icon: Baby, label: "Pediatric Eye Care", desc: "Squint, lazy eye & children's vision", href: "/services/pediatric-eye-care" },
    { icon: Smile, label: "Dental Care", desc: "Root canal, whitening & cosmetic dentistry", href: "/services/dental-care" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    useEffect(() => setOpen(false), [pathname]);

    const isHome = pathname === "/";
    const solid = scrolled || !isHome;

    return (
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${solid ? "bg-[#494F5D]/85 backdrop-blur-xl shadow-lg border-b border-white/10" : "bg-[#494F5D]/60 backdrop-blur-md"}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#1a5f3a] flex items-center justify-center">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="white" /></svg>
                    </div>
                    <div>
                        <span className={`font-semibold text-[15px] tracking-tight ${solid ? "text-white" : "text-white"}`}>R.C. Eye & Dental</span>
                        <span className={`block text-[10px] font-medium tracking-wider uppercase ${solid ? "text-white/50" : "text-white/50"}`}>Bijnor</span>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {links.map((l) => l.children ? (
                        <div key={l.href} className="relative group">
                            <button className={`flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${solid ? (pathname.startsWith(l.href) ? "text-emerald-400 bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10") : (pathname.startsWith(l.href) ? "text-emerald-400 bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10")}`}>
                                {l.label}<ChevronDown className="w-3 h-3 ml-0.5 transition-transform group-hover:rotate-180" />
                            </button>
                            {/* Mega Menu */}
                            <div className="absolute top-full -left-40 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 p-6 w-[540px]">
                                    <div className="grid grid-cols-2 gap-2">
                                        {megaMenuItems.map((item) => (
                                            <Link key={item.href} href={item.href} className={`flex items-start gap-3 p-3 rounded-xl transition-all hover:bg-gray-50 group/item ${pathname === item.href ? "bg-[#1a5f3a]/5" : ""}`}>
                                                <div className="w-9 h-9 rounded-lg bg-[#1a5f3a]/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#1a5f3a] transition-colors">
                                                    <item.icon className="w-4 h-4 text-[#1a5f3a] group-hover/item:text-white transition-colors" strokeWidth={2} />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-[13px] leading-tight">{item.label}</div>
                                                    <div className="text-gray-400 text-[11px] mt-0.5 leading-snug">{item.desc}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <Link href="/services" className="text-[#1a5f3a] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                                            View all services <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link key={l.href} href={l.href} className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${solid ? (pathname === l.href ? "text-emerald-400 bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10") : (pathname === l.href ? "text-emerald-400 bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10")}`}>{l.label}</Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <a href={`tel:${SITE.phone}`} className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all ${solid ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/20" : "bg-white/10 text-white border border-white/20 hover:bg-white/20"}`}>
                        <Phone className="w-3.5 h-3.5" />{SITE.phone}
                    </a>
                    <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${solid ? "text-white" : "text-white"}`} aria-label="Menu">
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile */}
            {open && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top-2">
                    <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
                        {links.map((l) => (
                            <Link key={l.href} href={l.href} className={`block px-4 py-3 rounded-xl text-sm font-medium ${pathname === l.href ? "text-[#1a5f3a] bg-[#1a5f3a]/5" : "text-gray-700 hover:bg-gray-50"}`}>{l.label}</Link>
                        ))}
                        <a href={`tel:${SITE.phone}`} className="flex items-center justify-center gap-2 mt-4 w-full py-3.5 bg-[#1a5f3a] text-white rounded-xl font-semibold text-sm">
                            <Phone className="w-4 h-4" />{SITE.phone}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
