import Link from "next/link";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = buildMetadata({
  title: "Inicio",
  description: site.lawyer.intro,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Áreas de práctica">
            Una práctica enfocada en lo que más importa
          </SectionHeading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios#${service.slug}`}
                className="group rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] group-hover:text-[var(--color-gold-700)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-navy-500)]">
                  {service.description.split(".")[0]}.
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/servicios"
              className="text-sm font-semibold tracking-wide text-[var(--color-navy-900)] underline decoration-[var(--color-gold-500)] decoration-2 underline-offset-4 hover:text-[var(--color-gold-700)]"
            >
              Ver todos los servicios &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
