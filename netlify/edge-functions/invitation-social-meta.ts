export interface Context {
  next: () => Promise<Response>;
  [key: string]: unknown;
}

export interface Config {
  path?: string | string[];
  onError?: "continue" | "fail" | "fallback";
}

export interface SocialMetadata {
  title: string;
  description: string;
  type: string;
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageType: string;
  siteName: string;
  twitterCard: string;
}

/**
 * Registro de metadatos sociales por subdominio.
 * Extensible para futuras invitaciones sin necesidad de crear más Edge Functions.
 */
export const INVITATION_SOCIAL_REGISTRY: Record<string, SocialMetadata> = {
  "ayde-octavio.invitaciones-access.smartbrain.lat": {
    title: "Ayde & Octavio | Nuestra Boda",
    description: "30 de enero de 2027 · Nos encantará compartir este día contigo.",
    type: "website",
    url: "https://ayde-octavio.invitaciones-access.smartbrain.lat/",
    image: "https://ayde-octavio.invitaciones-access.smartbrain.lat/og/ayde-octavio.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    imageType: "image/jpeg",
    siteName: "Ayde & Octavio",
    twitterCard: "summary_large_image",
  },
};

/**
 * Reemplaza de forma segura el título, descripción y tags Open Graph / Twitter existentes
 * en el documento HTML inyectando la metadata de la invitación correspondiente.
 */
export function injectSocialMetadata(html: string, meta: SocialMetadata): string {
  // 1. Eliminar title existente
  let cleaned = html.replace(/<title>[\s\S]*?<\/title>/gi, "");

  // 2. Eliminar description existente
  cleaned = cleaned.replace(/<meta\s+name=["']description["'][\s\S]*?>/gi, "");

  // 3. Eliminar tags og:* existentes
  cleaned = cleaned.replace(/<meta\s+property=["']og:[^"']*["'][\s\S]*?>/gi, "");

  // 4. Eliminar tags twitter:* existentes
  cleaned = cleaned.replace(/<meta\s+name=["']twitter:[^"']*["'][\s\S]*?>/gi, "");

  // 5. Construir nuevos tags Open Graph y Twitter Cards
  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}">`,
    `<meta property="og:type" content="${meta.type}">`,
    `<meta property="og:title" content="${meta.title}">`,
    `<meta property="og:description" content="${meta.description}">`,
    `<meta property="og:url" content="${meta.url}">`,
    `<meta property="og:image" content="${meta.image}">`,
    `<meta property="og:image:width" content="${meta.imageWidth}">`,
    `<meta property="og:image:height" content="${meta.imageHeight}">`,
    `<meta property="og:image:type" content="${meta.imageType}">`,
    `<meta property="og:site_name" content="${meta.siteName}">`,
    `<meta name="twitter:card" content="${meta.twitterCard}">`,
    `<meta name="twitter:title" content="${meta.title}">`,
    `<meta name="twitter:description" content="${meta.description}">`,
    `<meta name="twitter:image" content="${meta.image}">`,
  ].join("\n  ");

  // 6. Inyectar tags al inicio del <head>
  return cleaned.replace(/<head>/i, `<head>\n  ${tags}`);
}

export default async function handler(request: Request, context: Context): Promise<Response> {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");

  // Permitir simulación local con query param ?__invitationHost=...
  let effectiveHost = hostname;
  if (["localhost", "127.0.0.1", "[::1]"].includes(hostname)) {
    const simulated = url.searchParams.get("__invitationHost");
    if (simulated) effectiveHost = simulated.toLowerCase().replace(/\.$/, "");
  }

  const meta = INVITATION_SOCIAL_REGISTRY[effectiveHost];

  // Si no hay configuración para este hostname, continuar normalmente (landing o futuras rutas)
  if (!meta) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  // Solo transformar documentos HTML; pasar assets, imágenes, scripts intactos
  if (!contentType.includes("text/html")) {
    return response;
  }

  const html = await response.text();
  const modifiedHtml = injectSocialMetadata(html, meta);

  const headers = new Headers(response.headers);
  headers.delete("content-length");

  return new Response(modifiedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const config: Config = {
  path: "/*",
  onError: "continue",
};
