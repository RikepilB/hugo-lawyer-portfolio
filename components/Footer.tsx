import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[var(--color-navy-100)] bg-white">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[var(--color-navy-900)]">
              {site.lawyer.name}
            </p>
            <p className="mt-1 text-sm text-[var(--color-navy-500)]">
              {site.lawyer.title}
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--color-gold-700)]">
              {site.lawyer.calRegistration}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy-900)]">Contacto</p>
            <ul className="mt-2 space-y-1 text-sm text-[var(--color-navy-500)]">
              <li>{site.contact.address}</li>
              <li>{site.contact.phone}</li>
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy-900)]">Navegación</p>
            <ul className="mt-2 space-y-1 text-sm">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--color-navy-500)] hover:text-[var(--color-gold-700)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-navy-100)] py-6 text-center text-xs text-[var(--color-navy-500)]">
          &copy; {year} {site.lawyer.name}. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
