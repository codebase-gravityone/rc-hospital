import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";
    const isApiAuthRoute = pathname.startsWith("/api/auth");

    // Don't intercept auth API routes or the login page
    if (isApiAuthRoute || isLoginPage) {
        return NextResponse.next();
    }

    // For admin routes, check for session token cookie
    if (isAdminRoute) {
        const token =
            request.cookies.get("authjs.session-token") ??
            request.cookies.get("__Secure-authjs.session-token");

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
