import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { ConditionalShell } from "@/components/layout/ConditionalShell";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "Velora Gifts | Handcrafted Cookies & Custom Cash Bouquets",
    template: "%s | Velora Gifts",
  },
  description:
    "Premium handcrafted gourmet cookies and custom currency bouquets for birthdays, weddings, graduations, and special celebrations. Luxury gifts made with love.",
  keywords: [
    "gourmet cookies",
    "cash bouquet",
    "money bouquet",
    "luxury gifts",
    "custom bouquets",
    "handcrafted cookies",
    "birthday gifts",
    "wedding gifts",
  ],
  authors: [{ name: "Velora Gifts" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Velora Gifts",
    title: "Velora Gifts | Handcrafted Cookies & Custom Cash Bouquets",
    description:
      "Thoughtfully crafted gifts for every celebration. Premium cookies and custom cash bouquets.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Velora Gifts - Luxury Cookies and Cash Bouquets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora Gifts | Luxury Cookies & Cash Bouquets",
    description: "Thoughtfully crafted gifts for every celebration.",
    images: ["https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Velora Gifts",
  description: "Handcrafted gourmet cookies and custom cash bouquets",
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  image: "https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=1200&q=80",
  priceRange: "$$",
  servesCuisine: "Gourmet Cookies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        <Providers>
          <ConditionalShell>{children}</ConditionalShell>
        </Providers>
      </body>
    </html>
  );
}
