import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-[var(--color-ivory)]">
      <Container className="relative py-24 sm:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-500)]">
          {site.lawyer.title}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {site.lawyer.name}
        </h1>
        <p className="mt-4 font-[family-name:var(--font-merriweather)] text-xl text-[var(--color-gold-300)] sm:text-2xl">
          {site.lawyer.tagline}
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-navy-50)] sm:text-lg">
          {site.lawyer.intro}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold-500)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-900)] transition-colors hover:bg-[var(--color-gold-300)]"
          >
            Conocer servicios
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-md border border-[var(--color-gold-500)] px-6 py-3 text-sm font-semibold text-[var(--color-gold-500)] transition-colors hover:bg-[var(--color-gold-500)]/10"
          >
            Reservar consulta
          </Link>
        </div>
      </Container>
    </section>
  );
}
