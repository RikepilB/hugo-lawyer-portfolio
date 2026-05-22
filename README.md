# Bufete Juridico -- Portfolio Site

Sitio web profesional para abogado en practica privada. Construido con Next.js 16, Tailwind CSS v4 y Cal.com para reservas de consulta.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Cal.com inline embed (`@calcom/embed-react`)
- Tests: Vitest + Playwright
- Deploy: Vercel / Netlify

## Desarrollo local

```bash
pnpm install
cp .env.example .env.local   # editar valores
pnpm dev                     # http://localhost:3000
```

## Variables de entorno

| Variable | Descripcion |
|---|---|
| `NEXT_PUBLIC_CAL_USERNAME` | Usuario de Cal.com (sin `cal.com/`) |
| `NEXT_PUBLIC_CAL_EVENT_SLUG` | Slug del tipo de evento (p. ej. `30min`) |
| `NEXT_PUBLIC_SITE_URL` | URL publica del sitio (sin `/` final) |

## Edicion de contenido

Todo el copy editable vive en `content/site.ts`:

- Nombre, titulo y tagline del abogado
- Biografia y credenciales
- Lista de servicios (titulo, descripcion, tarifa)
- Informacion de contacto (correo, telefono, direccion)
- Enlaces de navegacion

Para cambiar texto, edite `content/site.ts` y haga commit. No es necesario tocar otros archivos.

## Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de produccion
pnpm start        # Servir build de produccion
pnpm test         # Tests unitarios (Vitest)
pnpm test:e2e     # Tests end-to-end (Playwright)
```

## Despliegue

### Vercel

1. Suba el repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new) importe el repo.
3. Configure las variables de entorno (`NEXT_PUBLIC_CAL_USERNAME`, `NEXT_PUBLIC_CAL_EVENT_SLUG`, `NEXT_PUBLIC_SITE_URL`).
4. Pulse **Deploy**. Cada push a `main` despliega automaticamente.

### Netlify

1. Suba el repositorio a GitHub.
2. En [netlify.com](https://netlify.com) importe el repo.
3. Configure `Build command`: `pnpm build` y `Publish directory`: `.next`.
4. Agregue las variables de entorno en Site settings > Environment variables.
5. Cada push a `main` despliega automaticamente.

## Cal.com setup

1. Cree una cuenta en [cal.com](https://cal.com).
2. Cree un tipo de evento (p. ej. "Consulta inicial -- 30 min").
3. Anote el username y el event slug (visible en la URL `cal.com/<username>/<event-slug>`).
4. Configure estos valores en `.env.local` (desarrollo) y en Vercel/Netlify (produccion).
