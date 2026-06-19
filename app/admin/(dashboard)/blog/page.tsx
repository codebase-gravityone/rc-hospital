"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Edit, Trash2, Eye, FileText, Loader2, Save, X, Upload, Globe, Tag, Search, Bold, Italic, Heading2, Heading3, List, Link2, Image as ImageIcon, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post { id: number; title: string; slug: string; excerpt: string | null; content: string; coverImage: string | null; author: string; category: string | null; tags: string | null; isPublished: boolean; metaTitle: string | null; metaDesc: string | null; createdAt: string; }

// ─── SEO Score Calculator ─────────────────────────────────────
function calculateSEO(form: { title: string; excerpt: string; content: string; metaTitle: string; metaDesc: string; focusKeyword: string; coverImage: string; tags: string; category: string }) {
    const checks: { label: string; pass: boolean; tip: string }[] = [];
    const kw = form.focusKeyword.toLowerCase().trim();

    checks.push({ label: "Focus keyword set", pass: kw.length > 0, tip: "Add a focus keyword to optimize for search." });
    checks.push({ label: "Title contains keyword", pass: kw ? form.title.toLowerCase().includes(kw) : false, tip: "Include focus keyword in title for better ranking." });
    checks.push({ label: "Meta title length (50-60)", pass: form.metaTitle.length >= 50 && form.metaTitle.length <= 60, tip: `Current: ${form.metaTitle.length} chars. Aim for 50-60.` });
    checks.push({ label: "Meta description (120-155)", pass: form.metaDesc.length >= 120 && form.metaDesc.length <= 155, tip: `Current: ${form.metaDesc.length} chars. Aim for 120-155.` });
    checks.push({ label: "Content length (300+ words)", pass: form.content.split(/\s+/).length >= 300, tip: `Current: ${form.content.split(/\s+/).length} words. Write 300+ for SEO.` });
    checks.push({ label: "Keyword in content", pass: kw ? form.content.toLowerCase().includes(kw) : false, tip: "Use focus keyword naturally in your content." });
    checks.push({ label: "Keyword in excerpt", pass: kw ? form.excerpt.toLowerCase().includes(kw) : false, tip: "Include keyword in excerpt/summary." });
    checks.push({ label: "Has cover image", pass: form.coverImage.length > 0, tip: "Articles with images get more clicks." });
    checks.push({ label: "Has headings (H2/H3)", pass: form.content.includes("<h2") || form.content.includes("<h3") || form.content.includes("##"), tip: "Use headings to structure content." });
    checks.push({ label: "Has internal links", pass: form.content.includes('href="/') || form.content.includes("href=\"/"), tip: "Link to other pages on your site." });
    checks.push({ label: "Excerpt filled", pass: form.excerpt.length > 30, tip: "Write a compelling 1-2 sentence excerpt." });
    checks.push({ label: "Category selected", pass: form.category.length > 0, tip: "Categorize your article." });

    const passed = checks.filter(c => c.pass).length;
    const score = Math.round((passed / checks.length) * 100);
    return { checks, score, passed, total: checks.length };
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [showCreate, setShowCreate] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [form, setForm] = useState({ title: "", excerpt: "", content: "", coverImage: "", author: "Dr. Rachit Agarwal", category: "", tags: "", metaTitle: "", metaDesc: "", isPublished: false, focusKeyword: "" });

    useEffect(() => { fetch("/api/admin/blog").then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false)); }, []);

    function resetForm() { setForm({ title: "", excerpt: "", content: "", coverImage: "", author: "Dr. Rachit Agarwal", category: "", tags: "", metaTitle: "", metaDesc: "", isPublished: false, focusKeyword: "" }); }
    function openCreate() { resetForm(); setEditingPost(null); setShowCreate(true); }
    function openEdit(post: Post) { setForm({ title: post.title, excerpt: post.excerpt || "", content: post.content, coverImage: post.coverImage || "", author: post.author, category: post.category || "", tags: post.tags || "", metaTitle: post.metaTitle || "", metaDesc: post.metaDesc || "", isPublished: post.isPublished, focusKeyword: "" }); setEditingPost(post); setShowCreate(true); }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, insertInline = false) {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        const fd = new FormData(); fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (res.ok) {
            const d = await res.json();
            if (insertInline) {
                const imgTag = `\n<img src="${d.url}" alt="${file.name.split('.')[0]}" style="max-width:100%;border-radius:8px;margin:16px 0" />\n`;
                insertAtCursor(imgTag);
                toast.success("Image inserted in content");
            } else {
                setForm({ ...form, coverImage: d.url }); toast.success("Cover image uploaded");
            }
        } else toast.error("Upload failed");
        setUploading(false);
        e.target.value = "";
    }

    function insertAtCursor(text: string) {
        const el = contentRef.current; if (!el) return;
        const start = el.selectionStart; const end = el.selectionEnd;
        const newContent = form.content.substring(0, start) + text + form.content.substring(end);
        setForm({ ...form, content: newContent });
        setTimeout(() => { el.selectionStart = el.selectionEnd = start + text.length; el.focus(); }, 0);
    }

    function wrapSelection(before: string, after: string) {
        const el = contentRef.current; if (!el) return;
        const start = el.selectionStart; const end = el.selectionEnd;
        const selected = form.content.substring(start, end) || "text";
        const newContent = form.content.substring(0, start) + before + selected + after + form.content.substring(end);
        setForm({ ...form, content: newContent });
    }

    async function savePost() {
        if (!form.title || !form.content) return toast.error("Title and content required");
        setSaving(true);
        const payload = { ...form }; delete (payload as Record<string, unknown>).focusKeyword;
        if (editingPost) {
            const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingPost.id, ...payload }) });
            if (res.ok) { setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...payload } as Post : p)); toast.success("Updated"); setShowCreate(false); } else toast.error("Failed");
        } else {
            const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (res.ok) { const d = await res.json(); setPosts([d.post, ...posts]); toast.success("Created"); setShowCreate(false); } else toast.error("Failed");
        }
        setSaving(false);
    }

    async function deletePost(id: number) { if (!confirm("Delete?")) return; const res = await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); if (res.ok) { setPosts(posts.filter(p => p.id !== id)); toast.success("Deleted"); } }
    async function togglePublish(id: number, current: boolean) { const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isPublished: !current, publishedAt: !current ? new Date().toISOString() : null }) }); if (res.ok) { setPosts(posts.map(p => p.id === id ? { ...p, isPublished: !current } : p)); } }

    const filtered = posts.filter(p => { const mf = filter === "all" || (filter === "published" ? p.isPublished : !p.isPublished); const ms = !search || p.title.toLowerCase().includes(search.toLowerCase()); return mf && ms; });
    const seo = calculateSEO(form);

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

    // ─── EDITOR VIEW ─────────────────────────────────────────────
    if (showCreate) {
        return (
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight">{editingPost ? "Edit Article" : "New Article"}</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowCreate(false)}><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
                        <Button size="sm" onClick={savePost} disabled={saving} className="bg-[#1a5f3a] hover:bg-[#28845a]">{saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />}{editingPost ? "Update" : "Save"}</Button>
                    </div>
                </div>

                {/* SEO Score - Full Width */}
                <Card className={`border-2 ${seo.score >= 70 ? "border-green-200" : seo.score >= 40 ? "border-amber-200" : "border-red-200"}`}>
                    <CardContent className="p-5">
                        <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`text-3xl font-bold ${seo.score >= 70 ? "text-green-600" : seo.score >= 40 ? "text-amber-600" : "text-red-600"}`}>{seo.score}%</div>
                                <div><div className="text-sm font-semibold text-gray-900">SEO Score</div><div className="text-xs text-gray-500">{seo.passed}/{seo.total} checks passed</div></div>
                            </div>
                            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all ${seo.score >= 70 ? "bg-green-500" : seo.score >= 40 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${seo.score}%` }} />
                            </div>
                            <Input value={form.focusKeyword} onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })} placeholder="Focus keyword..." className="w-56 h-9 text-xs" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {seo.checks.map((c) => (
                                <div key={c.label} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${c.pass ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                    {c.pass ? <CheckCircle className="w-3 h-3 flex-shrink-0" /> : <XCircle className="w-3 h-3 flex-shrink-0" />}
                                    <span className="truncate">{c.label}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-4">
                        {/* Title */}
                        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article title..." className="text-lg font-bold h-12" />
                        {/* Excerpt */}
                        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary for search results..." rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#1a5f3a] resize-none" />

                        {/* Content Editor with Toolbar */}
                        <Card>
                            <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 flex-wrap">
                                <button onClick={() => wrapSelection("<strong>", "</strong>")} className="p-1.5 rounded hover:bg-gray-100" title="Bold"><Bold className="w-4 h-4" /></button>
                                <button onClick={() => wrapSelection("<em>", "</em>")} className="p-1.5 rounded hover:bg-gray-100" title="Italic"><Italic className="w-4 h-4" /></button>
                                <div className="w-px h-5 bg-gray-200 mx-1" />
                                <button onClick={() => insertAtCursor("\n<h2>Heading</h2>\n")} className="p-1.5 rounded hover:bg-gray-100" title="H2"><Heading2 className="w-4 h-4" /></button>
                                <button onClick={() => insertAtCursor("\n<h3>Subheading</h3>\n")} className="p-1.5 rounded hover:bg-gray-100" title="H3"><Heading3 className="w-4 h-4" /></button>
                                <div className="w-px h-5 bg-gray-200 mx-1" />
                                <button onClick={() => insertAtCursor("\n<ul>\n<li>Item</li>\n<li>Item</li>\n</ul>\n")} className="p-1.5 rounded hover:bg-gray-100" title="List"><List className="w-4 h-4" /></button>
                                <button onClick={() => wrapSelection('<a href="/">', "</a>")} className="p-1.5 rounded hover:bg-gray-100" title="Link"><Link2 className="w-4 h-4" /></button>
                                <div className="w-px h-5 bg-gray-200 mx-1" />
                                <label className="p-1.5 rounded hover:bg-gray-100 cursor-pointer" title="Insert Image">
                                    <ImageIcon className="w-4 h-4" />
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, true)} />
                                </label>
                                {uploading && <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-2" />}
                            </div>
                            <textarea ref={contentRef} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write article content... (HTML tags supported for formatting)" rows={18} className="w-full px-4 py-3 text-sm outline-none font-mono text-xs leading-relaxed resize-y min-h-[300px]" />
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Publish */}
                        <Card>
                            <CardContent className="p-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={form.isPublished} onChange={() => setForm({ ...form, isPublished: !form.isPublished })} className="w-4 h-4 rounded border-gray-300 text-[#1a5f3a]" />
                                    <span className="text-sm font-medium">{form.isPublished ? "Published" : "Draft"}</span>
                                </label>
                            </CardContent>
                        </Card>

                        {/* Cover Image */}
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-sm">Cover Image</CardTitle></CardHeader>
                            <CardContent>
                                {form.coverImage ? (
                                    <div className="relative rounded-lg overflow-hidden border"><img src={form.coverImage} alt="" className="w-full h-32 object-cover" /><button onClick={() => setForm({ ...form, coverImage: "" })} className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full"><X className="w-3 h-3" /></button></div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center py-6 border-2 border-dashed rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"><Upload className="w-5 h-5 mb-1" /><span className="text-[10px]">Upload image</span><input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} /></label>
                                )}
                            </CardContent>
                        </Card>

                        {/* SEO Meta */}
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> SEO</CardTitle></CardHeader>
                            <CardContent className="space-y-2.5">
                                <div><label className="text-[10px] text-gray-500">Meta Title</label><Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} placeholder="50-60 chars" className="mt-0.5 h-8 text-xs" /><div className={`text-[9px] mt-0.5 ${form.metaTitle.length >= 50 && form.metaTitle.length <= 60 ? "text-green-500" : "text-gray-400"}`}>{form.metaTitle.length}/60</div></div>
                                <div><label className="text-[10px] text-gray-500">Meta Description</label><textarea value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} placeholder="120-155 chars" rows={2} className="w-full mt-0.5 px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none focus:border-[#1a5f3a]" /><div className={`text-[9px] mt-0.5 ${form.metaDesc.length >= 120 && form.metaDesc.length <= 155 ? "text-green-500" : "text-gray-400"}`}>{form.metaDesc.length}/155</div></div>
                            </CardContent>
                        </Card>

                        {/* Category & Tags */}
                        <Card>
                            <CardContent className="p-4 space-y-2.5">
                                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-2.5 py-2 border border-gray-200 rounded-md text-xs outline-none"><option value="">Category</option><option value="Eye Care">Eye Care</option><option value="Dental">Dental</option><option value="Surgery">Surgery</option><option value="Wellness">Wellness</option><option value="Awareness">Awareness</option></select>
                                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags: cataract, surgery..." className="h-8 text-xs" />
                                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" className="h-8 text-xs" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    // ─── LIST VIEW ──────────────────────────────────────────────
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h1 className="text-2xl font-bold tracking-tight">Blog / Articles</h1><p className="text-muted-foreground text-sm mt-1">SEO-focused content marketing</p></div>
                <Button onClick={openCreate} className="bg-[#1a5f3a] hover:bg-[#28845a]"><Plus className="w-4 h-4 mr-1" /> New Article</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{posts.length}</div><p className="text-muted-foreground text-xs">Total</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{posts.filter(p => p.isPublished).length}</div><p className="text-muted-foreground text-xs">Published</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-amber-600">{posts.filter(p => !p.isPublished).length}</div><p className="text-muted-foreground text-xs">Drafts</p></CardContent></Card>
            </div>
            <Card>
                <CardHeader className="pb-4"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div><Tabs value={filter} onValueChange={setFilter}><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="published">Published</TabsTrigger><TabsTrigger value="draft">Drafts</TabsTrigger></TabsList></Tabs></div></CardHeader>
                <CardContent>
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground"><FileText className="w-10 h-10 mx-auto mb-3 opacity-30" /><p className="text-sm">No articles yet</p><Button onClick={openCreate} className="mt-4 bg-[#1a5f3a] hover:bg-[#28845a]"><Plus className="w-4 h-4 mr-1" /> Create</Button></div>
                    ) : (
                        <Table><TableHeader><TableRow><TableHead>Article</TableHead><TableHead>Category</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>
                            {filtered.map(post => (
                                <TableRow key={post.id}><TableCell><div className="flex items-center gap-3">{post.coverImage ? <img src={post.coverImage} alt="" className="w-12 h-9 rounded object-cover" /> : <div className="w-12 h-9 rounded bg-gray-100 flex items-center justify-center"><FileText className="w-4 h-4 text-gray-300" /></div>}<div className="font-medium text-sm line-clamp-1">{post.title}</div></div></TableCell><TableCell>{post.category && <Badge variant="secondary" className="text-[10px]">{post.category}</Badge>}</TableCell><TableCell><Badge variant={post.isPublished ? "default" : "secondary"} className="text-[10px] cursor-pointer" onClick={() => togglePublish(post.id, post.isPublished)}>{post.isPublished ? "Live" : "Draft"}</Badge></TableCell><TableCell className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</TableCell><TableCell className="text-right"><div className="flex gap-1 justify-end"><Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => openEdit(post)}><Edit className="w-3.5 h-3.5" /></Button>{post.isPublished && <Button variant="outline" size="sm" className="h-7 w-7 p-0" onClick={() => window.open(`/blog/${post.slug}`, "_blank")}><Eye className="w-3.5 h-3.5" /></Button>}<Button variant="outline" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => deletePost(post.id)}><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
                            ))}
                        </TableBody></Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
