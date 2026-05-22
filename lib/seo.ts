import type { Metadata } from "next";
import { site } from "@/content/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function buildMetadata(input: { title: string; description: string; path: string }): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: `${siteUrl}${input.path}`,
      siteName: site.lawyer.name,
      title: input.title,
      description: input.description,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: ["/og-image.png"],
    },
  };
}
