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
