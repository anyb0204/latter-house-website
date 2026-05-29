import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Josefin_Sans, Lato } from "next/font/google";
import "@/styles/globals.css";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-heading",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Latter House Life",
  description: "A community for believers moving forward together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${josefin.variable} ${lato.variable}`}>
        <body className="min-h-screen bg-cream">{children}</body>
      </html>
    </ClerkProvider>
  );
}
