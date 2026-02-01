import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/features/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meraz 6.0 | Neon Tribal Pulse - IIT Bhilai",
  description: "Experience the fusion of ancient tribal mysticism and futuristic neon energy at Meraz 6.0, the annual techno-cultural festival of IIT Bhilai. February 15-17, 2026.",
  keywords: ["Meraz", "IIT Bhilai", "festival", "cultural fest", "tech fest", "college festival", "hackathon", "concerts"],
  authors: [{ name: "Meraz Web Team" }],
  openGraph: {
    title: "Meraz 6.0 | Neon Tribal Pulse",
    description: "The annual techno-cultural festival of IIT Bhilai. Where Ancient Meets Electric.",
    type: "website",
    locale: "en_IN",
    siteName: "Meraz 6.0",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meraz 6.0 | Neon Tribal Pulse",
    description: "Experience the fusion of tribal mysticism and futuristic energy at IIT Bhilai's Meraz 6.0",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
