import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Dev fallback credentials (used when DATABASE_URL is placeholder)
const DEV_ADMIN = {
    email: "admin@rceyehospital.com",
    password: "$2b$12$JkGPwCBW/UQe4uNO07vav.UJro0L1TqSkhu7fbGtbku2ofXQzjbA2", // Admin@123
    name: "Admin",
};

async function authorizeUser(email: string, password: string) {
    // Try database first
    const isRealDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("user:password");

    if (isRealDb) {
        try {
            const { db } = await import("@/lib/db");
            const { adminUsers } = await import("@/lib/db/schema");
            const { eq } = await import("drizzle-orm");

            const user = await db
                .select()
                .from(adminUsers)
                .where(eq(adminUsers.email, email))
                .limit(1);

            if (!user[0]) return null;

            const valid = await bcrypt.compare(password, user[0].password);
            if (!valid) return null;

            return { id: String(user[0].id), email: user[0].email, name: user[0].name };
        } catch (e) {
            console.error("DB auth failed, falling back to dev mode:", e);
        }
    }

    // Fallback: dev hardcoded credentials
    if (email === DEV_ADMIN.email) {
        const valid = await bcrypt.compare(password, DEV_ADMIN.password);
        if (valid) return { id: "1", email: DEV_ADMIN.email, name: DEV_ADMIN.name };
    }

    return null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                return authorizeUser(credentials.email as string, credentials.password as string);
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id as string;
            return session;
        },
    },
});
