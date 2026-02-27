import { Metadata } from "next";
import { Montserrat, Poppins, Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { createMetadata } from "@/lib/seo";
import { Header } from "@/components/header";
import Footer from "@/components/footer/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500"],
});
const roboto = Poppins({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500"],
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dfreeafrica.org",
  ),
  ...createMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${poppins.variable} ${roboto.variable} ${spaceGrotesk.variable} font-poppins antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
