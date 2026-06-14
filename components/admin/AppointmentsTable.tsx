"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Search, Filter } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
    id: number;
    patientName: string;
    phone: string;
    department: string;
    preferredDate: string;
    status: string;
    createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    confirmed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function AppointmentsTable() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        fetch("/api/admin/appointments")
            .then((r) => r.json())
            .then((d) => { setAppointments(d.appointments ?? []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    async function updateStatus(id: number, status: string) {
        startTransition(async () => {
            const res = await fetch(`/api/admin/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
                toast.success(`Appointment ${status}`);
            } else {
                toast.error("Update failed");
            }
        });
    }

    const filtered = appointments.filter((a) => {
        const matchFilter = filter === "all" || a.status === filter;
        const matchSearch = !search || a.patientName.toLowerCase().includes(search.toLowerCase()) || a.phone.includes(search);
        return matchFilter && matchSearch;
    });

    if (loading) {
        return (
            <Card><CardContent className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </CardContent></Card>
        );
    }

    return (
        <Card className="border-gray-200">
            <CardContent className="p-0">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 p-5 border-b border-gray-100">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patient or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#c9922a] focus:ring-1 focus:ring-[#c9922a] outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "pending", "confirmed", "cancelled"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
                  ${filter === f ? "bg-[#0d2748] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <div className="text-4xl mb-3">📋</div>
                            <div className="font-medium">No appointments found</div>
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    {["#", "Patient", "Phone", "Department", "Date", "Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left py-3 px-4 text-gray-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((appt) => (
                                    <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="py-3.5 px-4 text-gray-400 text-xs">{appt.id}</td>
                                        <td className="py-3.5 px-4 font-semibold text-gray-800">{appt.patientName}</td>
                                        <td className="py-3.5 px-4 text-gray-500">{appt.phone}</td>
                                        <td className="py-3.5 px-4 text-gray-600 capitalize">{appt.department}</td>
                                        <td className="py-3.5 px-4 text-gray-500">{appt.preferredDate}</td>
                                        <td className="py-3.5 px-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${STATUS_COLORS[appt.status] ?? "bg-gray-100 text-gray-600"}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {appt.status === "pending" && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => updateStatus(appt.id, "confirmed")}
                                                        disabled={isPending}
                                                        className="h-7 px-2.5 bg-green-600 hover:bg-green-700 text-white text-xs"
                                                    >
                                                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Confirm
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => updateStatus(appt.id, "cancelled")}
                                                        disabled={isPending}
                                                        className="h-7 px-2.5 text-red-500 border-red-200 hover:bg-red-50 text-xs"
                                                    >
                                                        <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
