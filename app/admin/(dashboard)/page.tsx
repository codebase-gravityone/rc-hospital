"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, MessageSquare, FileText, Image, Stethoscope, Loader2, ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Stats { appointments: number; pending: number; contactLeads: number; blogPosts: number; gallery: number; services: number; }
interface Appointment { id: number; patientName: string; phone: string; department: string; preferredDate: string; status: string; }

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recent, setRecent] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/dashboard").then(r => r.json()).then(d => {
            setStats(d.stats); setRecent(d.recentAppointments || []); setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
    );

    const statCards = [
        { title: "Appointments", value: stats?.appointments || 0, icon: Calendar, description: "Total bookings", trend: "+12%", color: "text-blue-600" },
        { title: "Pending", value: stats?.pending || 0, icon: Users, description: "Needs attention", trend: null, color: "text-amber-600" },
        { title: "Contact Leads", value: stats?.contactLeads || 0, icon: MessageSquare, description: "Enquiries received", trend: "+5%", color: "text-purple-600" },
        { title: "Blog Posts", value: stats?.blogPosts || 0, icon: FileText, description: "Published articles", trend: null, color: "text-green-600" },
        { title: "Gallery", value: stats?.gallery || 0, icon: Image, description: "Photos uploaded", trend: null, color: "text-pink-600" },
        { title: "Services", value: stats?.services || 0, icon: Stethoscope, description: "Active services", trend: null, color: "text-cyan-600" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground text-sm mt-1">Overview of your hospital&apos;s digital presence.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((s) => {
                    const Icon = s.icon;
                    return (
                        <Card key={s.title} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <Icon className={`w-4 h-4 ${s.color}`} />
                                    {s.trend && (
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium text-green-700 bg-green-50">
                                            <TrendingUp className="w-2.5 h-2.5 mr-0.5" />{s.trend}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-2xl font-bold">{s.value}</div>
                                <p className="text-muted-foreground text-xs mt-0.5">{s.title}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Appointments */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-base">Recent Appointments</CardTitle>
                                <CardDescription>Latest patient bookings</CardDescription>
                            </div>
                            <Link href="/admin/appointments" className="inline-flex items-center px-3 py-1.5 text-xs font-medium border border-input rounded-md hover:bg-accent transition-colors">
                                View All
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {recent.length === 0 ? (
                            <p className="text-muted-foreground text-sm text-center py-8">No appointments yet</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recent.map((a) => (
                                        <TableRow key={a.id}>
                                            <TableCell className="font-medium">{a.patientName}</TableCell>
                                            <TableCell className="capitalize">{a.department}</TableCell>
                                            <TableCell>{a.preferredDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={a.status === "confirmed" ? "default" : a.status === "pending" ? "secondary" : "destructive"} className="text-[10px]">
                                                    {a.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Quick Actions</CardTitle>
                        <CardDescription>Manage your hospital</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { label: "Appointments", href: "/admin/appointments", icon: Calendar },
                            { label: "Contact Leads", href: "/admin/contact-leads", icon: MessageSquare },
                            { label: "Blog / Articles", href: "/admin/blog", icon: FileText },
                            { label: "Gallery", href: "/admin/gallery", icon: Image },
                            { label: "Services", href: "/admin/services-editor", icon: Stethoscope },
                            { label: "Settings", href: "/admin/settings", icon: Users },
                        ].map(({ label, href, icon: Icon }) => (
                            <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">{label}</span>
                                </div>
                                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
