"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Calendar, Image, Stethoscope, MessageSquare, Settings, Globe, BarChart3, FileText, Send, Mail
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Appointments", href: "/admin/appointments", icon: Calendar },
    { label: "Contact Leads", href: "/admin/contact-leads", icon: Mail },
    { label: "Services Editor", href: "/admin/services-editor", icon: Stethoscope },
    { label: "Gallery", href: "/admin/gallery", icon: Image },
    { label: "Blog / Articles", href: "/admin/blog", icon: FileText },
    { label: "SEO Settings", href: "/admin/seo", icon: Globe },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "WhatsApp", href: "/admin/whatsapp", icon: Send },
    { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-950 text-white flex flex-col min-h-screen flex-shrink-0 hidden md:flex">
            <div className="p-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1a5f3a] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="white" /></svg>
                    </div>
                    <div>
                        <div className="font-semibold text-sm leading-tight">RC Eye Hospital</div>
                        <div className="text-[#1a5f3a] text-[9px] font-bold tracking-wider uppercase">Admin Panel</div>
                    </div>
                </div>
            </div>

            <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all
                ${active ? "bg-[#1a5f3a] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-white/10">
                <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 text-xs font-medium transition-all">
                    <Globe className="w-3.5 h-3.5" /> View Website ↗
                </Link>
            </div>
        </aside>
    );
}
