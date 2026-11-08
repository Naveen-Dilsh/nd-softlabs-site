import { site } from "@/lib/content";
import PageTransition from "@/components/PageTransition";
import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Instrument_Serif,
  Instrument_Sans,
  Bricolage_Grotesque,
  DM_Sans,
  Fragment_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackgroundWash, { Grain } from "@/components/BackgroundWash";

// The live site's own "Inter Display" files (latin subset), not Google's
// Inter: Google's variable Inter has different widths, which is what made
// the hero headline letters collide at -0.06em tracking.
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../fonts/InterDisplay-300.woff2", weight: "300" },
    { path: "../fonts/InterDisplay-400.woff2", weight: "400" },
    { path: "../fonts/InterDisplay-500.woff2", weight: "500" },
    { path: "../fonts/InterDisplay-600.woff2", weight: "600" },
    { path: "../fonts/InterDisplay-700.woff2", weight: "700" },
  ],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  // The preview image itself is app/opengraph-image.png; Next adds it.
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} ${instrumentSans.variable} ${bricolage.variable} ${dmSans.variable} ${fragmentMono.variable}`}
      >
        <Grain />
        <BackgroundWash />
        <SmoothScroll>
          <Nav />
          {children}
          <WhatsAppButton />
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
