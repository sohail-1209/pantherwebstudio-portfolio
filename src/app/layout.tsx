import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "Panther Web Studio | Premium Website Development Agency",
  description: "We build premium Websites, Web Applications, PWAs and SEO optimized business solutions.",
  keywords: ["Website Development", "Web Design", "Web Applications", "PWA", "SEO", "UI UX", "React", "Next.js", "Business Website", "Portfolio Website", "Landing Page", "Digital Agency"],
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
