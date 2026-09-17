import type { ComponentType } from "react";

export type InvitationLoader = () => Promise<{ default: ComponentType }>;
export interface InvitationEntry {
  category: string;
  slug: string;
  path: string;
  load: InvitationLoader;
}

// Un segmento DNS válido, también usado para las categorías de ruta.
const segment = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export function createInvitationRegistry(modules: Record<string, InvitationLoader>) {
  const entries: InvitationEntry[] = [];
  const bySlug = new Map<string, InvitationEntry[]>();
  for (const [file, load] of Object.entries(modules).sort(([a], [b]) => a.localeCompare(b))) {
    const match = /^\/src\/app\/([^/]+)\/([^/]+)\/page\.tsx$/.exec(file);
    if (!match || !segment.test(match[1]) || !segment.test(match[2])) continue;
    const [, category, slug] = match;
    const entry = { category, slug, path: `/${category}/${slug}`, load };
    entries.push(entry);
    bySlug.set(slug, [...(bySlug.get(slug) ?? []), entry]);
  }
  const collisions = [...bySlug.entries()].filter(([, matches]) => matches.length > 1);
  return { entries, bySlug, collisions };
}

export const invitationRegistry = createInvitationRegistry(
  import.meta.glob<{ default: ComponentType }>("/src/app/*/*/page.tsx"),
);

for (const [slug, entries] of invitationRegistry.collisions) {
  console.error(`[Invitaciones] Slug duplicado "${slug}": ${entries.map(entry => entry.path).join(", ")}. Subdominio bloqueado.`);
}
