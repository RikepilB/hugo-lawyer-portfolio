import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-navy-900)] sm:text-4xl">
        {children}
      </h2>
      <div className="mt-4 h-px w-16 bg-[var(--color-gold-500)]" aria-hidden="true" />
    </div>
  );
}
