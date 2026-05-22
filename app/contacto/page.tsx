import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CalendarEmbed } from "@/components/CalendarEmbed";

export const metadata: Metadata = {
  title: "Contacto y Reserva",
  description: "Reserve una consulta legal en línea o presencial.",
};

export default function ContactoPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Contacto">{site.contact.headline}</SectionHeading>
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-[var(--color-navy-700)]">
          {site.contact.intro}
        </p>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <CalendarEmbed username={site.cal.username} eventSlug={site.cal.eventSlug} />
          <aside className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
                Otros canales
              </p>
              <ul className="mt-4 space-y-3 text-base text-[var(--color-navy-700)]">
                <li>
                  <span className="block text-sm text-[var(--color-navy-500)]">Correo</span>
                  <a className="font-semibold" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </li>
                <li>
                  <span className="block text-sm text-[var(--color-navy-500)]">Teléfono</span>
                  <a className="font-semibold" href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}>
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-sm text-[var(--color-navy-500)]">Oficina</span>
                  <span className="font-semibold">{site.contact.address}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] bg-[var(--color-navy-50)] p-6 text-sm text-[var(--color-navy-700)]">
              <p className="font-semibold text-[var(--color-navy-900)]">¿Reunión virtual o presencial?</p>
              <p className="mt-2">
                Al reservar puede seleccionar la modalidad preferida. Las reuniones virtuales se realizan
                por Zoom; las presenciales en la oficina indicada arriba.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
