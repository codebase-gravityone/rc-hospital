import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";

const data: Record<string, { title: string; meta: string; desc: string; points: string[]; faqs: { q: string; a: string }[] }> = {
    "cataract-surgery": { title: "Cataract Surgery", meta: "Best cataract surgery in Bijnor – robotic, no-stitch, premium IOLs. R.C. Eye Hospital.", desc: "Our advanced robotic phacoemulsification technique offers painless cataract removal with premium IOL options.", points: ["No Injection, No Stitch", "Robotic Phacoemulsification", "Premium IOL options (Monofocal, Multifocal, Trifocal)", "Same-day discharge", "Vision improvement within 24 hours", "Ayushman Bharat covered"], faqs: [{ q: "Is it painful?", a: "No. Performed under topical anaesthesia — completely painless." }, { q: "How long is recovery?", a: "Most patients see clearly within 24 hours. Normal activities resume in 2-3 days." }] },
    "laser-vision-correction": { title: "Laser Vision Correction", meta: "LASIK laser eye surgery in Bijnor by Dr. Rachit Agarwal. Get free from glasses.", desc: "LASIK and PRK procedures customized for each patient's unique eye profile.", points: ["LASIK & PRK available", "Custom wavefront-guided treatment", "Treats myopia, hyperopia, astigmatism", "Quick 1-2 day recovery", "Permanent results", "Fellowship-trained surgeon"], faqs: [{ q: "Am I eligible for LASIK?", a: "Must be 18+, stable prescription for 1 year, adequate corneal thickness." }, { q: "Is it permanent?", a: "Yes, results are long-lasting for the vast majority of patients." }] },
    "retina-services": { title: "Retina Services", meta: "Expert retina treatment in Bijnor – diabetic retinopathy, anti-VEGF injections.", desc: "Comprehensive retina care for all retinal conditions.", points: ["Diabetic retinopathy screening", "Anti-VEGF retinal injections", "Laser photocoagulation", "Macular degeneration care", "Retinal vein occlusion", "Vitreoretinal procedures"], faqs: [{ q: "What is diabetic retinopathy?", a: "A diabetes complication affecting retinal blood vessels. Early treatment prevents vision loss." }, { q: "Are injections painful?", a: "Done under anaesthetic drops — minimal discomfort." }] },
    "glaucoma-care": { title: "Glaucoma Care", meta: "Glaucoma diagnosis and treatment in Bijnor. R.C. Eye Hospital.", desc: "Advanced glaucoma management to preserve your vision.", points: ["Comprehensive screening", "IOP monitoring", "Medical management", "Selective Laser Trabeculoplasty", "Trabeculectomy surgery", "Regular follow-up"], faqs: [{ q: "Is glaucoma curable?", a: "Not curable but treatable — early detection prevents vision loss." }, { q: "Who is at risk?", a: "People over 40, family history, diabetes, high myopia." }] },
    "cornea-services": { title: "Cornea Services", meta: "Cornea treatment & transplant in Bijnor by fellowship-trained specialist.", desc: "Expert cornea care by Dr. Rachit Agarwal with fellowship training from Sadguru Netra Chikitsalaya.", points: ["Corneal infection treatment", "Keratoconus & C3R", "Corneal transplant (PK, DSAEK)", "Pterygium surgery", "Dry eye management", "Foreign body removal"], faqs: [{ q: "What is keratoconus?", a: "Thinning cornea that becomes cone-shaped. C3R treatment can halt progression." }] },
    "pediatric-eye-care": { title: "Pediatric Eye Care", meta: "Children eye specialist in Bijnor – squint, lazy eye, vision screening.", desc: "Specialized eye care designed for children of all ages.", points: ["Comprehensive pediatric examination", "Squint assessment & surgery", "Amblyopia (lazy eye) treatment", "Spectacle prescription", "Myopia management", "Vision therapy"], faqs: [{ q: "When should children get eyes checked?", a: "First exam by age 3-4, then before school starts." }, { q: "Can squint be fixed?", a: "Yes — with spectacles, patching, or surgery depending on type." }] },
    "dental-care": { title: "Dental Care", meta: "Expert dental care in Bijnor by Dr. Surbhi R Agarwal – root canal, whitening, cosmetic.", desc: "Complete dental care from preventive check-ups to advanced cosmetic procedures.", points: ["Preventive check-ups & cleaning", "Root canal treatment", "Dental fillings & restorations", "Teeth whitening", "Extractions", "Gum care & periodontal treatment", "Cosmetic dentistry"], faqs: [{ q: "Is root canal painful?", a: "Done under anaesthesia — the procedure is painless with minimal post-procedure discomfort." }, { q: "How often should I visit?", a: "Every 6 months for check-ups, even without problems." }] },
};

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const s = data[slug]; if (!s) return { title: "Not Found" }; return { title: s.title, description: s.meta }; }
export function generateStaticParams() { return Object.keys(data).map(slug => ({ slug })); }

export default async function ServicePage({ params }: Props) {
    const { slug } = await params; const s = data[slug]; if (!s) notFound();
    return (
        <>
            <section className="pt-32 pb-16 bg-gray-50"><div className="max-w-7xl mx-auto px-6">
                <Link href="/services" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#1a5f3a] mb-6 transition-colors"><ArrowLeft className="w-4 h-4" />All Services</Link>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{s.title}</h1>
                <p className="text-gray-500 mt-4 max-w-2xl text-lg">{s.desc}</p>
            </div></section>
            <section className="py-16"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                    <div><h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2><div className="grid sm:grid-cols-2 gap-3">{s.points.map(p => <div key={p} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"><CheckCircle className="w-5 h-5 text-[#1a5f3a] mt-0.5 flex-shrink-0" /><span className="text-gray-700 text-sm font-medium">{p}</span></div>)}</div></div>
                    <div><h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2><div className="space-y-4">{s.faqs.map(f => <div key={f.q} className="border border-gray-200 rounded-xl p-5"><div className="font-semibold text-gray-900 mb-2">{f.q}</div><div className="text-gray-500 text-sm leading-relaxed">{f.a}</div></div>)}</div></div>
                </div>
                <div className="space-y-6">
                    <div className="bg-[#1a5f3a] rounded-2xl p-7 text-white"><h3 className="font-bold text-lg mb-3">Book Consultation</h3><p className="text-white/70 text-sm mb-5">Get expert advice from our specialists.</p><Link href="/contact" className="block w-full text-center bg-white text-[#1a5f3a] py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all">Book Appointment</Link><a href="tel:+918171742659" className="block w-full text-center mt-3 border border-white/20 py-3.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">📞 +91 8171742659</a></div>
                    <div className="bg-gray-50 rounded-2xl p-6"><h3 className="font-semibold text-gray-900 text-sm mb-4">Other Services</h3><div className="space-y-2">{Object.entries(data).filter(([k]) => k !== slug).slice(0, 5).map(([k, v]) => <Link key={k} href={`/services/${k}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a5f3a] py-1.5"><ArrowRight className="w-3 h-3" />{v.title}</Link>)}</div></div>
                </div>
            </div></section>
        </>
    );
}
