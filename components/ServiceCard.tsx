import type { SubService, Specialization } from "@/content/site";

export function SubServiceCard({ item }: { item: SubService }) {
  return (
    <article className="flex flex-col rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-[var(--color-ivory)] p-5">
      <h4 className="text-lg font-bold text-[var(--color-navy-900)]">{item.title}</h4>
      <div className="mt-2 h-px w-8 bg-[var(--color-gold-500)]" aria-hidden="true" />
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-navy-700)]">
        {item.description}
      </p>
    </article>
  );
}

export function SpecializationSection({ specialization }: { specialization: Specialization }) {
  return (
    <section
      id={specialization.slug}
      className="scroll-mt-24"
    >
      <article className="rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white p-8 shadow-[var(--shadow-card)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
          Especialización
        </p>
        <h3 className="mt-3 text-2xl font-bold text-[var(--color-navy-900)]">
          {specialization.title}
        </h3>
        <div className="mt-3 h-px w-12 bg-[var(--color-gold-500)]" aria-hidden="true" />
        <p className="mt-5 text-base leading-relaxed text-[var(--color-navy-700)]">
          {specialization.description}
        </p>
        <p className="mt-4 text-sm font-semibold text-[var(--color-navy-900)]">
          {specialization.fee}
        </p>
      </article>

      {specialization.items.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialization.items.map((item) => (
            <SubServiceCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
