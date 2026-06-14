"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Post { id: number; title: string; slug: string; isPublished: boolean; createdAt: string; }

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNew, setShowNew] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetch("/api/admin/blog").then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    async function createPost() {
        if (!newTitle) return;
        setCreating(true);
        const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: newTitle, content: "Draft content...", excerpt: "" }) });
        if (res.ok) { const d = await res.json(); setPosts([d.post, ...posts]); setNewTitle(""); setShowNew(false); toast.success("Draft created"); }
        else toast.error("Failed to create");
        setCreating(false);
    }

    async function deletePost(id: number) {
        const res = await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        if (res.ok) { setPosts(posts.filter(p => p.id !== id)); toast.success("Deleted"); }
    }

    async function togglePublish(id: number, current: boolean) {
        const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isPublished: !current }) });
        if (res.ok) { setPosts(posts.map(p => p.id === id ? { ...p, isPublished: !current } : p)); }
    }

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-xl font-bold text-gray-800">Blog / Articles</h2><p className="text-gray-500 text-sm mt-1">SEO content for organic traffic</p></div>
                <button onClick={() => setShowNew(true)} className="px-4 py-2.5 bg-[#1a5f3a] text-white rounded-lg text-sm font-semibold hover:bg-[#28845a] flex items-center gap-2"><Plus className="w-4 h-4" /> New Post</button>
            </div>

            {showNew && (
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex gap-3">
                        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Article title..." className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a5f3a]" />
                        <button onClick={createPost} disabled={creating} className="px-5 py-2.5 bg-[#1a5f3a] text-white rounded-lg text-sm font-semibold disabled:opacity-60">{creating ? "Creating..." : "Create Draft"}</button>
                        <button onClick={() => setShowNew(false)} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-semibold">Cancel</button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {posts.length === 0 ? <p className="text-gray-400 text-sm text-center py-10">No posts yet. Create one!</p> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-gray-100 bg-gray-50">
                            <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Title</th>
                            <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Status</th>
                            <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Date</th>
                            <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Actions</th>
                        </tr></thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-3 px-4"><div className="flex items-center gap-2"><FileText className="w-4 h-4 text-gray-300" /><span className="font-medium text-gray-900">{post.title}</span></div></td>
                                    <td className="py-3 px-4"><button onClick={() => togglePublish(post.id, post.isPublished)} className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${post.isPublished ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{post.isPublished ? "Published" : "Draft"}</button></td>
                                    <td className="py-3 px-4 text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-4"><div className="flex gap-1.5">
                                        <button onClick={() => deletePost(post.id)} className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
