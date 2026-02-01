import type { Metadata } from "next";
import { Outfit, Inter, Orbitron } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "MERAZ 6.0 // Neon Tribal Pulse",
  description: "The Official Techno-Cultural Festival of IIT Bhilai. Experience the fusion of ancient rhythm and future tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${outfit.variable} ${inter.variable} ${orbitron.variable} bg-obsidian text-white overflow-hidden`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
