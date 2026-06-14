import Link from "next/link";
import { SITE } from "@/lib/siteData";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white">
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 pb-14 border-b border-white/10">

                    {/* LEFT 70% — 3 columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className="w-9 h-9 rounded-lg bg-[#1a5f3a] flex items-center justify-center">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="3" fill="white" /></svg>
                                </div>
                                <span className="font-semibold text-sm">R.C. Eye & Dental</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-1">Opp. Vaishno Vihar, Bairaj Road,</p>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">Bijnor, Uttar Pradesh – 246701</p>
                            <div className="space-y-2 mb-6">
                                <a href={`tel:${SITE.phone}`} className="text-[#1a5f3a] font-semibold text-sm hover:text-[#28845a] block">{SITE.phone}</a>
                                <a href="mailto:rceyehospital@gmail.com" className="text-gray-400 text-sm hover:text-white block">rceyehospital@gmail.com</a>
                            </div>
                            {/* Social Media */}
                            <div className="flex gap-3">
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#1a5f3a] hover:border-[#1a5f3a] transition-all" title="Facebook">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                                </a>
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#1a5f3a] hover:border-[#1a5f3a] transition-all" title="Instagram">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                </a>
                                <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#25d366] hover:border-[#25d366] transition-all" title="WhatsApp">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.79 8.79 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.529 5.837L.057 23.215a.75.75 0 00.945.899l5.538-1.453A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.902 0-3.681-.516-5.204-1.413l-.374-.22-3.875 1.017 1.038-3.782-.242-.39A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#ff0000] hover:border-[#ff0000] transition-all" title="YouTube">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-sm mb-5">Quick Links</h4>
                            <ul className="space-y-2.5">
                                {[
                                    ["Home", "/"],
                                    ["About Us", "/about"],
                                    ["Services", "/services"],
                                    ["Our Doctors", "/doctors"],
                                    ["Gallery", "/gallery"],
                                    ["Reviews", "/#testimonials"],
                                    ["Contact", "/contact"],
                                ].map(([label, href]) => (
                                    <li key={label}>
                                        <Link href={href} className="text-gray-400 text-sm hover:text-white transition-colors">{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* OPD Timing */}
                        <div>
                            <h4 className="font-semibold text-sm mb-5">OPD Timing</h4>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Mon – Sat</span>
                                    <span className="text-white font-medium">10:00 AM – 6:00 PM</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Sunday</span>
                                    <span className="text-white font-medium">10 AM – 2 PM</span>
                                </div>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                                <div className="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1">🚨 Emergency / Help</div>
                                <a href={`tel:${SITE.phone}`} className="text-white font-bold text-lg hover:text-red-300 transition-colors">{SITE.phone}</a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT 30% — Map */}
                    <div className="lg:col-span-3">
                        <h4 className="font-semibold text-sm mb-5">Location</h4>
                        <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                            <iframe
                                src={SITE.googleMapsUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="R.C. Eye & Dental Hospital Location"
                            />
                        </div>
                        <a
                            href="https://maps.google.com/?q=R.C.+EYE+%26+DENTAL+HOSPITAL+Bijnor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1a5f3a] text-xs font-semibold mt-3 inline-block hover:text-[#28845a]"
                        >
                            Open in Google Maps →
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
                    <span>© {new Date().getFullYear()} R.C. Eye & Dental Hospital. All rights reserved.</span>
                    <span>Built by <a href="#" className="text-gray-300 hover:text-white">Nitro Media</a></span>
                </div>
            </div>
        </footer>
    );
}
