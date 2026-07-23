"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Calendar, Image, Stethoscope, Settings, Globe, BarChart3, FileText, Send, Mail, Menu, X
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
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile sidebar on route change
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    const sidebarContent = (
        <>
            <div className="p-5 border-b border-white/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="white" /></svg>
                        </div>
                        <div>
                            <div className="font-semibold text-sm leading-tight">RC Eye Hospital</div>
                            <div className="text-indigo-400 text-[9px] font-bold tracking-wider uppercase">Admin Panel</div>
                        </div>
                    </div>
                    <button onClick={() => setMobileOpen(false)} className="md:hidden p-1 text-white/50 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all
                ${active ? "bg-indigo-600 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 border-t border-white/10">
                <Link href="/" target="_blank" className="flex items-center gap-2 px-3 py-2.5 bg-white/5 hover:bg-white/10 rounded-md text-white/60 text-xs font-medium transition-all">
                    <Globe className="w-3.5 h-3.5" /> View Website ↗
                </Link>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile toggle button — positioned fixed at top-left */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md shadow-lg"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* Desktop sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-col min-h-screen flex-shrink-0 hidden md:flex">
                {sidebarContent}
            </aside>

            {/* Mobile sidebar overlay */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
                    {/* Sidebar */}
                    <aside className="absolute left-0 top-0 bottom-0 w-72 bg-slate-900 text-white flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
                        {sidebarContent}
                    </aside>
                </div>
            )}
        </>
    );
}
