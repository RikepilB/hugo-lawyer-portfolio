"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import { Container } from "./Container";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-navy-100)] bg-[var(--color-ivory)]/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-merriweather)] text-lg font-bold tracking-tight text-[var(--color-navy-900)]">
            {site.lawyer.name}
          </Link>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm tracking-wide transition-colors ${
                        active
                          ? "text-[var(--color-gold-700)]"
                          : "text-[var(--color-navy-900)] hover:text-[var(--color-gold-700)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-navy-100)] md:hidden"
          >
            <span className="sr-only">Menú</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>
        </div>

        {open && (
          <nav aria-label="Móvil" className="pb-4 md:hidden">
            <ul className="flex flex-col gap-2">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-base text-[var(--color-navy-900)] hover:bg-[var(--color-navy-50)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
