import Link from "next/link";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";

const audiences = [
  {
    label: "Estudiantes",
    description: "Orientación legal académica y mentoría para futuros abogados.",
  },
  {
    label: "Pre-profesionales",
    description: "Primeras consultas sin costo para bachilleres en derecho en inserción laboral.",
  },
  {
    label: "Profesionales",
    description: "Asesoría y patrocinio especializado para abogados, estudios y empresas.",
  },
] as const;

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
            Soluciones legales que protegen lo que más valoras
          </SectionHeading>
          <div className="grid gap-8 sm:grid-cols-3">
            {site.specializations.map((spec) => (
              <Link
                key={spec.slug}
                href={`/servicios#${spec.slug}`}
                className="group rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] group-hover:text-[var(--color-gold-700)]">
                  {spec.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-navy-500)]">
                  {spec.description}
                </p>
                <p className="mt-3 text-xs font-medium text-[var(--color-navy-400)]">
                  {spec.items.length} {spec.items.length === 1 ? "servicio" : "servicios"}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--color-navy-50)]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
                Agende su consulta
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[var(--color-navy-900)]">
                Asesoría abierta para cada etapa profesional
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--color-navy-700)]">
                El Dr. Hugo Sánchez recibe consultas de estudiantes, bachilleres,
                abogados colegiados y estudios jurídicos. También colabora con revistas
                especializadas y publicaciones del sector legal.
              </p>
              <Link
                href="/contacto"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[var(--color-gold-500)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-900)] transition-colors hover:bg-[var(--color-gold-300)]"
              >
                Reservar consulta
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {audiences.map((a) => (
                <div
                  key={a.label}
                  className="rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white p-5"
                >
                  <p className="text-sm font-bold text-[var(--color-navy-900)]">{a.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-navy-500)]">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
              Partners
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[var(--color-navy-900)]">
              Colaboración con revistas y publicaciones legales
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-[var(--color-navy-700)]">
              Abierto a colaborar con revistas de abogados, publicaciones jurídicas
              y medios especializados. Aportes académicos, análisis de jurisprudencia
              y comentarios sobre tendencias del derecho civil, inmobiliario y constitucional.
            </p>
          </div>
          <div className="mt-8 text-center">
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
