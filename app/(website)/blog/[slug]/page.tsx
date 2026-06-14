import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!post) return { title: "Not Found" };
    return { title: post.metaTitle || post.title, description: post.metaDesc || post.excerpt || "" };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (!post || !post.isPublished) notFound();

    return (
        <>
            <section className="pt-32 pb-10 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#1a5f3a] mb-6 transition-colors"><ArrowLeft className="w-4 h-4" /> All Articles</Link>
                    {post.category && <span className="text-[#1a5f3a] text-xs font-bold uppercase tracking-wider">{post.category}</span>}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-2 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="prose prose-gray prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>") }} />
                    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                        <p className="text-gray-500 text-sm mb-4">Need expert advice?</p>
                        <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a5f3a] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all">Book Appointment</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
