import type { Metadata } from "next";
import { Lora, Merriweather } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
