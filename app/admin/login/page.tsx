"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        } else {
            router.push("/admin");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d2748] to-[#1b3a6b] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <Image src="/Logo_rc.png" alt="R.C. Eye & Dental Hospital" width={48} height={48} className="rounded-xl" />
                        <div className="text-left">
                            <div className="font-playfair text-white font-bold text-lg leading-tight">R.C. Eye & Dental</div>
                            <div className="text-[#c9922a] text-xs font-bold tracking-[2px] uppercase">Admin Panel</div>
                        </div>
                    </div>
                    <p className="text-white/50 text-sm">Sign in to manage your hospital website</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                    <h1 className="font-playfair text-2xl font-bold text-[#0d2748] mb-6 text-center">Welcome Back</h1>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-5 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#0d2748] mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@rceyehospital.com"
                                className="w-full px-4 py-3 border border-[#dde3ee] rounded-xl text-sm outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/10 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#0d2748] mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-11 border border-[#dde3ee] rounded-xl text-sm outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/10 transition-all"
                                />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#718096] hover:text-[#0d2748]">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#0d2748] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#1b3a6b] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
                <p className="text-center text-white/30 text-xs mt-6">© 2026 R.C. Eye & Dental Hospital</p>
            </div>
        </div>
    );
}
