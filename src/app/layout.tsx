import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Cormorant_Garamond, Source_Serif_4 } from "next/font/google";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Latter House Life | Renew Your Mind, Fulfill God's Purpose",
  description:
    "A peaceful community for mature believers ready to shed old patterns and step into God's individual purpose — with devotionals, neuroscience tools, community, and daily forward motion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${cormorant.variable} ${sourceSerif.variable}`}>
        <body className="min-h-screen bg-cream">{children}</body>
      </html>
    </ClerkProvider>
  );
}
