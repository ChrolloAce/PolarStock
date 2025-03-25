import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PolarStock - Generate AI-Optimized Stock Images for Your Projects",
  description: "Instantly find, optimize, and download premium stock images for your websites, apps, and software projects. Save time with PolarStock's AI-powered image curation.",
  keywords: "stock images, pexels api, AI image search, website images, app images, software images, free stock photos, image optimization, commercial stock photos, stock image generator",
  authors: [{ name: "PolarStock", url: "https://polarstock.vercel.app" }],
  creator: "PolarStock",
  publisher: "PolarStock",
  metadataBase: new URL("https://polarstock.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://polarstock.vercel.app",
    title: "PolarStock - AI-Powered Stock Image Generation",
    description: "Instantly find, optimize, and download premium stock images for your websites, apps, and software projects.",
    siteName: "PolarStock",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PolarStock - AI-Powered Stock Image Generation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PolarStock - AI-Powered Stock Image Generation",
    description: "Instantly find, optimize, and download premium stock images for your websites, apps, and software projects.",
    images: ["/og-image.png"],
    creator: "@polarstock",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#00a0ff'
      }
    ]
  },
  manifest: '/manifest.json',
  category: 'technology',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="alternate" type="application/rss+xml" title="PolarStock Blog" href="https://polarstock.vercel.app/rss.xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
