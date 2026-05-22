import Link from "next/link";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SpecializationSection } from "@/components/ServiceCard";

export const metadata = buildMetadata({
  title: "Servicios",
  description: "Litigios civiles e inmobiliarios, subastas y remates judiciales, defensa constitucional.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Servicios">
          Tres áreas de especialización con atención personalizada
        </SectionHeading>
        <div className="space-y-16">
          {site.specializations.map((spec) => (
            <SpecializationSection key={spec.slug} specialization={spec} />
          ))}
        </div>
        <div className="mt-20 rounded-[var(--radius-card)] bg-[var(--color-navy-900)] p-10 text-center text-[var(--color-ivory)]">
          <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold">
            ¿Su caso no encaja en estas categorías?
          </h3>
          <p className="mt-3 text-base text-[var(--color-navy-50)]">
            Reserve una consulta inicial y evaluamos juntos el mejor camino.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[var(--color-gold-500)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-900)] hover:bg-[var(--color-gold-300)]"
          >
            Reservar consulta
          </Link>
        </div>
      </Container>
    </section>
  );
}
