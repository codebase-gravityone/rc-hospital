"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
    const { data: session } = useSession();

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="pl-10 md:pl-0">
                <h1 className="text-gray-800 font-semibold text-lg">Admin Dashboard</h1>
                <p className="text-gray-500 text-xs">R.C. Eye & Dental Hospital, Bijnor</p>
            </div>
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-gray-500 relative">
                    <Bell className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0d2748] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {session?.user?.name?.charAt(0) ?? "A"}
                    </div>
                    <div className="hidden sm:block text-left">
                        <div className="text-sm font-semibold text-gray-800">{session?.user?.name ?? "Admin"}</div>
                        <div className="text-xs text-gray-500">{session?.user?.email}</div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
