import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog – Eye & Dental Health Articles",
    description: "Expert articles on eye care, dental health, cataract surgery, LASIK, glaucoma, and more from R.C. Eye & Dental Hospital Bijnor.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
    const posts = await db.select().from(blogPosts).where(eq(blogPosts.isPublished, true)).orderBy(desc(blogPosts.createdAt));

    return (
        <>
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-[#1a5f3a] text-xs font-bold uppercase tracking-[3px] mb-2">Blog</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Health Articles & Tips</h1>
                    <p className="text-gray-500 mt-4 max-w-xl">Expert insights on eye care, dental health, and wellness from our specialists.</p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No articles published yet.</p>
                            <p className="text-gray-400 text-sm mt-2">Check back soon for expert health tips!</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    {post.coverImage && (
                                        <div className="h-48 overflow-hidden bg-gray-100">
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        {post.category && <span className="text-[#1a5f3a] text-[10px] font-bold uppercase tracking-wider">{post.category}</span>}
                                        <h2 className="font-bold text-gray-900 text-lg mt-2 mb-3 leading-snug group-hover:text-[#1a5f3a] transition-colors">{post.title}</h2>
                                        {post.excerpt && <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>}
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                                            </div>
                                            <span className="text-[#1a5f3a] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
