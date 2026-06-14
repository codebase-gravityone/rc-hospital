import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center max-w-md">
                <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
                <p className="text-gray-500 text-sm mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/" className="px-6 py-3 bg-[#1a5f3a] text-white rounded-full font-semibold text-sm hover:bg-[#28845a] transition-all">Go Home</Link>
                    <Link href="/contact" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}
