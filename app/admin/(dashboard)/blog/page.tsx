"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, FileText, Loader2, Image as ImageIcon, Save, X, Upload, Globe, Tag, Search } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post { id: number; title: string; slug: string; excerpt: string | null; content: string; coverImage: string | null; author: string; category: string | null; tags: string | null; isPublished: boolean; metaTitle: string | null; metaDesc: string | null; createdAt: string; }

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [form, setForm] = useState({ title: "", excerpt: "", content: "", coverImage: "", author: "Dr. Rachit Agarwal", category: "", tags: "", metaTitle: "", metaDesc: "", isPublished: false });

    useEffect(() => {
        fetch("/api/admin/blog").then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    function resetForm() { setForm({ title: "", excerpt: "", content: "", coverImage: "", author: "Dr. Rachit Agarwal", category: "", tags: "", metaTitle: "", metaDesc: "", isPublished: false }); }

    function openCreate() { resetForm(); setEditingPost(null); setShowCreate(true); }

    function openEdit(post: Post) {
        setForm({ title: post.title, excerpt: post.excerpt || "", content: post.content, coverImage: post.coverImage || "", author: post.author, category: post.category || "", tags: post.tags || "", metaTitle: post.metaTitle || "", metaDesc: post.metaDesc || "", isPublished: post.isPublished });
        setEditingPost(post); setShowCreate(true);
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (res.ok) { const d = await res.json(); setForm({ ...form, coverImage: d.url }); toast.success("Image uploaded"); }
        else toast.error("Upload failed");
        setUploading(false);
    }

    async function savePost() {
        if (!form.title || !form.content) return toast.error("Title and content required");
        setSaving(true);

        if (editingPost) {
            const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingPost.id, ...form }) });
            if (res.ok) { setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...form } as Post : p)); toast.success("Post updated"); setShowCreate(false); }
            else toast.error("Update failed");
        } else {
            const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            if (res.ok) { const d = await res.json(); setPosts([d.post, ...posts]); toast.success("Post created"); setShowCreate(false); }
            else toast.error("Create failed");
        }
        setSaving(false);
    }

    async function deletePost(id: number) {
        if (!confirm("Delete this post?")) return;
        const res = await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        if (res.ok) { setPosts(posts.filter(p => p.id !== id)); toast.success("Deleted"); }
    }

    async function togglePublish(id: number, current: boolean) {
        const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isPublished: !current, publishedAt: !current ? new Date().toISOString() : null }) });
        if (res.ok) { setPosts(posts.map(p => p.id === id ? { ...p, isPublished: !current } : p)); toast.success(!current ? "Published!" : "Unpublished"); }
    }

    const filtered = posts.filter(p => {
        const matchFilter = filter === "all" || (filter === "published" ? p.isPublished : !p.isPublished);
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

    // Editor View
    if (showCreate) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{editingPost ? "Edit Article" : "New Article"}</h1>
                        <p className="text-muted-foreground text-sm mt-1">Write SEO-friendly content for organic traffic</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowCreate(false)}><X className="w-4 h-4 mr-1" /> Cancel</Button>
                        <Button onClick={savePost} disabled={saving} className="bg-[#1a5f3a] hover:bg-[#28845a]">
                            {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                            {editingPost ? "Update" : "Save"}
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card>
                            <CardContent className="p-5 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Title *</label>
                                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. What is Cataract? Complete Guide to Symptoms & Treatment" className="mt-1 text-lg font-semibold" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Excerpt (Short description)</label>
                                    <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary shown in blog listing and search results..." rows={2} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 resize-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content * (HTML supported)</label>
                                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your article content here. You can use HTML tags for formatting: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <a href=''>" rows={16} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a5f3a] focus:ring-1 focus:ring-[#1a5f3a]/20 font-mono text-xs leading-relaxed" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Publish */}
                        <Card>
                            <CardHeader className="pb-3"><CardTitle className="text-sm">Publish</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={form.isPublished} onChange={() => setForm({ ...form, isPublished: !form.isPublished })} className="w-4 h-4 rounded border-gray-300 text-[#1a5f3a] focus:ring-[#1a5f3a]" />
                                    <span className="text-sm font-medium">Publish immediately</span>
                                </label>
                                <p className="text-xs text-gray-400">{form.isPublished ? "Will be visible on /blog" : "Saved as draft — not visible"}</p>
                            </CardContent>
                        </Card>

                        {/* Cover Image */}
                        <Card>
                            <CardHeader className="pb-3"><CardTitle className="text-sm">Cover Image</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                {form.coverImage ? (
                                    <div className="relative rounded-lg overflow-hidden border">
                                        <img src={form.coverImage} alt="Cover" className="w-full h-36 object-cover" />
                                        <button onClick={() => setForm({ ...form, coverImage: "" })} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"><X className="w-3 h-3" /></button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" disabled={uploading} />
                                        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                                            {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Upload className="w-6 h-6 mb-2" /><span className="text-xs">Upload cover image</span></>}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* SEO */}
                        <Card>
                            <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> SEO Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-xs text-gray-500">Meta Title</label>
                                    <Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} placeholder="SEO title (50-60 chars)" className="mt-1" />
                                    <p className="text-[10px] text-gray-400 mt-1">{form.metaTitle.length}/60 characters</p>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Meta Description</label>
                                    <textarea value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} placeholder="SEO description (120-155 chars)" rows={2} className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a5f3a]" />
                                    <p className="text-[10px] text-gray-400 mt-1">{form.metaDesc.length}/155 characters</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Category & Tags */}
                        <Card>
                            <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> Category & Tags</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-xs text-gray-500">Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a5f3a] appearance-none">
                                        <option value="">Select category</option>
                                        <option value="Eye Care">Eye Care</option>
                                        <option value="Dental">Dental</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Wellness">Wellness</option>
                                        <option value="Awareness">Awareness</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Tags (comma-separated)</label>
                                    <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="cataract, surgery, eye care" className="mt-1" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Author</label>
                                    <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="mt-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // List View
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Blog / Articles</h1>
                    <p className="text-muted-foreground text-sm mt-1">Create SEO-friendly articles to drive organic traffic</p>
                </div>
                <Button onClick={openCreate} className="bg-[#1a5f3a] hover:bg-[#28845a]"><Plus className="w-4 h-4 mr-1" /> New Article</Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{posts.length}</div><p className="text-muted-foreground text-xs">Total Posts</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{posts.filter(p => p.isPublished).length}</div><p className="text-muted-foreground text-xs">Published</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-amber-600">{posts.filter(p => !p.isPublished).length}</div><p className="text-muted-foreground text-xs">Drafts</p></CardContent></Card>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                        </div>
                        <Tabs value={filter} onValueChange={setFilter}>
                            <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="published">Published</TabsTrigger><TabsTrigger value="draft">Drafts</TabsTrigger></TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent>
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-medium">No articles found</p>
                            <p className="text-xs mt-1">Create your first SEO article to drive organic traffic</p>
                            <Button onClick={openCreate} className="mt-4 bg-[#1a5f3a] hover:bg-[#28845a]"><Plus className="w-4 h-4 mr-1" /> Create Article</Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Article</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {post.coverImage ? (
                                                    <img src={post.coverImage} alt="" className="w-12 h-9 rounded object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className="w-12 h-9 rounded bg-gray-100 flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-gray-300" /></div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-sm line-clamp-1">{post.title}</div>
                                                    {post.metaDesc && <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{post.metaDesc}</div>}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{post.category && <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>}</TableCell>
                                        <TableCell>
                                            <Badge variant={post.isPublished ? "default" : "secondary"} className="text-[10px] cursor-pointer" onClick={() => togglePublish(post.id, post.isPublished)}>
                                                {post.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-xs">{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-1.5 justify-end">
                                                <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => openEdit(post)}><Edit className="w-3.5 h-3.5" /></Button>
                                                {post.isPublished && <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}><Eye className="w-3.5 h-3.5" /></Button>}
                                                <Button variant="outline" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-700" onClick={() => deletePost(post.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
