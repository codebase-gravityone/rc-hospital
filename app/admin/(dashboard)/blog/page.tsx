"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, Eye, FileText, Loader2, Save, X, Upload, Globe, Tag, Search, Bold, Italic, Heading2, Heading3, List, Link2, Image as ImageIcon, CheckCircle, XCircle, TrendingUp, BarChart3, PenLine } from "lucide-react";
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
    const checks: { label: string; pass: boolean }[] = [];
    const kw = form.focusKeyword.toLowerCase().trim();
    checks.push({ label: "Focus keyword set", pass: kw.length > 0 });
    checks.push({ label: "Title contains keyword", pass: kw ? form.title.toLowerCase().includes(kw) : false });
    checks.push({ label: "Meta title (50-60)", pass: form.metaTitle.length >= 50 && form.metaTitle.length <= 60 });
    checks.push({ label: "Meta desc (120-155)", pass: form.metaDesc.length >= 120 && form.metaDesc.length <= 155 });
    checks.push({ label: "Content 300+ words", pass: form.content.split(/\s+/).length >= 300 });
    checks.push({ label: "Keyword in content", pass: kw ? form.content.toLowerCase().includes(kw) : false });
    checks.push({ label: "Keyword in excerpt", pass: kw ? form.excerpt.toLowerCase().includes(kw) : false });
    checks.push({ label: "Cover image", pass: form.coverImage.length > 0 });
    checks.push({ label: "Has H2/H3", pass: form.content.includes("<h2") || form.content.includes("<h3") || form.content.includes("##") });
    checks.push({ label: "Internal links", pass: form.content.includes('href="/') || form.content.includes("href=\"/") });
    checks.push({ label: "Excerpt filled", pass: form.excerpt.length > 30 });
    checks.push({ label: "Category set", pass: form.category.length > 0 });
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
    const contentRef = useRef<HTMLDivElement>(null);

    const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "Dr. Rachit Agarwal", category: "", tags: "", metaTitle: "", metaDesc: "", isPublished: false, focusKeyword: "" });

    useEffect(() => { fetch("/api/admin/blog").then(r => r.json()).then(d => { setPosts(d.posts || []); setLoading(false); }).catch(() => setLoading(false)); }, []);

    function resetForm() { setForm({ title: "", slug: "", excerpt: "", content: "", coverImage: "", author: "Dr. Rachit Agarwal", category: "", tags: "", metaTitle: "", metaDesc: "", isPublished: false, focusKeyword: "" }); }
    function openCreate() { resetForm(); setEditingPost(null); setShowCreate(true); }
    function openEdit(post: Post) { setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt || "", content: post.content, coverImage: post.coverImage || "", author: post.author, category: post.category || "", tags: post.tags || "", metaTitle: post.metaTitle || "", metaDesc: post.metaDesc || "", isPublished: post.isPublished, focusKeyword: "" }); setEditingPost(post); setShowCreate(true); }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, insertInline = false) {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        const fd = new FormData(); fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        if (res.ok) {
            const d = await res.json();
            if (insertInline) {
                const imgTag = `<img src="${d.url}" alt="${file.name.split('.')[0]}" style="max-width:100%;border-radius:4px;margin:16px 0" />`;
                contentRef.current?.focus();
                document.execCommand("insertHTML", false, imgTag);
                handleContentInput();
                toast.success("Image inserted");
            } else {
                setForm({ ...form, coverImage: d.url }); toast.success("Cover uploaded");
            }
        } else toast.error("Upload failed");
        setUploading(false);
        e.target.value = "";
    }

    function execFormat(command: string, value?: string) {
        document.execCommand(command, false, value || "");
        contentRef.current?.focus();
    }

    function getContentHTML(): string {
        return contentRef.current?.innerHTML || "";
    }

    function handleContentInput() {
        setForm(prev => ({ ...prev, content: contentRef.current?.innerHTML || "" }));
    }

    async function savePost(publish?: boolean) {
        const content = getContentHTML();
        const currentForm = { ...form, content };
        if (!currentForm.title || !currentForm.content) return toast.error("Title and content required");
        if (!currentForm.slug) currentForm.slug = currentForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
        setSaving(true);
        if (publish !== undefined) currentForm.isPublished = publish;
        const payload = { ...currentForm }; delete (payload as Record<string, unknown>).focusKeyword;
        if (publish) (payload as Record<string, unknown>).publishedAt = new Date().toISOString();
        if (editingPost) {
            const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingPost.id, ...payload }) });
            if (res.ok) { setPosts(posts.map(p => p.id === editingPost.id ? { ...p, ...payload } as Post : p)); toast.success(publish ? "Published!" : "Draft saved"); setShowCreate(false); } else toast.error("Failed");
        } else {
            const res = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            if (res.ok) { const d = await res.json(); setPosts([d.post, ...posts]); toast.success(publish ? "Published!" : "Draft saved"); setShowCreate(false); } else toast.error("Failed");
        }
        setSaving(false);
    }

    function previewPost() {
        const content = getContentHTML();
        const previewHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${form.metaTitle || form.title}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e293b;line-height:1.7;background:#fff}.header{background:#f8fafc;padding:80px 20px 40px;border-bottom:1px solid #e2e8f0}.header-inner{max-width:720px;margin:0 auto}.cat{display:inline-block;background:#6366f110;color:#6366f1;font-size:11px;font-weight:600;padding:3px 10px;border-radius:4px;margin-bottom:12px}h1{font-size:2.2rem;font-weight:700;color:#0f172a;line-height:1.25;margin-bottom:14px}.meta{font-size:13px;color:#64748b}.cover-wrap{max-width:720px;margin:0 auto;padding:32px 20px 0}.cover-wrap img{width:100%;border-radius:6px;object-fit:cover;aspect-ratio:2/1}.content-wrap{max-width:720px;margin:0 auto;padding:32px 20px 60px}.content{font-size:16px;line-height:1.85;color:#334155}.content h2{font-size:1.4rem;font-weight:700;color:#0f172a;margin:2rem 0 .75rem}.content h3{font-size:1.15rem;font-weight:600;color:#0f172a;margin:1.5rem 0 .5rem}.content p{margin-bottom:1.2rem}.content ul,.content ol{padding-left:1.4em;margin-bottom:1.2rem}.content li{margin-bottom:.4rem}.content a{color:#6366f1;font-weight:500}.content img{max-width:100%;border-radius:6px;margin:1.5rem 0}.content strong{color:#0f172a}.content blockquote{border-left:3px solid #6366f1;padding-left:16px;margin:1.5rem 0;color:#64748b;font-style:italic}</style></head><body><div class="header"><div class="header-inner">${form.category ? `<span class="cat">${form.category}</span>` : ""}<h1>${form.title}</h1><div class="meta">${form.author} &bull; ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div></div></div>${form.coverImage ? `<div class="cover-wrap"><img src="${form.coverImage}" alt="${form.title}" /></div>` : ""}<div class="content-wrap"><div class="content">${content}</div></div></body></html>`;
        const blob = new Blob([previewHTML], { type: "text/html" });
        window.open(URL.createObjectURL(blob), "_blank");
    }

    async function deletePost(id: number) { if (!confirm("Delete this article?")) return; const res = await fetch("/api/admin/blog", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); if (res.ok) { setPosts(posts.filter(p => p.id !== id)); toast.success("Deleted"); } }
    async function togglePublish(id: number, current: boolean) { const res = await fetch("/api/admin/blog", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isPublished: !current, publishedAt: !current ? new Date().toISOString() : null }) }); if (res.ok) { setPosts(posts.map(p => p.id === id ? { ...p, isPublished: !current } : p)); } }

    const filtered = posts.filter(p => { const mf = filter === "all" || (filter === "published" ? p.isPublished : !p.isPublished); const ms = !search || p.title.toLowerCase().includes(search.toLowerCase()); return mf && ms; });
    const seo = calculateSEO(form);

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-indigo-400" /></div>;

    // ─── EDITOR VIEW ─────────────────────────────────────────────
    if (showCreate) {
        const metaSlug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
        return (
            <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-slate-800">{editingPost ? "Edit Article" : "New Article"}</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setShowCreate(false)} className="text-slate-500 hover:text-slate-700 hover:bg-slate-100">
                            <X className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => savePost(false)} disabled={saving} className="border-slate-200 hover:bg-slate-50">
                            {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />} Save Draft
                        </Button>
                        <Button variant="outline" size="sm" onClick={previewPost} className="border-slate-200 hover:bg-slate-50">
                            <Eye className="w-3.5 h-3.5 mr-1" /> Preview
                        </Button>
                        <Button size="sm" onClick={() => savePost(true)} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                            {saving ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Globe className="w-3.5 h-3.5 mr-1" />} Publish Live
                        </Button>
                    </div>
                </div>

                {/* SEO Score Bar */}
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center gap-4 mb-3">
                        <div className={`text-2xl font-bold ${seo.score >= 70 ? "text-indigo-600" : seo.score >= 40 ? "text-amber-500" : "text-rose-500"}`}>{seo.score}%</div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-slate-700">SEO Score</span>
                                <span className="text-[11px] text-slate-400">{seo.passed}/{seo.total} passed</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                                <div className={`h-full transition-all rounded-sm ${seo.score >= 70 ? "bg-indigo-500" : seo.score >= 40 ? "bg-amber-400" : "bg-rose-400"}`} style={{ width: `${seo.score}%` }} />
                            </div>
                        </div>
                        <Input value={form.focusKeyword} onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })} placeholder="Focus keyword..." className="w-48 h-8 text-xs border-slate-200 rounded-md" />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5">
                        {seo.checks.map((c) => (
                            <div key={c.label} className={`flex items-center gap-1.5 text-[11px] px-2 py-1.5 rounded-sm ${c.pass ? "bg-indigo-50 text-indigo-700" : "bg-slate-50 text-slate-400"}`}>
                                {c.pass ? <CheckCircle className="w-3 h-3 flex-shrink-0" /> : <XCircle className="w-3 h-3 flex-shrink-0" />}
                                <span className="truncate">{c.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-4">
                        {/* Title */}
                        <Input value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value, slug: form.slug || "" }); }} placeholder="Article title..." className="text-base font-semibold h-11 border-slate-200 rounded-md" />
                        {/* Slug */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md">
                            <span className="text-[11px] text-slate-400 font-mono">/blog/</span>
                            <input value={metaSlug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })} className="flex-1 text-[11px] font-mono text-slate-600 bg-transparent outline-none" placeholder="article-slug" />
                        </div>
                        {/* Excerpt */}
                        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary for search results..." rows={2} className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 resize-none transition-all" />

                        {/* Rich Text Editor */}
                        <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
                            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-slate-100 bg-slate-50/50">
                                <button onClick={() => execFormat("bold")} className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors" title="Bold"><Bold className="w-4 h-4" /></button>
                                <button onClick={() => execFormat("italic")} className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors" title="Italic"><Italic className="w-4 h-4" /></button>
                                <div className="w-px h-4 bg-slate-200 mx-1.5" />
                                <button onClick={() => execFormat("formatBlock", "h2")} className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors" title="H2"><Heading2 className="w-4 h-4" /></button>
                                <button onClick={() => execFormat("formatBlock", "h3")} className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors" title="H3"><Heading3 className="w-4 h-4" /></button>
                                <div className="w-px h-4 bg-slate-200 mx-1.5" />
                                <button onClick={() => execFormat("insertUnorderedList")} className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors" title="List"><List className="w-4 h-4" /></button>
                                <button onClick={() => { const url = prompt("Enter URL:"); if (url) execFormat("createLink", url); }} className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors" title="Link"><Link2 className="w-4 h-4" /></button>
                                <div className="w-px h-4 bg-slate-200 mx-1.5" />
                                <label className="p-1.5 rounded-sm hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer" title="Insert Image">
                                    <ImageIcon className="w-4 h-4" />
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, true)} />
                                </label>
                                {uploading && <Loader2 className="w-4 h-4 animate-spin text-indigo-400 ml-2" />}
                            </div>
                            <div
                                ref={contentRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={handleContentInput}
                                className="w-full px-4 py-3 text-sm leading-relaxed min-h-[420px] outline-none prose prose-sm prose-slate max-w-none"
                                style={{ whiteSpace: "pre-wrap" }}
                                dangerouslySetInnerHTML={{ __html: form.content }}
                            />
                        </div>

                        {/* SEO Meta + Google Preview (below content) */}
                        <div className="border border-slate-200 rounded-md p-4 bg-white space-y-4">
                            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500" /> SEO & Meta</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[11px] font-medium text-slate-500 mb-1 block">Meta Title</label>
                                    <Input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} placeholder="50-60 characters recommended" className="h-9 text-sm border-slate-200 rounded-md" />
                                    <span className={`text-[10px] mt-0.5 block ${form.metaTitle.length >= 50 && form.metaTitle.length <= 60 ? "text-indigo-500" : "text-slate-400"}`}>{form.metaTitle.length}/60</span>
                                </div>
                                <div>
                                    <label className="text-[11px] font-medium text-slate-500 mb-1 block">Meta Description</label>
                                    <textarea value={form.metaDesc} onChange={(e) => setForm({ ...form, metaDesc: e.target.value })} placeholder="120-155 characters recommended" rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-400 resize-none" />
                                    <span className={`text-[10px] mt-0.5 block ${form.metaDesc.length >= 120 && form.metaDesc.length <= 155 ? "text-indigo-500" : "text-slate-400"}`}>{form.metaDesc.length}/155</span>
                                </div>
                            </div>
                            {/* Google Preview */}
                            <div className="border border-slate-100 rounded-md p-3 bg-slate-50/50">
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-2">Google Search Preview</p>
                                <div className="space-y-0.5">
                                    <p className="text-sm text-indigo-700 font-medium truncate">{form.metaTitle || form.title || "Page Title"}</p>
                                    <p className="text-[11px] text-emerald-700 font-mono truncate">rceyebijnor.com/blog/{metaSlug || "article-slug"}</p>
                                    <p className="text-xs text-slate-500 line-clamp-2">{form.metaDesc || form.excerpt || "Meta description will appear here..."}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Actions */}
                        <div className="border border-slate-200 rounded-md p-4 bg-white space-y-2">
                            <Button variant="outline" className="w-full justify-center border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md" size="sm" onClick={() => savePost(false)} disabled={saving}>
                                {saving ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />} Save Draft
                            </Button>
                            <Button variant="outline" className="w-full justify-center border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md" size="sm" onClick={previewPost}>
                                <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                            </Button>
                            <Button className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm" size="sm" onClick={() => savePost(true)} disabled={saving}>
                                {saving ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Globe className="w-3.5 h-3.5 mr-1.5" />} Publish Live
                            </Button>
                        </div>

                        {/* Cover Image */}
                        <div className="border border-slate-200 rounded-md p-4 bg-white">
                            <h4 className="text-xs font-semibold text-slate-700 mb-3">Cover Image</h4>
                            {form.coverImage ? (
                                <div className="relative rounded-md overflow-hidden border border-slate-200">
                                    <img src={form.coverImage} alt="" className="w-full h-32 object-cover" />
                                    <button onClick={() => setForm({ ...form, coverImage: "" })} className="absolute top-1.5 right-1.5 p-1 bg-slate-900/70 text-white rounded-sm hover:bg-slate-900 transition-colors"><X className="w-3 h-3" /></button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center py-8 border border-dashed border-slate-300 rounded-md text-slate-400 hover:text-indigo-500 hover:border-indigo-300 cursor-pointer transition-colors">
                                    <Upload className="w-5 h-5 mb-1" /><span className="text-[11px]">Upload image</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, false)} />
                                </label>
                            )}
                        </div>

                        {/* Category & Tags */}
                        <div className="border border-slate-200 rounded-md p-4 bg-white space-y-3">
                            <h4 className="text-xs font-semibold text-slate-700">Details</h4>
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-indigo-400 bg-white">
                                <option value="">Select Category</option>
                                <option value="Eye Care">Eye Care</option>
                                <option value="Dental">Dental</option>
                                <option value="Surgery">Surgery</option>
                                <option value="Wellness">Wellness</option>
                                <option value="Awareness">Awareness</option>
                            </select>
                            <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Tags: cataract, surgery..." className="h-9 text-sm border-slate-200 rounded-md" />
                            <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author name" className="h-9 text-sm border-slate-200 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── LIST VIEW ──────────────────────────────────────────────
    const publishedCount = posts.filter(p => p.isPublished).length;
    const draftCount = posts.filter(p => !p.isPublished).length;
    const totalWords = posts.reduce((acc, p) => acc + p.content.split(/\s+/).length, 0);
    const categories = posts.reduce((acc, p) => { if (p.category) acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {} as Record<string, number>);

    // Monthly post counts
    const monthlyData = (() => {
        const months: { month: string; posts: number }[] = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const label = d.toLocaleDateString("en-IN", { month: "short" });
            const count = posts.filter(p => { const pd = new Date(p.createdAt); return pd.getMonth() === d.getMonth() && pd.getFullYear() === d.getFullYear(); }).length;
            months.push({ month: label, posts: count });
        }
        return months;
    })();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800">Blog & Content</h1>
                    <p className="text-slate-400 text-sm mt-0.5">Manage articles and grow organic traffic</p>
                </div>
                <Button onClick={openCreate} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm">
                    <Plus className="w-4 h-4 mr-1.5" /> New Article
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">{posts.length}</p>
                        </div>
                        <div className="w-9 h-9 rounded-md bg-indigo-50 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-indigo-500" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                        <TrendingUp className="w-3 h-3" /> All time articles
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Published</p>
                            <p className="text-2xl font-bold text-indigo-600 mt-1">{publishedCount}</p>
                        </div>
                        <div className="w-9 h-9 rounded-md bg-indigo-50 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-indigo-500" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-indigo-400">
                        <CheckCircle className="w-3 h-3" /> Live on website
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Drafts</p>
                            <p className="text-2xl font-bold text-amber-500 mt-1">{draftCount}</p>
                        </div>
                        <div className="w-9 h-9 rounded-md bg-amber-50 flex items-center justify-center">
                            <PenLine className="w-4 h-4 text-amber-500" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                        <Edit className="w-3 h-3" /> Pending review
                    </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Words</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">{totalWords.toLocaleString()}</p>
                        </div>
                        <div className="w-9 h-9 rounded-md bg-violet-50 flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-violet-500" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                        <Tag className="w-3 h-3" /> Total content
                    </div>
                </div>
            </div>

            {/* Chart + Categories */}
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Publishing Chart */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700">Publishing Activity</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5">Last 6 months</p>
                        </div>
                        <BarChart3 className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="flex items-end gap-4 h-28">
                        {monthlyData.map((d) => {
                            const maxVal = Math.max(...monthlyData.map(m => m.posts), 1);
                            const height = (d.posts / maxVal) * 100;
                            return (
                                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                                    <span className="text-[11px] font-semibold text-slate-600">{d.posts}</span>
                                    <div className="w-full bg-slate-100 relative" style={{ height: "72px" }}>
                                        <div
                                            className="absolute bottom-0 w-full bg-indigo-500 transition-all hover:bg-indigo-400"
                                            style={{ height: `${Math.max(height, 6)}%`, borderRadius: "2px 2px 0 0" }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-400">{d.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white border border-slate-200 rounded-md p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-slate-700">Categories</h3>
                        <Tag className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="space-y-3">
                        {Object.entries(categories).length > 0 ? Object.entries(categories).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                            <div key={cat} className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">{cat}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-14 h-1.5 bg-slate-100 overflow-hidden rounded-sm">
                                        <div className="h-full bg-indigo-400 rounded-sm" style={{ width: `${(count / posts.length) * 100}%` }} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 w-4 text-right">{count}</span>
                                </div>
                            </div>
                        )) : (
                            <p className="text-xs text-slate-400">No categories yet</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white border border-slate-200 rounded-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-slate-100">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 border-slate-200 rounded-md text-sm" />
                    </div>
                    <Tabs value={filter} onValueChange={setFilter}>
                        <TabsList className="h-8 bg-slate-100 rounded-md">
                            <TabsTrigger value="all" className="text-[11px] px-3 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">All ({posts.length})</TabsTrigger>
                            <TabsTrigger value="published" className="text-[11px] px-3 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Published ({publishedCount})</TabsTrigger>
                            <TabsTrigger value="draft" className="text-[11px] px-3 rounded-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">Drafts ({draftCount})</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div>
                    {filtered.length === 0 ? (
                        <div className="text-center py-16">
                            <FileText className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                            <p className="text-sm font-medium text-slate-500">No articles found</p>
                            <p className="text-xs text-slate-400 mt-1">Start creating content for your blog</p>
                            <Button onClick={openCreate} size="sm" className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"><Plus className="w-4 h-4 mr-1" /> Create</Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/80 border-b border-slate-100">
                                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Article</TableHead>
                                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Category</TableHead>
                                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Words</TableHead>
                                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Date</TableHead>
                                    <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(post => (
                                    <TableRow key={post.id} className="group border-b border-slate-50 hover:bg-indigo-50/30 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                {post.coverImage ? (
                                                    <img src={post.coverImage} alt="" className="w-12 h-9 rounded-sm object-cover border border-slate-200" />
                                                ) : (
                                                    <div className="w-12 h-9 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                        <FileText className="w-3.5 h-3.5 text-slate-300" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-sm text-slate-800 line-clamp-1">{post.title}</div>
                                                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">/blog/{post.slug}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {post.category && <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">{post.category}</span>}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`text-[11px] font-medium px-2 py-0.5 rounded-sm cursor-pointer transition-colors ${post.isPublished ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200" : "bg-amber-100 text-amber-600 hover:bg-amber-200"}`}
                                                onClick={() => togglePublish(post.id, post.isPublished)}
                                            >
                                                {post.isPublished ? "Live" : "Draft"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs text-slate-500">{post.content.split(/\s+/).length.toLocaleString()}</TableCell>
                                        <TableCell className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-0.5 justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-sm hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 transition-colors" onClick={() => openEdit(post)} title="Edit">
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                {post.isPublished && (
                                                    <button className="p-1.5 rounded-sm hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 transition-colors" onClick={() => window.open(`/blog/${post.slug}`, "_blank")} title="View">
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <button className="p-1.5 rounded-sm hover:bg-rose-100 text-slate-400 hover:text-rose-500 transition-colors" onClick={() => deletePost(post.id)} title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}
