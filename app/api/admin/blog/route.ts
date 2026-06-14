import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

// GET all blog posts
export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return NextResponse.json({ posts });
}

// POST new blog post
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const result = await db.insert(blogPosts).values({ ...body, slug }).returning();
    return NextResponse.json({ post: result[0] }, { status: 201 });
}

// PATCH update blog post
export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id, ...data } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await db.update(blogPosts).set({ ...data, updatedAt: new Date() }).where(eq(blogPosts.id, id));
    return NextResponse.json({ success: true });
}

// DELETE blog post
export async function DELETE(req: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await req.json();
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return NextResponse.json({ success: true });
}
