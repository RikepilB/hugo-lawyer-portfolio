import Link from "next/link";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata = buildMetadata({
  title: "Servicios",
  description: "Consultas, demandas, procesos y asesorías legales.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Servicios">
          Cuatro áreas de práctica con atención personalizada
        </SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2">
          {site.services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-16 rounded-[var(--radius-card)] bg-[var(--color-navy-900)] p-10 text-center text-[var(--color-ivory)]">
          <h3 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold">
            ¿Su caso no encaja en una categoría?
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
