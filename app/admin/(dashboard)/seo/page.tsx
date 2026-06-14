"use client";

import { useState } from "react";
import { Save, Globe } from "lucide-react";
import { toast } from "sonner";

const pages = [
    { page: "home", title: "R.C. Eye & Dental Hospital – Best Eye Hospital in Bijnor", description: "Advanced cataract surgery, LASIK, retina, glaucoma, cornea & dental care in Bijnor. Ayushman Bharat empanelled. Book appointment: +91 8171742659.", keywords: "eye hospital Bijnor, cataract surgery Bijnor, best eye doctor Bijnor" },
    { page: "about", title: "About Us – R.C. Eye & Dental Hospital Bijnor", description: "Learn about R.C. Eye & Dental Hospital, our mission, doctors, and trusted care.", keywords: "about RC eye hospital, eye care Bijnor" },
    { page: "services", title: "Eye & Dental Services in Bijnor", description: "Complete eye and dental services – Cataract, LASIK, Retina, Glaucoma, Dental.", keywords: "eye services Bijnor, dental services Bijnor" },
    { page: "doctors", title: "Our Doctors – Dr. Rachit Agarwal & Dr. Surbhi Agarwal", description: "Meet our specialists – MS Ophthalmology eye surgeon and BDS dentist.", keywords: "eye doctor Bijnor, Dr Rachit Agarwal" },
    { page: "gallery", title: "Hospital Gallery – R.C. Eye & Dental Hospital", description: "Photos of our facilities, equipment, and welcoming environment.", keywords: "hospital gallery Bijnor" },
    { page: "contact", title: "Contact & Book Appointment", description: "Contact R.C. Eye Hospital Bijnor. Phone: +91 8171742659. Book online.", keywords: "book appointment Bijnor, eye hospital contact" },
];

export default function SEOSettingsPage() {
    const [seoPages, setSeoPages] = useState(pages);
    const [editing, setEditing] = useState<string | null>(null);

    function save(page: string) { setEditing(null); toast.success(`SEO for "${page}" saved`); }

    return (
        <div className="space-y-6">
            <div><h2 className="text-xl font-bold text-gray-800">SEO Settings</h2><p className="text-gray-500 text-sm mt-1">Manage meta titles and descriptions for each page</p></div>

            <div className="space-y-4">
                {seoPages.map((p) => (
                    <div key={p.page} className="bg-white rounded-xl border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-400" />
                                <span className="font-semibold text-gray-800 text-sm capitalize">{p.page}</span>
                                <span className="text-gray-400 text-xs">/{p.page === "home" ? "" : p.page}</span>
                            </div>
                            {editing === p.page ? (
                                <button onClick={() => save(p.page)} className="px-3 py-1.5 bg-[#1a5f3a] text-white rounded-lg text-xs font-semibold hover:bg-[#28845a] flex items-center gap-1.5"><Save className="w-3 h-3" /> Save</button>
                            ) : (
                                <button onClick={() => setEditing(p.page)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-200">Edit</button>
                            )}
                        </div>
                        {editing === p.page ? (
                            <div className="space-y-3">
                                <div><label className="text-xs text-gray-500 font-medium">Meta Title</label><input value={p.title} onChange={(e) => setSeoPages(seoPages.map(s => s.page === p.page ? { ...s, title: e.target.value } : s))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mt-1" /></div>
                                <div><label className="text-xs text-gray-500 font-medium">Meta Description</label><textarea value={p.description} onChange={(e) => setSeoPages(seoPages.map(s => s.page === p.page ? { ...s, description: e.target.value } : s))} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mt-1" /></div>
                                <div><label className="text-xs text-gray-500 font-medium">Keywords</label><input value={p.keywords} onChange={(e) => setSeoPages(seoPages.map(s => s.page === p.page ? { ...s, keywords: e.target.value } : s))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mt-1" /></div>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="text-sm text-gray-900 font-medium">{p.title}</p>
                                <p className="text-xs text-gray-500">{p.description}</p>
                                <p className="text-xs text-gray-400">Keywords: {p.keywords}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
