"use client";

import { useState, useEffect } from "react";
import { Send, Plus, Trash2, Copy, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/lib/siteData";

interface Template { id: number; name: string; message: string; isActive: boolean; }

export default function WhatsAppPage() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNew, setShowNew] = useState(false);
    const [newName, setNewName] = useState("");
    const [newMsg, setNewMsg] = useState("");
    const [testPhone, setTestPhone] = useState("");

    useEffect(() => {
        fetch("/api/admin/whatsapp-templates").then(r => r.json()).then(d => { setTemplates(d.templates || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    async function addTemplate() {
        if (!newName || !newMsg) return toast.error("Both fields required");
        const res = await fetch("/api/admin/whatsapp-templates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName, message: newMsg }) });
        if (res.ok) { const d = await res.json(); setTemplates([...templates, d.template]); setNewName(""); setNewMsg(""); setShowNew(false); toast.success("Template added"); }
        else toast.error("Failed");
    }

    async function deleteTemplate(id: number) {
        const res = await fetch("/api/admin/whatsapp-templates", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        if (res.ok) { setTemplates(templates.filter(t => t.id !== id)); toast.success("Deleted"); }
    }

    function sendTest(msg: string) {
        const phone = testPhone || SITE.whatsapp.replace(/\D/g, "");
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg.replace("{name}", "Patient").replace("{date}", "Tomorrow"))}`, "_blank");
    }

    function copyMsg(msg: string) { navigator.clipboard.writeText(msg); toast.success("Copied"); }

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div><h2 className="text-xl font-bold text-gray-800">WhatsApp Templates</h2><p className="text-gray-500 text-sm mt-1">Quick reply messages for patients</p></div>
                <button onClick={() => setShowNew(true)} className="px-4 py-2.5 bg-[#25d366] text-white rounded-lg text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> New</button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <input value={testPhone} onChange={(e) => setTestPhone(e.target.value)} placeholder="Test phone (e.g. 919876543210)" className="flex-1 text-sm outline-none" />
            </div>

            {showNew && (
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Template name" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#25d366]" />
                    <textarea value={newMsg} onChange={(e) => setNewMsg(e.target.value)} placeholder="Message (use {name}, {date})" rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#25d366]" />
                    <div className="flex gap-2"><button onClick={addTemplate} className="px-4 py-2 bg-[#25d366] text-white rounded-lg text-xs font-semibold">Save</button><button onClick={() => setShowNew(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">Cancel</button></div>
                </div>
            )}

            <div className="space-y-3">
                {templates.length === 0 ? <p className="text-gray-400 text-sm text-center py-10">No templates. Add one!</p> : templates.map((t) => (
                    <div key={t.id} className="bg-white rounded-xl border border-gray-200 p-5">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 text-sm">{t.name}</h3>
                            <button onClick={() => deleteTemplate(t.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 leading-relaxed mb-3 font-mono text-xs">{t.message}</div>
                        <div className="flex gap-2">
                            <button onClick={() => sendTest(t.message)} className="px-3 py-1.5 bg-[#25d366] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"><Send className="w-3 h-3" /> Send Test</button>
                            <button onClick={() => copyMsg(t.message)} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold flex items-center gap-1.5"><Copy className="w-3 h-3" /> Copy</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
