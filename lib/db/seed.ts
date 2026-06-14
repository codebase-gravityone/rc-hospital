/**
 * Run once after migrations: npx tsx lib/db/seed.ts
 */
import "dotenv/config";
import { db } from "./index";
import { adminUsers, services, gallery, siteSettings } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
    console.log("🌱 Seeding database...");

    // Admin user
    const hashedPassword = await bcrypt.hash("Admin@123", 12);
    await db
        .insert(adminUsers)
        .values({ email: "admin@rceyehospital.com", password: hashedPassword, name: "Admin" })
        .onConflictDoNothing();

    // Services
    await db
        .insert(services)
        .values([
            {
                slug: "cataract-surgery",
                title: "Cataract Surgery",
                shortDesc: "Advanced robotic cataract surgery with latest IOL options and faster recovery.",
                longDesc: "Our state-of-the-art robotic cataract surgery uses the latest phacoemulsification technique with premium IOL (Intraocular Lens) options. The procedure is virtually painless, requires no injection and no stitch, and most patients experience improved vision within 24 hours.",
                icon: "eye",
                category: "eye",
                sortOrder: 1,
                metaTitle: "Cataract Surgery in Bijnor | R.C. Eye Hospital",
                metaDesc: "Best cataract surgery in Bijnor with robotic precision, no injection, no stitch. Advanced IOL options. Book appointment at R.C. Eye & Dental Hospital.",
            },
            {
                slug: "laser-vision-correction",
                title: "Laser Vision Correction",
                shortDesc: "Laser vision correction to get freedom from glasses and contact lenses permanently.",
                longDesc: "Experience life without glasses through our advanced LASIK and PRK procedures. Our precision laser vision correction treatments are customized for each patient's unique eye profile, delivering exceptional results with minimal recovery time.",
                icon: "zap",
                category: "eye",
                sortOrder: 2,
                metaTitle: "LASIK Laser Eye Surgery Bijnor | R.C. Eye Hospital",
                metaDesc: "LASIK laser vision correction in Bijnor. Get freedom from glasses permanently. Expert eye surgeon Dr. Rachit Agarwal. Book consultation today.",
            },
            {
                slug: "retina-services",
                title: "Retina Services",
                shortDesc: "Treatment for diabetic retinopathy, retinal injections and complex retinal diseases.",
                longDesc: "Our comprehensive retina clinic offers diagnosis and treatment for all retinal conditions including diabetic retinopathy, macular degeneration, retinal detachment, and retinal vein occlusion. We use the latest imaging technology and treatment protocols.",
                icon: "scan-eye",
                category: "eye",
                sortOrder: 3,
                metaTitle: "Retina Treatment Bijnor | R.C. Eye & Dental Hospital",
                metaDesc: "Expert retina treatment in Bijnor. Diabetic retinopathy, retinal injections, macular degeneration. Dr. Rachit Agarwal - experienced retina specialist.",
            },
            {
                slug: "glaucoma-care",
                title: "Glaucoma Care",
                shortDesc: "Early detection and advanced management to protect your vision for the future.",
                longDesc: "Glaucoma is a silent thief of sight. Our advanced glaucoma clinic provides comprehensive screening, diagnosis, and treatment including eye drops, laser therapy, and surgery to preserve your vision and prevent further damage.",
                icon: "shield",
                category: "eye",
                sortOrder: 4,
                metaTitle: "Glaucoma Treatment Bijnor | R.C. Eye Hospital",
                metaDesc: "Glaucoma diagnosis and treatment in Bijnor. Advanced IOP management, laser therapy. Protect your vision. R.C. Eye & Dental Hospital.",
            },
            {
                slug: "cornea-services",
                title: "Cornea Services",
                shortDesc: "Treatment for corneal infections, injuries and professional cornea transplant guidance.",
                longDesc: "Our cornea department handles all corneal conditions from simple infections to complex corneal transplants. Dr. Rachit Agarwal has specialized fellowship training in Cornea and Refractive Surgery from Sadguru Netra Chikitsalaya, Chitrakoot.",
                icon: "circle",
                category: "eye",
                sortOrder: 5,
                metaTitle: "Cornea Treatment & Transplant Bijnor | R.C. Eye Hospital",
                metaDesc: "Cornea treatment, keratoconus management and corneal transplant in Bijnor. Fellowship-trained cornea specialist Dr. Rachit Agarwal.",
            },
            {
                slug: "pediatric-eye-care",
                title: "Pediatric Eye Care",
                shortDesc: "Specialized eye care, vision checkups and squint management for children.",
                longDesc: "Children's eye health is our priority. We provide comprehensive pediatric eye examinations, amblyopia (lazy eye) treatment, squint correction, spectacle prescription, and vision therapy tailored for young patients.",
                icon: "baby",
                category: "eye",
                sortOrder: 6,
                metaTitle: "Pediatric Eye Care Bijnor | Children Eye Specialist",
                metaDesc: "Children eye specialist in Bijnor. Squint treatment, lazy eye, vision checkup for kids. R.C. Eye & Dental Hospital - trusted pediatric eye care.",
            },
            {
                slug: "dental-care",
                title: "Dental Care",
                shortDesc: "Complete dental care from preventive treatments to cosmetic dentistry.",
                longDesc: "Dr. Surbhi R Agarwal provides comprehensive dental care including preventive dental care, dental restorations, cosmetic dentistry, root canal treatment, teeth whitening, extractions, and gum care. Our dental clinic is equipped with modern equipment for gentle and effective treatment.",
                icon: "smile",
                category: "dental",
                sortOrder: 7,
                metaTitle: "Best Dental Care Bijnor | R.C. Eye & Dental Hospital",
                metaDesc: "Expert dental care in Bijnor. Root canal, teeth whitening, dental restoration, cosmetic dentistry by Dr. Surbhi R Agarwal. Book appointment today.",
            },
        ])
        .onConflictDoNothing();

    // Gallery
    await db
        .insert(gallery)
        .values([
            { imageUrl: "/photos/Hospital.jpeg", label: "Facility", description: "R.C. Eye & Dental Hospital Exterior", sortOrder: 1 },
            { imageUrl: "/photos/img (1).jpeg", label: "Facility", description: "Hospital Building", sortOrder: 2 },
            { imageUrl: "/photos/img (2).jpeg", label: "Interior", description: "Reception Area", sortOrder: 3 },
            { imageUrl: "/photos/img (3).jpeg", label: "Surgical", description: "Operation Theatre", sortOrder: 4 },
        ])
        .onConflictDoNothing();

    // Site settings
    await db
        .insert(siteSettings)
        .values([
            { key: "hospital_name", value: "R.C. Eye & Dental Hospital" },
            { key: "phone_primary", value: "+91 8171742659" },
            { key: "phone_whatsapp", value: "+91 9837056360" },
            { key: "address", value: "Opp. Vaishno Vihar, Bairaj Road, Bijnor, Uttar Pradesh – 246701" },
            { key: "opd_weekdays", value: "Mon – Sat: 10:00 AM – 6:00 PM" },
            { key: "opd_sunday", value: "Sunday: 10:00 AM – 2:00 PM" },
            { key: "google_rating", value: { score: 4.9, count: 210 } },
            { key: "stats", value: { patients: 10000, surgeries: 10000, transplants: 500, experience: 20 } },
        ])
        .onConflictDoNothing();

    console.log("✅ Seed complete");
    process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
