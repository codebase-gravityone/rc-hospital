"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Calendar, Eye, Loader2 } from "lucide-react";

export default function AnalyticsPage() {
    const [data, setData] = useState<{ totals: { appointments: number; contactLeads: number }; daily: { date: string; pageViews: number; appointments: number }[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/analytics").then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;

    const totals = data?.totals || { appointments: 0, contactLeads: 0 };
    const daily = data?.daily || [];

    return (
        <div className="space-y-6">
            <div><h2 className="text-xl font-bold text-gray-800">Analytics Overview</h2><p className="text-gray-500 text-sm mt-1">Real-time stats from your database</p></div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Appointments", value: totals.appointments, icon: Calendar, color: "text-blue-600 bg-blue-50" },
                    { label: "Contact Leads", value: totals.contactLeads, icon: Users, color: "text-purple-600 bg-purple-50" },
                    { label: "This Week (DB)", value: daily.reduce((a, d) => a + d.appointments, 0), icon: TrendingUp, color: "text-green-600 bg-green-50" },
                    { label: "Daily Records", value: daily.length, icon: BarChart3, color: "text-amber-600 bg-amber-50" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                    </div>
                ))}
            </div>

            {daily.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Daily Stats</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-gray-100"><th className="text-left py-2 px-3 text-gray-500 text-xs">Date</th><th className="text-left py-2 px-3 text-gray-500 text-xs">Page Views</th><th className="text-left py-2 px-3 text-gray-500 text-xs">Appointments</th><th className="text-left py-2 px-3 text-gray-500 text-xs">Leads</th></tr></thead>
                            <tbody>{daily.map(d => (
                                <tr key={d.date} className="border-b border-gray-50"><td className="py-2 px-3 text-gray-700">{d.date}</td><td className="py-2 px-3">{d.pageViews}</td><td className="py-2 px-3">{d.appointments}</td><td className="py-2 px-3">{(d as unknown as { contactLeads?: number }).contactLeads || 0}</td></tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                💡 <strong>Tip:</strong> Analytics data populates as patients book appointments and submit contact forms. For detailed website traffic, connect Google Analytics to your site.
            </div>
        </div>
    );
}
