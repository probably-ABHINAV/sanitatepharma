import type { Metadata } from "next";
import { plusJakarta, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sanitate Pharma — India's Leading Pharmaceutical Company",
    template: "%s — Sanitate Pharma",
  },
  description:
    "Sanitate Pharma is committed to making quality healthcare accessible and affordable. Explore our pharmaceutical products, franchise opportunities, and contract manufacturing services.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.sanitatepharma.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body text-textDark bg-white">
        {children}
      </body>
    </html>
  );
}
