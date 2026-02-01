import type { Metadata } from "next";
import { Outfit, Inter, Orbitron } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "MERAZ 6.0 // Steampunk: Gears of Glory",
  description: "Experience the fusion of tribal rhythms and steampunk innovation. January 30 - February 1 at IIT Bhilai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${outfit.variable} ${inter.variable} ${orbitron.variable} bg-obsidian text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
