import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Raleway, Lato } from "next/font/google";
import "@/styles/globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
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
      <html lang="en" className={`${raleway.variable} ${lato.variable}`}>
        <body className="min-h-screen bg-cream">{children}</body>
      </html>
    </ClerkProvider>
  );
}
