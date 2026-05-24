import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-[var(--color-ivory)]">
      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-2xl">
            <p className="mb-4 font-semibold tracking-[0.10em] text-[var(--color-gold-500)] text-sm">
              {site.lawyer.calRegistration}
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--color-ivory)] sm:text-5xl lg:text-6xl">
              {site.lawyer.name}
            </h1>
            <p className="mt-4 font-[family-name:var(--font-merriweather)] text-xl text-[var(--color-gold-300)] sm:text-2xl">
              {site.lawyer.title}
            </p>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--color-navy-50)] sm:text-lg">
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
          </div>

          <div className="mx-auto w-full max-w-[320px] lg:max-w-[360px]">
            <div className="overflow-hidden rounded-[var(--radius-card)] ring-1 ring-[var(--color-gold-500)]/25 shadow-lg shadow-black/20">
              <Image
                src="/photos/hero-portrait.png"
                alt={`Retrato profesional de ${site.lawyer.name}`}
                width={480}
                height={560}
                className="h-auto w-full object-cover"
                priority
                sizes="(max-width: 1024px) 320px, 360px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
