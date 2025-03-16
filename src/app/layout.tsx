import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selcuk S. | Full-stack Developer",
  keywords:
    "frontend, backend, development, berlin, germany, deutschland, backend development, mobile development, react, react native, vue, kotlin, indie developer",
  description:
    "Full-stack Developer based in Berlin, specializing in frontend, backend, and mobile development.",
  openGraph: {
    title: "Selcuk S. | Full-stack Developer",
    description:
      "Full-stack Developer based in Berlin, specializing in frontend, backend, and mobile development.",
    url: "https://selcuksarikoz.com",
    images: [
      {
        url: "https://selcuksarikoz.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Selcuk S. | Full-stack Developer",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <GoogleTagManager gtmId="G-YH1P2Y1GCF" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-x-hidden`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex flex-col flex-grow relative w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
