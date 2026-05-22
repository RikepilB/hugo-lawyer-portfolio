import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-700)]">
          Página no encontrada
        </p>
        <h1 className="mt-3 text-4xl font-bold text-[var(--color-navy-900)]">404</h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--color-navy-700)]">
          La página que busca no existe o ha sido movida. Puede regresar al inicio o reservar una consulta.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/" className="rounded-md bg-[var(--color-navy-900)] px-5 py-3 text-sm font-semibold text-[var(--color-ivory)]">
            Volver al inicio
          </Link>
          <Link href="/contacto" className="rounded-md border border-[var(--color-navy-900)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-900)]">
            Reservar consulta
          </Link>
        </div>
      </Container>
    </section>
  );
}
