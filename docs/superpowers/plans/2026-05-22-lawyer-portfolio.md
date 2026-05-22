# Lawyer Portfolio & Meeting Management Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a professional Spanish-language portfolio + Cal.com booking site for a solo-practice lawyer in Latin America, deployed to Vercel within one week.

**Architecture:** Next.js App Router (TypeScript) as a static, content-driven site. All copy lives in a single `content/site.ts` module. UI is composed from small, focused components under `components/`. Cal.com inline embed (`@calcom/embed-react`) handles booking; username/event slug are read from `NEXT_PUBLIC_CAL_USERNAME` / `NEXT_PUBLIC_CAL_EVENT_SLUG` env vars so the client can be wired up without code changes. Tailwind v4 (`@import "tailwindcss"`) supplies utility classes; design tokens (navy/gold/ivory + serif fonts) live in `app/globals.css` via `@theme`. Tests are light-touch: Vitest + React Testing Library for components, Playwright for navigation smoke. Deployed via Vercel's GitHub integration.

**Tech Stack:**
- Next.js 16 (App Router, React 19, TypeScript) — installed via `pnpm create next-app@latest`
- Tailwind CSS v4 + PostCSS
- Fonts: Lora (body), Merriweather (display) via `next/font/google`
- Cal.com inline embed: `@calcom/embed-react`
- Testing: Vitest + React Testing Library + Playwright
- Package manager: pnpm
- Deploy: Vercel (GitHub auto-deploy)

**Repo root for this project:** `HUGO_web/` (do **not** create a `father-lawyer-portfolio/` subfolder — the project lives at the repo root next to `.claude/` and `AGENTS.md`).

---

## File Structure

```
HUGO_web/
├── app/
│   ├── layout.tsx              Shared shell — Header + Footer wrap children
│   ├── page.tsx                Landing page (/)
│   ├── sobre-mi/page.tsx       About page (/sobre-mi)
│   ├── servicios/page.tsx      Services page (/servicios)
│   ├── contacto/page.tsx       Contact + Cal.com embed (/contacto)
│   ├── globals.css             Tailwind import + design tokens (@theme) + base styles
│   ├── sitemap.ts              Auto-generated sitemap.xml
│   ├── robots.ts               robots.txt
│   └── not-found.tsx           Spanish 404 page
├── components/
│   ├── Container.tsx           Max-width wrapper, consistent gutter
│   ├── Header.tsx              Sticky nav, mobile menu, active link state
│   ├── Footer.tsx              Office address, phone, email, copyright
│   ├── HeroSection.tsx         Landing hero w/ name + tagline + CTA
│   ├── SectionHeading.tsx      Standardized H2 + eyebrow + rule line
│   ├── ServiceCard.tsx         Single service card (icon, title, description, fee)
│   └── CalendarEmbed.tsx       Cal.com inline embed (client component)
├── content/
│   └── site.ts                 ALL Spanish copy: name, tagline, bio, services[], contact, nav links
├── lib/
│   └── seo.ts                  Shared Metadata builder (title template, OG defaults)
├── public/
│   ├── headshot-placeholder.jpg
│   ├── og-image.png
│   └── favicon.ico             (next-app default)
├── tests/
│   ├── setup.ts                Vitest + RTL setup
│   ├── ServiceCard.test.tsx
│   └── Header.test.tsx
├── e2e/
│   └── navigation.spec.ts      Playwright smoke: visits all 4 routes, asserts headings
├── docs/
│   └── mockup/
│       └── index.html          Static HTML mockup (Task 0)
├── tailwind.config.ts          Minimal — content paths only (tokens live in CSS)
├── postcss.config.mjs
├── vitest.config.ts
├── playwright.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .env.example                CAL_USERNAME, CAL_EVENT_SLUG placeholders
├── .env.local                  (gitignored)
├── .gitignore
└── README.md
```

**Why this layout:**
- `content/site.ts` is the single source of truth for copy — non-developer updates touch one file.
- `components/` are small, single-responsibility, and reusable across pages.
- `app/` pages are thin: they import content + components and compose them.
- Tests sit next to source-of-truth components, not every page (low-value test coverage).
- `docs/mockup/index.html` lets the client see the look-and-feel before any Next.js code is written.

---

## Task 0: Generate HTML Mockup (Design Preview)

**Files:**
- Create: `docs/mockup/index.html`

Use the `superpowers:frontend-design` skill to produce a single self-contained HTML file that previews all four pages stacked vertically (Landing → Sobre Mí → Servicios → Contacto). The mockup uses inline `<style>` with the final design tokens so the client can preview look-and-feel before the Next.js build starts.

- [ ] **Step 1: Invoke frontend-design skill**

Call the `superpowers:frontend-design` skill with this brief:

> Build a single static HTML preview at `docs/mockup/index.html` for a Spanish-language lawyer portfolio. Four sections stacked (Landing, Sobre Mí, Servicios, Contacto). Design tokens: navy `#1a2844`, gold `#d4af37`, ivory `#faf8f3`, charcoal `#1a1a1a`. Serif typography (Merriweather headings, Lora body via Google Fonts CDN). Generous whitespace, formal grid, gold rule-lines under section headings. Services section is a 2×2 card grid (Consultas, Demandas, Procesos, Asesorías). Contacto section shows a Cal.com placeholder card with "Reservar consulta" button. Fully responsive (single column under 768px). Inline `<style>` only — no build step required. Use placeholder name "Dr. [Apellido]" and lorem-ipsum-style Spanish copy.

- [ ] **Step 2: Open mockup in browser to review**

```bash
start docs/mockup/index.html    # Windows
```

Verify:
- Four sections render
- Navy/gold palette is applied
- Serif fonts load
- Layout looks formal and trustworthy
- Mobile view (DevTools responsive mode, 375px) works

- [ ] **Step 3: Commit mockup**

```bash
git init                                                  # if not yet initialized
git add docs/mockup/index.html
git commit -m "docs: add HTML mockup of lawyer portfolio"
```

> **Checkpoint:** Share `docs/mockup/index.html` (or screenshots) with the client. Do not start Task 1 until visual direction is approved.

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.env.example`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css` (default scaffolds — replaced in later tasks)

- [ ] **Step 1: Scaffold Next.js into the existing folder**

The repo root already contains `.claude/`, `.agents/`, `.opencode/`, `AGENTS.md`. We initialize Next.js in-place using `.` as the directory.

```bash
pnpm create next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --no-eslint --use-pnpm
```

When prompted "would you like to use Turbopack" → yes. If prompted to overwrite the existing folder warning → confirm; the scaffolder will not delete `.claude/`, `.agents/`, `.opencode/`, or `AGENTS.md`.

Expected: `package.json`, `app/`, `public/`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts` (or equivalent v4 config) appear.

- [ ] **Step 2: Verify dev server boots**

```bash
pnpm dev
```

Expected: `▲ Next.js 16.x.x — Local: http://localhost:3000` and the default landing page renders without errors. `Ctrl+C` to stop.

- [ ] **Step 3: Append entries to `.gitignore`**

Append the following to `.gitignore` (do not replace existing entries):

```
# env
.env.local
.env*.local

# vercel
.vercel

# test artifacts
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/

# editors
.idea
.vscode
```

- [ ] **Step 4: Create `.env.example`**

```bash
# Cal.com configuration (set in Vercel dashboard for production)
NEXT_PUBLIC_CAL_USERNAME=richard-pillaca-mqty24
NEXT_PUBLIC_CAL_EVENT_SLUG=30min

# Site URL (used by sitemap/OG tags)
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

- [ ] **Step 5: Create matching `.env.local` with real values for local dev**

```bash
NEXT_PUBLIC_CAL_USERNAME=richard-pillaca-mqty24
NEXT_PUBLIC_CAL_EVENT_SLUG=30min
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

- [ ] **Step 6: Initialize git + first commit**

```bash
git add .
git commit -m "chore: scaffold next.js 16 app with tailwind v4"
```

---

## Task 2: Design Tokens, Fonts, and Base Styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css` with tokens + base reset**

```css
@import "tailwindcss";

@theme {
  --color-navy-50:  #f0f2f7;
  --color-navy-100: #d6dbe6;
  --color-navy-500: #3a4a6b;
  --color-navy-700: #1f2f4f;
  --color-navy-900: #1a2844;
  --color-gold-300: #e8c969;
  --color-gold-500: #d4af37;
  --color-gold-700: #a78827;
  --color-ivory:    #faf8f3;
  --color-ink:      #1a1a1a;

  --font-serif:   "Lora", "Georgia", serif;
  --font-display: "Merriweather", "Georgia", serif;

  --radius-card:  12px;
  --shadow-card:  0 1px 2px rgba(26, 40, 68, 0.06), 0 8px 24px rgba(26, 40, 68, 0.08);
}

@layer base {
  html { color-scheme: light; }
  body {
    background-color: var(--color-ivory);
    color: var(--color-ink);
    font-family: var(--font-serif);
    font-feature-settings: "kern", "liga";
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    color: var(--color-navy-900);
    letter-spacing: -0.01em;
  }
  a { color: var(--color-navy-700); }
  a:hover { color: var(--color-gold-700); }
  :focus-visible {
    outline: 2px solid var(--color-gold-500);
    outline-offset: 3px;
    border-radius: 2px;
  }
  ::selection {
    background: var(--color-gold-300);
    color: var(--color-navy-900);
  }
}
```

- [ ] **Step 2: Replace `app/layout.tsx` with font + lang + metadata defaults**

```tsx
import type { Metadata } from "next";
import { Lora, Merriweather } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Bufete Jurídico — Asesoría Legal Profesional",
    template: "%s · Bufete Jurídico",
  },
  description: "Asesoría legal profesional. Consultas, demandas, procesos y asesorías.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${lora.variable} ${merriweather.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify fonts + colors render**

```bash
pnpm dev
```

Open `http://localhost:3000`. The default Next.js demo page should now show in serif typography against an ivory background. Stop server.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add design tokens, serif fonts, and base styles"
```

---

## Task 3: Centralized Content Module

**Files:**
- Create: `content/site.ts`

- [ ] **Step 1: Create `content/site.ts` with the full site copy**

```ts
export type Service = {
  slug: "consultas" | "demandas" | "procesos" | "asesorias";
  title: string;
  description: string;
  fee: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export const site = {
  lawyer: {
    name: "Dr. Wilfredo Hugo Sanchez",
    title: "Abogado",
    tagline: "Asesoría Legal Profesional",
    intro:
      "Más de veinte años acompañando a personas y empresas en asuntos civiles, " +
      "comerciales y administrativos. Atención cercana, criterio riguroso y " +
      "resultados defendibles.",
  },
  about: {
    headline: "Una práctica jurídica al servicio de las personas",
    paragraphs: [
      "Soy abogado con más de veinte años de ejercicio profesional en Lima, " +
      "con especialización en derecho civil y comercial. Mi práctica se centra " +
      "en la defensa de los intereses de mis clientes con discreción y rigor técnico.",
      "He representado a personas naturales y pequeñas empresas en litigios, " +
      "negociaciones contractuales y procedimientos administrativos. Cada caso " +
      "recibe atención personalizada y un plan jurídico claro desde la primera reunión.",
    ],
    credentials: [
      "Más de 20 años de ejercicio profesional",
      "Especialización en derecho civil y comercial",
      "Estudio jurídico en San Isidro, Lima",
    ],
  },
  services: [
    {
      slug: "consultas",
      title: "Consultas",
      description:
        "Reuniones de orientación legal para evaluar su situación, identificar " +
        "riesgos y definir un plan de acción. Diagnóstico claro y recomendaciones " +
        "prácticas sin compromiso de continuidad.",
      fee: "Desde USD 60 / consulta",
    },
    {
      slug: "demandas",
      title: "Demandas",
      description:
        "Preparación, presentación y seguimiento de demandas civiles, comerciales " +
        "y laborales. Redacción rigurosa, estrategia procesal y representación " +
        "ante los tribunales competentes.",
      fee: "Consultar honorarios",
    },
    {
      slug: "procesos",
      title: "Procesos",
      description:
        "Acompañamiento integral en procesos judiciales y administrativos en curso. " +
        "Audiencias, escritos, pruebas y recursos, con informes periódicos del estado " +
        "del expediente.",
      fee: "Consultar honorarios",
    },
    {
      slug: "asesorias",
      title: "Asesorías",
      description:
        "Asesoramiento permanente para personas y pequeñas empresas. Revisión de " +
        "contratos, prevención de litigios y respuesta rápida ante requerimientos " +
        "legales del día a día.",
      fee: "Plan mensual desde USD 150",
    },
  ] satisfies Service[],
  contact: {
    headline: "Reserve su consulta",
    intro:
      "Agende una reunión virtual o presencial seleccionando un horario disponible. " +
      "Recibirá confirmación inmediata por correo electrónico.",
    email: "contacto@ejemplo.com",
    phone: "+51 977 767 484",
    address: "Milanos 310, San Isidro — Lima, Perú",
    linkedin: "",
  },
  nav: [
    { href: "/", label: "Inicio" },
    { href: "/sobre-mi", label: "Sobre Mí" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ] satisfies NavLink[],
  cal: {
    username: process.env.NEXT_PUBLIC_CAL_USERNAME ?? "richard-pillaca-mqty24",
    eventSlug: process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? "30min",
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add content/site.ts
git commit -m "feat: add centralized site content module"
```

---

## Task 4: Container, Header, Footer

**Files:**
- Create: `components/Container.tsx`, `components/Header.tsx`, `components/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/Container.tsx`**

```tsx
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/Header.tsx`**

```tsx
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
```

- [ ] **Step 3: Create `components/Footer.tsx`**

```tsx
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
            <p className="mt-1 text-sm text-[var(--color-navy-500)]">{site.lawyer.title}</p>
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
          © {year} {site.lawyer.name}. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Wire Header + Footer into `app/layout.tsx`**

Replace the existing `RootLayout` return with:

```tsx
return (
  <html lang="es" className={`${lora.variable} ${merriweather.variable}`}>
    <body className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-1">{children}</main>
      <Footer />
    </body>
  </html>
);
```

Add at the top of the file:

```tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
```

- [ ] **Step 5: Verify visually**

```bash
pnpm dev
```

Open `http://localhost:3000`. Header renders with name + 4 nav links. Footer renders with three columns. Mobile (DevTools 375px) → hamburger toggles menu. Stop server.

- [ ] **Step 6: Commit**

```bash
git add components/ app/layout.tsx
git commit -m "feat: add header, footer, and shared container"
```

---

## Task 5: Landing Page (Hero + Intro + CTA)

**Files:**
- Create: `components/SectionHeading.tsx`, `components/HeroSection.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/SectionHeading.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/HeroSection.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-[var(--color-ivory)]">
      <Container className="relative py-24 sm:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-500)]">
          {site.lawyer.title}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {site.lawyer.name}
        </h1>
        <p className="mt-4 font-[family-name:var(--font-merriweather)] text-xl text-[var(--color-gold-300)] sm:text-2xl">
          {site.lawyer.tagline}
        </p>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-navy-50)] sm:text-lg">
          {site.lawyer.intro}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-gold-500)] px-6 py-3 text-sm font-semibold text-[var(--color-navy-900)] transition-colors hover:bg-[var(--color-gold-300)]"
          >
            Conocer servicios
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-md border border-[var(--color-gold-500)] px-6 py-3 text-sm font-semibold text-[var(--color-gold-500)] transition-colors hover:bg-[var(--color-gold-500)]/10"
          >
            Reservar consulta
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/Container";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Áreas de práctica">
            Una práctica enfocada en lo que más importa
          </SectionHeading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios#${service.slug}`}
                className="group rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white p-6 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold text-[var(--color-navy-900)] group-hover:text-[var(--color-gold-700)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-navy-500)]">
                  {service.description.split(".")[0]}.
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/servicios"
              className="text-sm font-semibold tracking-wide text-[var(--color-navy-900)] underline decoration-[var(--color-gold-500)] decoration-2 underline-offset-4 hover:text-[var(--color-gold-700)]"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Verify landing page renders**

```bash
pnpm dev
```

Open `http://localhost:3000`. Hero shows name, tagline, intro, two CTA buttons. Below: 4 service preview cards. Stop server.

- [ ] **Step 5: Commit**

```bash
git add components/SectionHeading.tsx components/HeroSection.tsx app/page.tsx
git commit -m "feat: build landing page with hero and service preview"
```

---

## Task 6: About Page (/sobre-mi)

**Files:**
- Create: `app/sobre-mi/page.tsx`

- [ ] **Step 1: Create `app/sobre-mi/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Sobre Mí",
  description: "Biografía profesional, formación y credenciales.",
};

export default function SobreMiPage() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Sobre Mí">{site.about.headline}</SectionHeading>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white">
              <Image
                src="/headshot-placeholder.jpg"
                alt={`Retrato profesional de ${site.lawyer.name}`}
                width={480}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <ul className="mt-6 space-y-2 text-sm text-[var(--color-navy-700)]">
              {site.about.credentials.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 inline-block h-px w-4 flex-none bg-[var(--color-gold-500)]" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-[var(--color-ink)]">
            {site.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add placeholder headshot**

Save any 480×600 JPG (or generated solid-color image) to `public/headshot-placeholder.jpg`. If no image is available, create a 1×1 transparent placeholder:

```bash
node -e "require('fs').writeFileSync('public/headshot-placeholder.jpg', Buffer.from('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AAAAAAAAAAAAH/9k=', 'base64'))"
```

- [ ] **Step 3: Verify /sobre-mi renders**

```bash
pnpm dev
```

Open `http://localhost:3000/sobre-mi`. Two-column layout (photo + credentials left, bio paragraphs right). Stop server.

- [ ] **Step 4: Commit**

```bash
git add app/sobre-mi/page.tsx public/headshot-placeholder.jpg
git commit -m "feat: build /sobre-mi page with bio and credentials"
```

---

## Task 7: Services Page (/servicios) + ServiceCard

**Files:**
- Create: `components/ServiceCard.tsx`, `app/servicios/page.tsx`

- [ ] **Step 1: Create `components/ServiceCard.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `app/servicios/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Consultas, demandas, procesos y asesorías legales.",
};

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
```

- [ ] **Step 3: Verify /servicios renders**

```bash
pnpm dev
```

Open `http://localhost:3000/servicios`. 2×2 grid of cards. CTA banner below. Anchor links from landing (`/servicios#consultas`) jump correctly. Stop server.

- [ ] **Step 4: Commit**

```bash
git add components/ServiceCard.tsx app/servicios/page.tsx
git commit -m "feat: build /servicios page with service cards"
```

---

## Task 8: Contact Page + Cal.com Embed

**Files:**
- Create: `components/CalendarEmbed.tsx`, `app/contacto/page.tsx`
- Modify: `package.json` (add `@calcom/embed-react`)

- [ ] **Step 1: Install Cal.com embed package**

```bash
pnpm add @calcom/embed-react
```

- [ ] **Step 2: Create `components/CalendarEmbed.tsx`**

```tsx
"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

type Props = {
  username: string;
  eventSlug: string;
};

export function CalendarEmbed({ username, eventSlug }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "consulta" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#1a2844",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-navy-100)] bg-white">
      <Cal
        namespace="consulta"
        calLink={`${username}/${eventSlug}`}
        style={{ width: "100%", height: "700px", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Create `app/contacto/page.tsx`**

```tsx
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
```

- [ ] **Step 4: Verify /contacto renders**

```bash
pnpm dev
```

Open `http://localhost:3000/contacto`. Cal.com widget loads in the left column (will show "user not found" until real `NEXT_PUBLIC_CAL_USERNAME` is set — expected). Right column shows email/phone/office. Stop server.

- [ ] **Step 5: Commit**

```bash
git add components/CalendarEmbed.tsx app/contacto/page.tsx package.json pnpm-lock.yaml
git commit -m "feat: build /contacto page with Cal.com inline embed"
```

---

## Task 9: SEO Metadata, Sitemap, Robots, 404

**Files:**
- Create: `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`

- [ ] **Step 1: Create `lib/seo.ts`**

```ts
import type { Metadata } from "next";
import { site } from "@/content/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function buildMetadata(input: { title: string; description: string; path: string }): Metadata {
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: `${siteUrl}${input.path}`,
      siteName: site.lawyer.name,
      title: input.title,
      description: input.description,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: ["/og-image.png"],
    },
  };
}
```

- [ ] **Step 2: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/sobre-mi", "/servicios", "/contacto"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }));
}
```

- [ ] **Step 3: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Create `app/not-found.tsx`**

```tsx
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
```

- [ ] **Step 5: Update page metadata to use `buildMetadata`**

Replace the `export const metadata` in each of the four route files:

`app/page.tsx` — add at top of file:

```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Inicio",
  description: site.lawyer.intro,
  path: "/",
});
```

`app/sobre-mi/page.tsx`:

```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre Mí",
  description: "Biografía profesional, formación y credenciales.",
  path: "/sobre-mi",
});
```

`app/servicios/page.tsx`:

```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Servicios",
  description: "Consultas, demandas, procesos y asesorías legales.",
  path: "/servicios",
});
```

`app/contacto/page.tsx`:

```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contacto y Reserva",
  description: "Reserve una consulta legal en línea o presencial.",
  path: "/contacto",
});
```

Drop the old `import type { Metadata } from "next"` from these files if no longer used.

- [ ] **Step 6: Verify sitemap + robots**

```bash
pnpm dev
```

Open `http://localhost:3000/sitemap.xml` → 4 URLs listed. Open `/robots.txt` → allows all + lists sitemap. Open `/no-existe` → 404 page renders. Stop server.

- [ ] **Step 7: Commit**

```bash
git add lib/seo.ts app/sitemap.ts app/robots.ts app/not-found.tsx app/page.tsx app/sobre-mi/page.tsx app/servicios/page.tsx app/contacto/page.tsx
git commit -m "feat: add SEO metadata builder, sitemap, robots, and 404 page"
```

---

## Task 10: Light Tests — Vitest + RTL + Playwright Smoke

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`, `tests/ServiceCard.test.tsx`, `tests/Header.test.tsx`
- Create: `playwright.config.ts`, `e2e/navigation.spec.ts`
- Modify: `package.json` (scripts + devDependencies)

- [ ] **Step 1: Install test dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @playwright/test
pnpm dlx playwright install chromium
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: Create `tests/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Create `tests/ServiceCard.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceCard } from "@/components/ServiceCard";

const sample = {
  slug: "consultas" as const,
  title: "Consultas",
  description: "Reuniones de orientación legal.",
  fee: "Desde USD 60",
};

describe("ServiceCard", () => {
  it("renders title, description, and fee", () => {
    render(<ServiceCard service={sample} />);
    expect(screen.getByRole("heading", { name: "Consultas" })).toBeInTheDocument();
    expect(screen.getByText("Reuniones de orientación legal.")).toBeInTheDocument();
    expect(screen.getByText("Desde USD 60")).toBeInTheDocument();
  });

  it("sets the anchor id from the slug", () => {
    const { container } = render(<ServiceCard service={sample} />);
    expect(container.querySelector("article")?.id).toBe("consultas");
  });
});
```

- [ ] **Step 5: Create `tests/Header.test.tsx`**

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header", () => {
  it("renders the lawyer name and all nav links", () => {
    render(<Header />);
    expect(screen.getAllByText(/Apellido del Padre/i).length).toBeGreaterThan(0);
    ["Inicio", "Sobre Mí", "Servicios", "Contacto"].forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 6: Add test scripts to `package.json`**

In the `"scripts"` block of `package.json`, add:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test"
```

- [ ] **Step 7: Run unit tests**

```bash
pnpm test
```

Expected: 3 tests pass (2 in ServiceCard, 1 in Header).

- [ ] **Step 8: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 9: Create `e2e/navigation.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", heading: /áreas de práctica/i },
  { path: "/sobre-mi", heading: /sobre mí/i },
  { path: "/servicios", heading: /servicios/i },
  { path: "/contacto", heading: /contacto/i },
];

for (const route of routes) {
  test(`renders ${route.path}`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  });
}

test("CTA from landing reaches /contacto", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Reservar consulta" }).first().click();
  await expect(page).toHaveURL(/\/contacto$/);
});
```

- [ ] **Step 10: Run Playwright smoke**

```bash
pnpm test:e2e
```

Expected: 5 tests pass.

- [ ] **Step 11: Commit**

```bash
git add vitest.config.ts tests/ playwright.config.ts e2e/ package.json pnpm-lock.yaml
git commit -m "test: add vitest smoke tests and playwright navigation suite"
```

---

## Task 11: Accessibility + Mobile Polish

**Files:**
- Modify: `app/layout.tsx` (skip link)
- Modify: `components/Header.tsx`, `components/ServiceCard.tsx`, `app/page.tsx` (tap targets, contrast)

- [ ] **Step 1: Add skip-to-content link in `app/layout.tsx`**

Inside `<body>`, immediately before `<Header />`, add:

```tsx
<a
  href="#contenido"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-navy-900)] focus:px-4 focus:py-2 focus:text-[var(--color-ivory)]"
>
  Saltar al contenido principal
</a>
```

- [ ] **Step 2: Add `lang` attribute audit + verify**

Confirm `<html lang="es">` (already set in Task 2). Open the rendered page via `pnpm dev` and run Lighthouse → Accessibility audit in Chrome DevTools. Target ≥ 95.

- [ ] **Step 3: Run manual accessibility checklist**

Tab through `/`, `/sobre-mi`, `/servicios`, `/contacto`. Verify for each:
- Skip link appears on first Tab
- All interactive elements show gold focus outline
- Mobile menu toggle is keyboard-operable (Enter/Space)
- Headings descend in order (h1 → h2 → h3)
- All `<a>` and `<button>` have ≥ 44×44px effective tap area on mobile

Fix any gaps inline (commonly: bumping nav-link padding to `py-3` on mobile, ensuring header buttons are 40×40+).

- [ ] **Step 4: Resize sweep**

In DevTools, test 375px, 768px, 1024px, 1440px viewports across all four routes. Verify no horizontal scroll, no text smaller than 14px, no images overflow.

- [ ] **Step 5: Commit any tweaks**

```bash
git add -A
git commit -m "a11y: skip link, focus states, and mobile polish"
```

---

## Task 12: README + Vercel Deploy

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Bufete Jurídico — Portfolio Site

Sitio web profesional para abogado en práctica privada. Construido con Next.js 16, Tailwind CSS v4 y Cal.com para reservas de consulta.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Cal.com inline embed (`@calcom/embed-react`)
- Tests: Vitest + Playwright
- Deploy: Vercel

## Desarrollo local

```bash
pnpm install
cp .env.example .env.local   # editar valores
pnpm dev                     # http://localhost:3000
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_CAL_USERNAME` | Usuario de Cal.com (sin `cal.com/`) |
| `NEXT_PUBLIC_CAL_EVENT_SLUG` | Slug del tipo de evento (p. ej. `consulta-30min`) |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (sin `/` final) |

## Edición de contenido

Todo el copy editable vive en `content/site.ts`:

- Nombre, título y tagline del abogado
- Biografía y credenciales
- Lista de servicios (título, descripción, tarifa)
- Información de contacto (correo, teléfono, dirección)
- Enlaces de navegación

Para cambiar texto, edite `content/site.ts` y haga commit. No es necesario tocar otros archivos.

## Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm start        # Servir build de producción
pnpm lint         # Linter
pnpm test         # Tests unitarios (Vitest)
pnpm test:e2e     # Tests end-to-end (Playwright)
```

## Despliegue (Vercel)

1. Suba el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importe el repo.
3. Configure las variables de entorno (`NEXT_PUBLIC_CAL_USERNAME`, `NEXT_PUBLIC_CAL_EVENT_SLUG`, `NEXT_PUBLIC_SITE_URL`).
4. Pulse **Deploy**. Cada push a `main` despliega automáticamente.

## Cal.com setup

1. Cree una cuenta en [cal.com](https://cal.com).
2. Cree un tipo de evento (p. ej. "Consulta inicial — 30 min").
3. Anote el username y el event slug (visible en la URL `cal.com/<username>/<event-slug>`).
4. Configure estos valores en `.env.local` (desarrollo) y en Vercel (producción).
```

- [ ] **Step 2: Push to GitHub**

```bash
git add README.md
git commit -m "docs: add README with setup and deploy instructions"

# create repo on GitHub UI or with gh
gh repo create hugo-lawyer-portfolio --public --source=. --remote=origin --push
```

If `gh` is unavailable, create the repo via the GitHub web UI then:

```bash
git remote add origin https://github.com/<user>/hugo-lawyer-portfolio.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy via Vercel**

Option A — Vercel dashboard:
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select the GitHub repo.
3. Add env vars `NEXT_PUBLIC_CAL_USERNAME`, `NEXT_PUBLIC_CAL_EVENT_SLUG`, `NEXT_PUBLIC_SITE_URL` (use the assigned `*.vercel.app` URL until a custom domain is connected).
4. Click **Deploy**.

Option B — Vercel CLI:

```bash
pnpm dlx vercel        # follow prompts
pnpm dlx vercel --prod
```

- [ ] **Step 4: Production smoke test**

Open the deployed URL. Verify:
- All 4 pages load
- Header/footer render correctly
- Cal.com widget appears (will show placeholder error until real username is set in Vercel env — expected)
- Mobile view works (test on real phone or DevTools device toolbar)
- Lighthouse score ≥ 95 (Performance) and ≥ 95 (Accessibility)

- [ ] **Step 5: Final commit + tag**

```bash
git tag v0.1.0 -m "MVP launch"
git push --tags
```

---

## Definition of Done

- All 12 tasks complete; every checkbox ticked.
- `pnpm build` succeeds with no errors.
- `pnpm test` passes.
- `pnpm test:e2e` passes.
- Site deployed to a public Vercel URL.
- README documents how to edit content and deploy.
- Client has reviewed the mockup (Task 0) and the live site.
- Cal.com username/event slug supplied by client and set in Vercel env vars.

---

## Out of Scope (per brief)

- Multi-language support — Spanish only.
- Blog / news section.
- Admin dashboard.
- Email marketing integration.
- Payment processing.
- Custom backend, database, authentication.
