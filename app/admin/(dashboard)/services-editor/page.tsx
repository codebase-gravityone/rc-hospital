"use client";

import { useState, useEffect } from "react";
import { Edit, Save, X, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Service { id: number; slug: string; title: string; shortDesc: string; category: string; isActive: boolean; }

export default function ServicesEditorPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");

    useEffect(() => {
        fetch("/api/admin/services").then(r => r.json()).then(d => { setServices(d.services || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    async function saveEdit(id: number) {
        const res = await fetch("/api/admin/services", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, title: editTitle, shortDesc: editDesc }) });
        if (res.ok) { setServices(services.map(s => s.id === id ? { ...s, title: editTitle, shortDesc: editDesc } : s)); setEditing(null); toast.success("Updated"); }
        else toast.error("Failed to update");
    }

    async function toggleActive(id: number, current: boolean) {
        const res = await fetch("/api/admin/services", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isActive: !current }) });
        if (res.ok) { setServices(services.map(s => s.id === id ? { ...s, isActive: !current } : s)); }
    }

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

    return (
        <div className="space-y-6">
            <div><h2 className="text-xl font-bold text-gray-800">Services Editor</h2><p className="text-gray-500 text-sm mt-1">Edit service titles and descriptions</p></div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                    <thead><tr className="border-b border-gray-100 bg-gray-50">
                        <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Service</th>
                        <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Category</th>
                        <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Status</th>
                        <th className="text-left py-3 px-4 text-gray-500 text-xs font-semibold uppercase">Actions</th>
                    </tr></thead>
                    <tbody>
                        {services.map((svc) => (
                            <tr key={svc.id} className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    {editing === svc.id ? (
                                        <div className="space-y-2"><input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm" /><textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={2} className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm" /></div>
                                    ) : (
                                        <div><div className="font-semibold text-gray-900">{svc.title}</div><div className="text-gray-500 text-xs mt-0.5">{svc.shortDesc}</div></div>
                                    )}
                                </td>
                                <td className="py-3 px-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${svc.category === "eye" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}>{svc.category}</span></td>
                                <td className="py-3 px-4"><button onClick={() => toggleActive(svc.id, svc.isActive)} className={`px-2 py-1 rounded text-[10px] font-bold ${svc.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{svc.isActive ? "Active" : "Inactive"}</button></td>
                                <td className="py-3 px-4"><div className="flex gap-2">
                                    {editing === svc.id ? (<><button onClick={() => saveEdit(svc.id)} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"><Save className="w-3.5 h-3.5" /></button><button onClick={() => setEditing(null)} className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"><X className="w-3.5 h-3.5" /></button></>) : (<><button onClick={() => { setEditing(svc.id); setEditTitle(svc.title); setEditDesc(svc.shortDesc); }} className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"><Edit className="w-3.5 h-3.5" /></button><Link href={`/services/${svc.slug}`} target="_blank" className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"><Eye className="w-3.5 h-3.5" /></Link></>)}
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
