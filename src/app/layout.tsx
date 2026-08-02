import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ethnocentric = localFont({
  src: '../../public/ethnocentric-rg.ttf',
  variable: '--font-ethno',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pantherwebstudio.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Panther Web Studio | Premium Website Development Agency",
  description: "We build premium, fast, responsive Websites, Web Applications, PWAs, and SEO-optimized digital solutions for modern businesses.",
  keywords: [
    "Panther Web Studio", "Website Development", "Web Design Agency", 
    "Web Applications", "PWA", "SEO Optimization", "UI UX Design", 
    "React", "Next.js", "Business Website", "Portfolio Website", 
    "Landing Page", "Digital Agency India", "E-commerce Development"
  ],
  authors: [{ name: "Panther Web Studio" }],
  creator: "Panther Web Studio",
  publisher: "Panther Web Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Panther Web Studio | Premium Website Development Agency",
    description: "We build premium, fast, responsive Websites, Web Applications, PWAs, and SEO-optimized digital solutions for modern businesses.",
    url: baseUrl,
    siteName: "Panther Web Studio",
    images: [
      {
        url: "/panther.png",
        width: 1200,
        height: 630,
        alt: "Panther Web Studio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panther Web Studio | Premium Website Development Agency",
    description: "We build premium, fast, responsive Websites, Web Applications, PWAs, and SEO-optimized digital solutions for modern businesses.",
    images: ["/panther.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlef731671fbeb5ff39",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${ethnocentric.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <SmoothScroll>
          <CustomCursor />
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
