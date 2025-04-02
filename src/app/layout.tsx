import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Navbar from "@/src/components/navbar";

const GA_MEASUREMENT_ID = "G-YH1P2Y1GCF";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Software Developer's Adventures in Berlin 🇩🇪";

export const metadata: Metadata = {
  title: title,
  keywords:
    "frontend, backend, development, berlin, germany, deutschland, backend development, mobile development, react, react native, vue, kotlin, indie developer",
  description:
    "Full-stack Developer based in Berlin, specializing in frontend, backend, and mobile development.",
  openGraph: {
    title: title,
    siteName: title,
    type: "website",
    description:
      "Full-stack Developer based in Berlin, specializing in frontend, backend, and mobile development.",
    url: "https://selcuksarikoz.com",
    images: [
      {
        url: "https://selcuksarikoz.com/og-image.png",
        width: 1200,
        height: 630,
        alt: title,
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white overflow-x-hidden`}
      >
        {process.env.NODE_ENV === "production" ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
              }}
            />
          </>
        ) : null}
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
