import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Consulting Site Scaffold",
    template: "%s • Consulting",
  },
  description:
    "Modern consulting website scaffold built with Next.js and Tailwind (no WordPress). Replace placeholders with your own content and assets.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Consulting Site Scaffold",
    description:
      "Modern consulting website scaffold built with Next.js and Tailwind (no WordPress).",
    url: "https://example.com",
    siteName: "Consulting",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
