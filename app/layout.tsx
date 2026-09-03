import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karimunjawa.tours"),
  title: "ChokY — Karimunjawa Tour Organizer & Web Developer",
  description:
    "Jelajahi Karimunjawa tanpa ribet bersama ChokY: tur lokal terpercaya sejak 2015.",
  openGraph: {
    title: "ChokY — Karimunjawa Tour Organizer & Web Developer",
    description: "Tur pulau otentik dari orang lokal Karimunjawa.",
    url: "https://karimunjawa.tours",
    siteName: "karimunjawa.tours",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${instrument.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
