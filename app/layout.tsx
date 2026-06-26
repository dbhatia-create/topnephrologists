import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrafficSourceTracker from "@/components/TrafficSourceTracker";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

export const metadata: Metadata = {
  title: {
    default: "TopNephrologists.com — Get Your Practice Listed",
    template: "%s | TopNephrologists.com",
  },
  description:
    "The premier directory of top nephrologists and kidney specialists nationwide. Get your practice listed and connect with patients actively searching for nephrology care.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://topnephrologists.com"),
  icons: {
    icon: "/stethoscope.svg",
    shortcut: "/stethoscope.svg",
    apple: "/stethoscope.svg",
  },
  openGraph: {
    type: "website",
    siteName: "TopNephrologists.com",
  },
};

const GA_ID = "G-XXXXXXXXXX";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>
        <Suspense fallback={null}>
          <TrafficSourceTracker />
        </Suspense>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
