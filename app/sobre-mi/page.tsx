import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: "Biografía profesional, formación y credenciales.",
};

export default function SobreMiPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Sobre Mí">{site.about.headline}</SectionHeading>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white">
              <Image
                src="/headshot-placeholder.jpg"
                alt={`Retrato profesional de ${site.lawyer.name}`}
                width={480}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <ul className="mt-6 space-y-2 text-sm text-[var(--color-navy-700)]">
              {site.about.credentials.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 inline-block h-px w-4 flex-none bg-[var(--color-gold-500)]" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-[var(--color-ink)]">
            {site.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
