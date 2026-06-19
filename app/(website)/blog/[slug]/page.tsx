import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ArrowLeft, Calendar, User, Clock, Tag, ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/siteData";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!post) return { title: "Not Found" };
    return {
        title: post.metaTitle || post.title,
        description: post.metaDesc || post.excerpt || "",
        openGraph: { title: post.metaTitle || post.title, description: post.metaDesc || post.excerpt || "", images: post.coverImage ? [{ url: post.coverImage }] : [] },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!post || !post.isPublished) notFound();

    // Related posts
    const related = await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.createdAt)).limit(3);
    const otherPosts = related.filter(p => p.id !== post.id).slice(0, 2);

    const wordCount = post.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "author": { "@type": "Person", "name": post.author },
        "publisher": { "@type": "Organization", "name": "R.C. Eye & Dental Hospital" },
        "datePublished": post.publishedAt || post.createdAt,
        "image": post.coverImage || "",
        "description": post.metaDesc || post.excerpt || "",
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            {/* Hero */}
            <article>
                <header className="pt-28 pb-12 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-4xl mx-auto px-6">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                            <Link href="/" className="hover:text-[#1a5f3a]">Home</Link>
                            <span>/</span>
                            <Link href="/blog" className="hover:text-[#1a5f3a]">Blog</Link>
                            <span>/</span>
                            <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
                        </nav>

                        {/* Category + Read time */}
                        <div className="flex items-center gap-3 mb-4">
                            {post.category && (
                                <span className="bg-[#1a5f3a]/10 text-[#1a5f3a] text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
                            )}
                            <span className="flex items-center gap-1 text-gray-400 text-xs">
                                <Clock className="w-3 h-3" /> {readTime} min read
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.2] mb-6">
                            {post.title}
                        </h1>

                        {/* Author + Date */}
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#1a5f3a]/10 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-[#1a5f3a]" />
                                </div>
                                <span className="font-medium text-gray-700">{post.author}</span>
                            </div>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="max-w-4xl mx-auto px-6 -mt-2 mb-10">
                        <div className="rounded-2xl overflow-hidden shadow-lg aspect-[2/1]">
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 pb-16">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Main Article */}
                        <div className="lg:col-span-3">
                            <div
                                className="prose prose-lg prose-gray max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
                  prose-li:text-gray-600
                  prose-a:text-[#1a5f3a] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                  prose-strong:text-gray-900"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            {post.tags && (
                                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    {post.tags.split(",").map(tag => (
                                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{tag.trim()}</span>
                                    ))}
                                </div>
                            )}

                            {/* CTA */}
                            <div className="mt-10 bg-[#1a5f3a]/5 border border-[#1a5f3a]/10 rounded-2xl p-8 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Need Expert Consultation?</h3>
                                <p className="text-gray-500 text-sm mb-5">Our specialists are here to help you with any eye or dental concern.</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Link href="/book-appointment" className="inline-flex items-center gap-2 bg-[#1a5f3a] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all">
                                        Book Appointment <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all">
                                        <Phone className="w-4 h-4" /> {SITE.phone}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-1 space-y-6">
                            {/* Quick Links */}
                            <div className="bg-gray-50 rounded-xl p-5">
                                <h4 className="font-semibold text-gray-900 text-sm mb-3">Quick Links</h4>
                                <div className="space-y-2">
                                    {[["Our Services", "/services"], ["Our Doctors", "/doctors"], ["Book Appointment", "/book-appointment"], ["Contact Us", "/contact"]].map(([label, href]) => (
                                        <Link key={href} href={href} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a5f3a] transition-colors">
                                            <ArrowRight className="w-3 h-3" />{label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Related Posts */}
                            {otherPosts.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-5">
                                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Related Articles</h4>
                                    <div className="space-y-3">
                                        {otherPosts.map(p => (
                                            <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                                                <div className="text-sm font-medium text-gray-700 group-hover:text-[#1a5f3a] transition-colors line-clamp-2">{p.title}</div>
                                                <div className="text-xs text-gray-400 mt-0.5">{new Date(p.createdAt).toLocaleDateString()}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Emergency */}
                            <div className="bg-gray-900 rounded-xl p-5 text-white">
                                <div className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2">Emergency</div>
                                <a href={`tel:${SITE.phone}`} className="text-lg font-bold text-emerald-400">{SITE.phone}</a>
                                <p className="text-white/50 text-xs mt-2">Available during OPD hours</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </article>
        </>
    );
}
