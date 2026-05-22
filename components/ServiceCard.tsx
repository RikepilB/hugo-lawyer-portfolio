import type { Service } from "@/content/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white p-8 shadow-[var(--shadow-card)] scroll-mt-24"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
        Servicio
      </p>
      <h3 className="mt-3 text-2xl font-bold text-[var(--color-navy-900)]">{service.title}</h3>
      <div className="mt-3 h-px w-12 bg-[var(--color-gold-500)]" aria-hidden="true" />
      <p className="mt-5 flex-1 text-base leading-relaxed text-[var(--color-navy-700)]">
        {service.description}
      </p>
      <p className="mt-6 text-sm font-semibold text-[var(--color-navy-900)]">{service.fee}</p>
    </article>
  );
}
