"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Phone, Trash2, Loader2 } from "lucide-react";

interface Lead { id: number; name: string; phone: string; email: string | null; subject: string | null; message: string; isRead: boolean; createdAt: string; }

export default function ContactLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/admin/contacts").then(r => r.json()).then(d => { setLeads(d.leads || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    async function markRead(id: number) {
        await fetch("/api/admin/contacts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, isRead: true }) });
        setLeads(leads.map(l => l.id === id ? { ...l, isRead: true } : l));
    }

    async function deleteLead(id: number) {
        await fetch("/api/admin/contacts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
        setLeads(leads.filter(l => l.id !== id)); setSelected(null);
    }

    const activeLead = leads.find(l => l.id === selected);

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

    return (
        <div className="space-y-6">
            <div><h2 className="text-xl font-bold text-gray-800">Contact Leads</h2><p className="text-gray-500 text-sm mt-1">Enquiries from the contact form ({leads.length})</p></div>
            <div className="grid lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                        {leads.length === 0 ? <p className="text-gray-400 text-sm text-center py-10">No leads yet</p> : leads.map((lead) => (
                            <button key={lead.id} onClick={() => { setSelected(lead.id); markRead(lead.id); }} className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selected === lead.id ? "bg-gray-50" : ""}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    {lead.isRead ? <MailOpen className="w-3.5 h-3.5 text-gray-300" /> : <Mail className="w-3.5 h-3.5 text-blue-500" />}
                                    <span className={`text-sm ${lead.isRead ? "text-gray-600" : "font-semibold text-gray-900"}`}>{lead.name}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate ml-6">{lead.subject || lead.message}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
                    {activeLead ? (
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div><h3 className="font-bold text-gray-900">{activeLead.name}</h3><p className="text-sm text-gray-500">{activeLead.subject}</p></div>
                                <button onClick={() => deleteLead(activeLead.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                            <div className="flex gap-4 mb-4 text-sm">
                                <span className="flex items-center gap-1.5 text-gray-600"><Phone className="w-3.5 h-3.5" />{activeLead.phone}</span>
                                {activeLead.email && <span className="flex items-center gap-1.5 text-gray-600"><Mail className="w-3.5 h-3.5" />{activeLead.email}</span>}
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{activeLead.message}</div>
                            <div className="mt-4 flex gap-2">
                                <a href={`tel:${activeLead.phone}`} className="px-4 py-2 bg-[#1a5f3a] text-white rounded-lg text-xs font-semibold">Call</a>
                                <a href={`https://wa.me/${activeLead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#25d366] text-white rounded-lg text-xs font-semibold">WhatsApp</a>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-400"><Mail className="w-10 h-10 mx-auto mb-3 opacity-30" /><p className="text-sm">Select a lead to view details</p></div>
                    )}
                </div>
            </div>
        </div>
    );
}
