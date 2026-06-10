import type { Metadata } from "next";
import { plusJakarta, inter } from "./fonts";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT_INFO } from "@/lib/constants";

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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.sanitatepharma.com/#organization",
    name: "Sanitatepharma Pvt. Ltd.",
    alternateName: "Sanitatepharma",
    url: "https://www.sanitatepharma.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.sanitatepharma.com/logo.png",
      width: 400,
      height: 80,
    },
    description: "WHO-GMP certified pharmaceutical company in India manufacturing 500+ medicines.",
    foundingDate: "2008",
    address: {
      "@type": "PostalAddress",
      streetAddress: "713, Devika Tower, Chander Nagar",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201011",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT_INFO.phone,
        contactType: "customer service",
        availableLanguage: ["Hindi", "English"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        telephone: CONTACT_INFO.phone,
        contactType: "sales",
        availableLanguage: ["Hindi", "English"],
        areaServed: "IN",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/sanitatepharma",
      "https://twitter.com/sanitatepharma",
      "https://www.facebook.com/sanitatepharma",
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "WHO-GMP Certificate" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 9001:2015" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "DCGI License" },
    ],
    numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Pharmaceutical Manufacturing",
      "Generic Medicines",
      "PCD Pharma Franchise",
      "Contract Manufacturing",
      "Drug Formulation",
      "WHO-GMP Compliance",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.sanitatepharma.com/#website",
    url: "https://www.sanitatepharma.com",
    name: "Sanitatepharma",
    description: "India's quality pharmaceutical company",
    publisher: { "@id": "https://www.sanitatepharma.com/#organization" },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.sanitatepharma.com/products?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "Pharmacy"],
    "@id": "https://www.sanitatepharma.com/#localbusiness",
    name: "Sanitatepharma Pvt. Ltd.",
    image: "https://www.sanitatepharma.com/office.jpg",
    url: "https://www.sanitatepharma.com",
    telephone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "713, Devika Tower, Chander Nagar",
      addressLocality: "Ghaziabad",
      addressRegion: "Uttar Pradesh",
      postalCode: "201011",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6692,
      longitude: 77.4538,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "₹₹",
    hasMap: "https://maps.google.com/?q=Sanitatepharma",
    servesCuisine: null,
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "State", name: "Uttar Pradesh" },
      { "@type": "State", name: "Delhi" },
      { "@type": "State", name: "Haryana" },
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="min-h-full flex flex-col font-body text-textDark bg-white">
        {children}
      </body>
    </html>
  );
}
