"use client";

import { useState, useEffect } from "react";
import { Phone, ArrowUp } from "lucide-react";
import { SITE } from "@/lib/siteData";

export default function FloatingButtons() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const fn = () => setShowTop(window.scrollY > 400);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <>
            {/* Right — WhatsApp + Back to Top */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
                <a
                    href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=Hi, I would like to book an appointment at R.C. Eye %26 Dental Hospital.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="relative w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                    <span className="absolute inset-0 rounded-full border-2 border-[#25d366] animate-ping opacity-30" />
                    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a8.79 8.79 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.529 5.837L.057 23.215a.75.75 0 00.945.899l5.538-1.453A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.902 0-3.681-.516-5.204-1.413l-.374-.22-3.875 1.017 1.038-3.782-.242-.39A9.951 9.951 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                </a>

                {/* Back to top */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={`w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                    title="Back to top"
                >
                    <ArrowUp className="w-4 h-4 text-white" />
                </button>
            </div>

            {/* Left — Call */}
            <div className="fixed bottom-6 left-6 z-50">
                <a
                    href={`tel:${SITE.phone}`}
                    title="Call Now"
                    className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                    <Phone className="w-6 h-6 text-white" />
                </a>
            </div>
        </>
    );
}
