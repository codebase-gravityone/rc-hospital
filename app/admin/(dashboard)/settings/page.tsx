"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<Record<string, string>>({
        phone_primary: "+91 8171742659",
        phone_whatsapp: "+91 9837056360",
        address: "Opp. Vaishno Vihar, Bairaj Road, Bijnor, Uttar Pradesh – 246701",
        opd_weekdays: "Mon – Sat: 10:00 AM – 6:00 PM",
        opd_sunday: "Sunday: 10:00 AM – 2:00 PM",
        patient_count: "10000",
        notify_email: "rceyehospital@gmail.com",
        notify_on_appointment: "email,whatsapp",
    });

    useEffect(() => {
        fetch("/api/admin/settings").then(r => r.json()).then(d => {
            if (d.settings) {
                const map: Record<string, string> = {};
                Object.entries(d.settings).forEach(([k, v]) => { map[k] = typeof v === "string" ? v : JSON.stringify(v); });
                setSettings(prev => ({ ...prev, ...map }));
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    async function saveAll() {
        setSaving(true);
        for (const [key, value] of Object.entries(settings)) {
            await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, value }) });
        }
        setSaving(false);
        toast.success("All settings saved");
    }

    function update(key: string, value: string) { setSettings(prev => ({ ...prev, [key]: value })); }

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

    return (
        <div className="space-y-6">
            <div><h2 className="text-xl font-bold text-gray-800">Site Settings</h2><p className="text-gray-500 text-sm mt-1">Hospital info, patient counter, notifications</p></div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                    <h3 className="font-semibold text-gray-800 text-sm">Hospital Information</h3>
                    <div><label className="text-xs text-gray-500 font-medium">Phone</label><input value={settings.phone_primary} onChange={(e) => update("phone_primary", e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                    <div><label className="text-xs text-gray-500 font-medium">WhatsApp</label><input value={settings.phone_whatsapp} onChange={(e) => update("phone_whatsapp", e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                    <div><label className="text-xs text-gray-500 font-medium">Address</label><textarea value={settings.address} onChange={(e) => update("address", e.target.value)} rows={2} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs text-gray-500 font-medium">OPD Weekdays</label><input value={settings.opd_weekdays} onChange={(e) => update("opd_weekdays", e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                        <div><label className="text-xs text-gray-500 font-medium">OPD Sunday</label><input value={settings.opd_sunday} onChange={(e) => update("opd_sunday", e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                        <h3 className="font-semibold text-gray-800 text-sm">Patient Counter</h3>
                        <p className="text-xs text-gray-500">Shows on website as &quot;{Number(settings.patient_count).toLocaleString()}+ Happy Patients&quot;</p>
                        <input type="number" value={settings.patient_count} onChange={(e) => update("patient_count", e.target.value)} className="w-40 px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-lg" />
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                        <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                        <div><label className="text-xs text-gray-500 font-medium">Notify Email</label><input value={settings.notify_email} onChange={(e) => update("notify_email", e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                        <div><label className="text-xs text-gray-500 font-medium">Notify on Appointment (comma-sep: email,sms,whatsapp)</label><input value={settings.notify_on_appointment} onChange={(e) => update("notify_on_appointment", e.target.value)} className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm" /></div>
                    </div>
                </div>
            </div>

            <button onClick={saveAll} disabled={saving} className="px-6 py-3 bg-[#1a5f3a] text-white rounded-lg text-sm font-semibold hover:bg-[#28845a] flex items-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save All Settings
            </button>
        </div>
    );
}
