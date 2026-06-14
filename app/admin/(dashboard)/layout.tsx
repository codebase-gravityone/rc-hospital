import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import SessionWrapper from "@/components/admin/SessionWrapper";

export const dynamic = "force-dynamic";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionWrapper>
            <div className="min-h-screen bg-gray-50 flex">
                <AdminSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    <AdminHeader />
                    <main className="flex-1 p-6 overflow-auto">{children}</main>
                </div>
            </div>
        </SessionWrapper>
    );
}
