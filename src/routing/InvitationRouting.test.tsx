import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import InvitationRouting from "./InvitationRouting";

vi.mock("@/pages/templates/WeddingCafeEspresso", () => ({ default: () => <h1>Invitación Ayde y Octavio</h1> }));

afterEach(cleanup);

function renderRoute(path: string) {
  render(<MemoryRouter initialEntries={[path]}><InvitationRouting>
    <Routes>
      <Route path="/" element={<h1>Landing comercial</h1>} />
      <Route path="/bodas/:slug" element={<h1>Demo anterior</h1>} />
      <Route path="*" element={<h1>404 anterior</h1>} />
    </Routes>
  </InvitationRouting></MemoryRouter>);
}

describe("integración del routing", () => {
  it("muestra la invitación en la raíz del subdominio simulado, sin landing", async () => {
    renderRoute("/?__invitationHost=ayde-octavio.invitaciones-access.smartbrain.lat");
    expect(await screen.findByText("Invitación Ayde y Octavio")).toBeInTheDocument();
    expect(screen.queryByText("Landing comercial")).not.toBeInTheDocument();
  });
  it.each(["invitaciones-access.smartbrain.lat", "invitaciones-access.netlify.app"])("mantiene landing en %s", host => {
    renderRoute(`/?__invitationHost=${host}`);
    expect(screen.getByText("Landing comercial")).toBeInTheDocument();
  });
  it("conserva la ruta tradicional y reutiliza la misma página", async () => {
    renderRoute("/bodas/ayde-octavio");
    expect(await screen.findByText("Invitación Ayde y Octavio")).toBeInTheDocument();
  });
  it("conserva otras demos", () => {
    renderRoute("/bodas/botanica-verde-olivo");
    expect(screen.getByText("Demo anterior")).toBeInTheDocument();
  });
  it.each(["/?__invitationHost=desconocido.invitaciones-access.smartbrain.lat", "/catalogo?__invitationHost=ayde-octavio.invitaciones-access.smartbrain.lat"])("muestra 404 aislada: %s", path => {
    renderRoute(path);
    expect(screen.getByText("Invitación no disponible")).toBeInTheDocument();
    expect(screen.queryByText("Landing comercial")).not.toBeInTheDocument();
  });
});
