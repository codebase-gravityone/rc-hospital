import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import { gallery } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = { title: "Gallery", description: "Photo gallery of R.C. Eye & Dental Hospital Bijnor – our facilities and environment." };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
    const images = await db.select().from(gallery).where(eq(gallery.isActive, true)).orderBy(gallery.sortOrder);

    return (
        <>
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Gallery</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Our Hospital</h1>
                    <p className="text-gray-500 mt-4">A glimpse into our facilities and environment.</p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {images.length === 0 ? (
                        <p className="text-gray-400 text-center py-20">No photos available yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((img, i) => (
                                <div key={img.id} className={`group relative overflow-hidden rounded-2xl bg-gray-100 ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                                    <Image
                                        src={img.imageUrl}
                                        alt={img.description || img.label || "R.C. Eye & Dental Hospital"}
                                        width={i === 0 ? 800 : 400}
                                        height={i === 0 ? 600 : 400}
                                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${i === 0 ? "h-full min-h-[300px]" : "h-[250px] md:h-[300px]"}`}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                        <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">{img.label || img.description}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
