import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/siteData";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.seo.siteUrl),
  title: { default: SITE.seo.defaultTitle, template: `%s | R.C. Eye & Dental Hospital` },
  description: SITE.seo.defaultDescription,
  keywords: SITE.seo.keywords,
  openGraph: { type: "website", locale: "en_IN", url: SITE.seo.siteUrl, siteName: SITE.name, title: SITE.seo.defaultTitle, description: SITE.seo.defaultDescription, images: [{ url: SITE.seo.ogImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: SITE.seo.defaultTitle, description: SITE.seo.defaultDescription, images: [SITE.seo.ogImage] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-1TWF0XQRCT" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-1TWF0XQRCT');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hospital",
              name: SITE.name,
              image: `${SITE.seo.siteUrl}${SITE.seo.ogImage}`,
              url: SITE.seo.siteUrl,
              telephone: SITE.phone,
              address: { "@type": "PostalAddress", streetAddress: "Opp. Vaishno Vihar, Bairaj Road", addressLocality: "Bijnor", addressRegion: "Uttar Pradesh", postalCode: "246701", addressCountry: "IN" },
              openingHours: ["Mo-Sa 10:00-18:00", "Su 10:00-14:00"],
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "210" },
              medicalSpecialty: ["Ophthalmology", "Dentistry"],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
