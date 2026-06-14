import type { MetadataRoute } from "next";

const BASE = "https://rceyehospital.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const services = [
        "cataract-surgery",
        "laser-vision-correction",
        "retina-services",
        "glaucoma-care",
        "cornea-services",
        "pediatric-eye-care",
        "dental-care",
    ];

    return [
        { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
        { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        ...services.map((slug) => ({
            url: `${BASE}/services/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        { url: `${BASE}/doctors`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ];
}
