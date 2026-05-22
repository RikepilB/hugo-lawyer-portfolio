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
