import { describe, expect, it } from "vitest";
import {
  INVITATION_SOCIAL_REGISTRY,
  injectSocialMetadata,
} from "../../netlify/edge-functions/invitation-social-meta";

describe("invitation social preview metadata", () => {
  const aydeHost = "ayde-octavio.invitaciones-access.smartbrain.lat";

  it("registra metadatos completos y exactos para Ayde y Octavio", () => {
    const meta = INVITATION_SOCIAL_REGISTRY[aydeHost];
    expect(meta).toBeDefined();
    expect(meta.title).toBe("Ayde & Octavio | Nuestra Boda");
    expect(meta.description).toBe("30 de enero de 2027 · Nos encantará compartir este día contigo.");
    expect(meta.type).toBe("website");
    expect(meta.url).toBe("https://ayde-octavio.invitaciones-access.smartbrain.lat/");
    expect(meta.image).toBe("https://ayde-octavio.invitaciones-access.smartbrain.lat/og/ayde-octavio.jpg");
    expect(meta.imageWidth).toBe(1200);
    expect(meta.imageHeight).toBe(630);
    expect(meta.imageType).toBe("image/jpeg");
    expect(meta.siteName).toBe("Ayde & Octavio");
    expect(meta.twitterCard).toBe("summary_large_image");
  });

  it("no registra metadatos para la landing ni para otros hosts desconocidos", () => {
    expect(INVITATION_SOCIAL_REGISTRY["invitaciones-access.smartbrain.lat"]).toBeUndefined();
    expect(INVITATION_SOCIAL_REGISTRY["desconocido.invitaciones-access.smartbrain.lat"]).toBeUndefined();
  });

  it("reemplaza título, descripción y tags existentes por los de Ayde y Octavio", () => {
    const sampleHtml = `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>AccessPremium | Invitaciones Web</title>
  <meta name="description" content="Landing comercial genérica." />
  <meta property="og:title" content="AccessPremium Original" />
  <meta property="og:image" content="/og-image.png" />
  <meta name="twitter:card" content="summary" />
</head>
<body><div id="root"></div></body>
</html>`;

    const meta = INVITATION_SOCIAL_REGISTRY[aydeHost];
    const transformed = injectSocialMetadata(sampleHtml, meta);

    // Nuevos metadatos presentes
    expect(transformed).toContain("<title>Ayde & Octavio | Nuestra Boda</title>");
    expect(transformed).toContain('<meta name="description" content="30 de enero de 2027 · Nos encantará compartir este día contigo.">');
    expect(transformed).toContain('<meta property="og:type" content="website">');
    expect(transformed).toContain('<meta property="og:title" content="Ayde & Octavio | Nuestra Boda">');
    expect(transformed).toContain('<meta property="og:description" content="30 de enero de 2027 · Nos encantará compartir este día contigo.">');
    expect(transformed).toContain('<meta property="og:url" content="https://ayde-octavio.invitaciones-access.smartbrain.lat/">');
    expect(transformed).toContain('<meta property="og:image" content="https://ayde-octavio.invitaciones-access.smartbrain.lat/og/ayde-octavio.jpg">');
    expect(transformed).toContain('<meta property="og:image:width" content="1200">');
    expect(transformed).toContain('<meta property="og:image:height" content="630">');
    expect(transformed).toContain('<meta property="og:image:type" content="image/jpeg">');
    expect(transformed).toContain('<meta property="og:site_name" content="Ayde & Octavio">');
    expect(transformed).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(transformed).toContain('<meta name="twitter:title" content="Ayde & Octavio | Nuestra Boda">');
    expect(transformed).toContain('<meta name="twitter:description" content="30 de enero de 2027 · Nos encantará compartir este día contigo.">');
    expect(transformed).toContain('<meta name="twitter:image" content="https://ayde-octavio.invitaciones-access.smartbrain.lat/og/ayde-octavio.jpg">');

    // Metadatos genéricos eliminados
    expect(transformed).not.toContain("AccessPremium Original");
    expect(transformed).not.toContain("Landing comercial genérica");
    expect(transformed).not.toContain("/og-image.png");
  });
});
