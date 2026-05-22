import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header", () => {
  it("renders the lawyer name and all nav links", () => {
    render(<Header />);
    expect(screen.getAllByText(/Wilfredo Hugo Sanchez/i).length).toBeGreaterThan(0);
    ["Inicio", "Sobre Mí", "Servicios", "Contacto"].forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });
});
