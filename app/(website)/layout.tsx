import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import FloatingButtons from "@/components/website/FloatingButtons";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingButtons />
        </>
    );
}
