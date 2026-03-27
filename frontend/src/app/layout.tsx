import type { Metadata } from "next";
import { DM_Mono, DM_Sans, IBM_Plex_Mono, Manrope, Syne } from "next/font/google";
import "./globals.css";

const mfHeading = Syne({
  variable: "--font-mf-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const mfBody = DM_Sans({
  variable: "--font-mf-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const mfMono = DM_Mono({
  variable: "--font-mf-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const adBody = Manrope({
  variable: "--font-ad-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const adMono = IBM_Plex_Mono({
  variable: "--font-ad-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Moneyfeed — InCred Money",
  description: "Social trading discovery platform for InCred Money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mfHeading.variable} ${mfBody.variable} ${mfMono.variable} ${adBody.variable} ${adMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
