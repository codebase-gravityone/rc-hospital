"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2, Search, Phone } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Appointment { id: number; patientName: string; phone: string; department: string; preferredDate: string; status: string; createdAt: string; }

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/admin/appointments").then(r => r.json()).then(d => { setAppointments(d.appointments ?? []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    async function updateStatus(id: number, status: string) {
        const res = await fetch(`/api/admin/appointments/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
        if (res.ok) { setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a)); toast.success(`Appointment ${status}`); }
        else toast.error("Update failed");
    }

    const filtered = appointments.filter(a => {
        const matchFilter = filter === "all" || a.status === filter;
        const matchSearch = !search || a.patientName.toLowerCase().includes(search.toLowerCase()) || a.phone.includes(search);
        return matchFilter && matchSearch;
    });

    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
                <p className="text-muted-foreground text-sm mt-1">Manage all patient appointment requests</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total", value: appointments.length, variant: "default" as const },
                    { label: "Pending", value: appointments.filter(a => a.status === "pending").length, variant: "secondary" as const },
                    { label: "Confirmed", value: appointments.filter(a => a.status === "confirmed").length, variant: "default" as const },
                ].map(s => (
                    <Card key={s.label}>
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold">{s.value}</div>
                            <p className="text-muted-foreground text-xs">{s.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search patient or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                        </div>
                        <Tabs value={filter} onValueChange={setFilter}>
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent>
                    {filtered.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground"><p className="text-sm">No appointments found</p></div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((appt) => (
                                    <TableRow key={appt.id}>
                                        <TableCell className="font-medium">{appt.patientName}</TableCell>
                                        <TableCell>
                                            <a href={`tel:${appt.phone}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                                                <Phone className="w-3 h-3" />{appt.phone}
                                            </a>
                                        </TableCell>
                                        <TableCell className="capitalize">{appt.department}</TableCell>
                                        <TableCell>{appt.preferredDate}</TableCell>
                                        <TableCell>
                                            <Badge variant={appt.status === "confirmed" ? "default" : appt.status === "pending" ? "secondary" : "destructive"}>
                                                {appt.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {appt.status === "pending" && (
                                                <div className="flex gap-2 justify-end">
                                                    <Button size="sm" variant="default" onClick={() => updateStatus(appt.id, "confirmed")} className="h-7 text-xs bg-green-600 hover:bg-green-700">
                                                        <CheckCircle className="w-3 h-3 mr-1" /> Confirm
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => updateStatus(appt.id, "cancelled")} className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50">
                                                        <XCircle className="w-3 h-3 mr-1" /> Cancel
                                                    </Button>
                                                </div>
                                            )}
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
