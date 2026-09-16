// ============================================================
// ACCESSPREMIUM — Re-exports de todos los design tokens
// Importar desde "@/styles/tokens" para acceder a cualquier tema.
// ============================================================

export { botanicalTheme } from "./botanical";
export { darkModeTheme } from "./darkMode";
export { coquetteTheme } from "./coquette";
export { safariTheme } from "./safari";
export { princessTheme } from "./princess";
export { racingTheme } from "./racing";
export { editorialTheme } from "./editorial";
export { religiousTheme } from "./religious";
export { gamerTheme } from "./gamer";
export { cafeEspressoTheme } from "./cafeEspresso";

// Mapa de familia → token para lookup dinámico
import { botanicalTheme } from "./botanical";
import { darkModeTheme } from "./darkMode";
import { coquetteTheme } from "./coquette";
import { safariTheme } from "./safari";
import { princessTheme } from "./princess";
import { racingTheme } from "./racing";
import { editorialTheme } from "./editorial";
import { religiousTheme } from "./religious";
import { gamerTheme } from "./gamer";
import { cafeEspressoTheme } from "./cafeEspresso";
import type { InvitationTheme, VisualFamily } from "@/types";

export const THEME_MAP: Record<VisualFamily, InvitationTheme | null> = {
  "botanical-elegance": botanicalTheme,
  "dark-mode-premium": darkModeTheme,
  "coquette-aesthetic": coquetteTheme,
  "safari-animal-friends": safariTheme,
  "princess-fantasy": princessTheme,
  "racing-action": racingTheme,
  "editorial-fine-art": editorialTheme,
  "religious-classic": religiousTheme,
  "gamer-neon": gamerTheme,
  // Familias sin token dedicado — usan el más cercano como fallback
  "rustic-chic": cafeEspressoTheme,
  "academic-formal": editorialTheme,
  "boho-natural": botanicalTheme,
};

/**
 * Obtiene el theme correspondiente a una familia visual.
 * Si no existe tema específico, retorna el tema botanical como fallback seguro.
 */
export function getThemeByFamily(family: VisualFamily): InvitationTheme {
  return THEME_MAP[family] ?? botanicalTheme;
}
