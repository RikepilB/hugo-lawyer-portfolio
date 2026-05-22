import type { Metadata } from "next";
import { Lora, Merriweather } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Bufete Jurídico — Asesoría Legal Profesional",
    template: "%s · Bufete Jurídico",
  },
  description: "Asesoría legal profesional. Consultas, demandas, procesos y asesorías.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lora.variable} ${merriweather.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-navy-900)] focus:px-4 focus:py-2 focus:text-[var(--color-ivory)]"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
