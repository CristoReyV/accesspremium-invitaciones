# Boda1 Vault Audit - Análisis para AccessPremium

Este documento contiene el análisis estratégico de la invitación `boda1` extraída en el Vault, con el objetivo de elevar nuestra demo `WeddingBotanical` en SmartStudio.

---

## A. Resumen Visual de la Invitación

- **Estilo general:** "Blue Botanical / Elegant Paper". Minimalista, elegante y romántico. Simula texturas físicas (papel artesanal, sobre de papel, sello de cera).
- **Paleta de colores:** 
  - **Fondo primario:** Azul cobalto grisáceo / Pizarra con textura de papel artesanal.
  - **Tarjetas y fondos secundarios:** Beige claro / Blanco crudo (`#f4f1eb` aproximadamente).
  - **Acentos:** Azul marino intenso (textos), dorado o bronce opaco (ilustraciones lineales y marcos).
- **Composición:** Diseño vertical compuesto por un fondo azul texturizado fijo sobre el cual "flotan" tarjetas beige con bordes redondeados y sombras suaves (elevación).
- **Nivel de decoración:** Alto pero limpio. Utiliza ilustraciones estilo "line art" (dibujo de una línea) para casi todo: flores, vestidos, iglesias, regalos.
- **Secciones principales:** 
  1. Hero de apertura (Sobre físico que revela foto Polaroid).
  2. Agradecimiento a Padres/Padrinos (Banner largo beige).
  3. Calendario tipo "Save the Date" superpuesto a foto.
  4. Tarjetas de Eventos (Ceremonia Religiosa, Recepción).
  5. Dress Code (con ilustraciones de trajes).
  6. Galería (Foto altar).
  7. Cuenta Regresiva (Texto grande sin fondo).
  8. Mesa de Regalos.
  9. RSVP (Dividido para invitados de la novia / del novio).
- **Elementos "vivos" (Dinamismo):** Sombras difusas pronunciadas en las tarjetas que dan un efecto 3D o de capas físicas (`box-shadow`), destellos radiales sutiles en los fondos, y reproductor de música integrado.

---

## B. Assets Útiles Encontrados en el Vault (`replicas/Bodas_Aniversarios/boda1`)

| Nombre Sugerido / Tipo | Dónde está en el Vault | Uso en SmartStudio | Prioridad |
| :--- | :--- | :--- | :--- |
| **Fondo Textura Azul** | `images/` (el JPG grande azulado) | Fondo global `bg-image` o componente wrapper principal. | **Alta** |
| **Ilustración Lirio / Cala** | `images/` o incrustado | Icono para la tarjeta de Ceremonia Religiosa. | **Alta** |
| **Ilustración Arco Boda** | `images/` o incrustado | Icono para la tarjeta de Recepción. | **Alta** |
| **Ilustraciones Vestido y Traje** | `images/` o incrustado | Para ilustrar el Dress Code. | **Alta** |
| **Marcos Florales Top/Bottom** | `images/` o incrustado | Decoración para el banner de Padres/Padrinos y Mesa de Regalos. | **Media** |
| **Sobre y Sello Cera Azul** | Captura / `images/` | Recrear el Hero (animación de abrir el sobre). | **Alta** |

> *Nota: Al revisar la carpeta `svg/`, estaba vacía, lo que indica que Canva renderizó estas ilustraciones de líneas directamente como imágenes PNG transparentes (guardadas en `images/`).*

---

## C. Animaciones Detectadas (CSS Ingeniería Inversa)

Al analizar los archivos CSS, encontramos varios keyframes potentes para dar vida a la plantilla:

1. **`_21I6hA` (Ripple / Expansión)**
   - **Qué hace:** `transform: scale(0)` a `scale(9)` con desvanecimiento de `opacity: 1` a `0`. Crea ondas expansivas (Ripple effect).
   - **Dónde usar:** En el botón de Play/Pause de la música, o en los botones principales (RSVP) para llamar la atención sutilmente.
2. **`_7h8Eqw` (Glow Movement)**
   - **Qué hace:** Transforma coordenadas (`translate`) y altera opacidades de fondos con degradados radiales (`radial-gradient`).
   - **Dónde usar:** Para recrear destellos etéreos flotantes detrás de las tarjetas o en los bordes de la pantalla. Le da una "atmósfera" mágica al fondo estático.
3. **`VqdqJw` y `MRkCxg` (Pulse / Breathing)**
   - **Qué hace:** `opacity: 0.65` -> `0.85` -> `0.65`. Un efecto de "respiración".
   - **Dónde usar:** En el contenedor de la cuenta regresiva o elementos decorativos para darles vida pasiva.
4. **`xLYJdw` (Rotación Continua)**
   - **Qué hace:** `rotate(0deg)` a `rotate(1turn)`.
   - **Dónde usar:** Círculo de progreso del disco de vinilo en el reproductor de música.

---

## D. Mapeo para mejorar nuestra demo `WeddingBotanical`

Cómo integrar esta auditoría a los componentes de `WeddingBotanical`:

- **Portada / Hero:** Reemplazar el layout actual por una recreación del "Sobre con Sello". Al hacer tap, el sello desaparece, la tapa sube y sale la foto Polaroid (esto lo programaremos con Framer Motion o transiciones Tailwind).
- **Apertura de invitación:** Transición limpia desde el sobre al despliegue vertical.
- **Música:** Adoptar el diseño del reproductor de esta invitación (línea de tiempo, controles mínimos) usando nuestro hook de audio.
- **Flores y marcos:** Reemplazar los vectores "botánicos genéricos" por las ilustraciones "Line Art" extraídas (doradas/azules).
- **Padres/Padrinos:** Crear un componente `<VerticalBanner>` con fondo beige y marcos florales arriba/abajo.
- **Ceremonia y recepción:** Usar el componente `<FloatingCard>` (Tarjetas beige con `shadow-2xl` y `rounded-2xl`).
- **Dress Code:** Añadir `<DressCodeCard>` que implemente un flex con la imagen del vestido a la izquierda y el traje a la derecha.
- **RSVP Final:** Duplicar el botón para ofrecer "Invitados Novia" e "Invitados Novio" (requerirá un nuevo prop o ajuste en nuestro componente de base de datos).

---

## E. Recomendación Técnica

1. **Assets a copiar a `/public/invitations/boda1/`:** Las imágenes de fondo (textura), las ilustraciones de líneas (iglesia, trajes, arco) y el diseño base del sobre. 
2. **Lo que NO conviene copiar:** Ignorar completamente la sección final de "Catálogo y Paquetes de $349" (es publicidad del creador original, no pertenece a la invitación). Ignorar el HTML ofuscado.
3. **Animaciones:** En lugar de copiar los CSS ofuscados tal cual, es mejor transcribir los valores de `@keyframes` (como el Ripple y el Respiración) dentro de nuestro archivo `tailwind.config.ts` de SmartStudio para poder llamarlos limpiamente con `animate-ripple` o `animate-breath`.

---

## F. Plan de Implementación (Próximos Pasos)

1. **Migración Limpia:** Mover físicamente los archivos PNG/JPG útiles desde el Vault hacia `public/assets/templates/wedding-botanical-premium/`.
2. **Actualización de Tailwind:** Extender la paleta (`theme: { colors: { 'boda-blue': '#...'} }`) e incluir los nuevos `@keyframes` en `tailwind.config.ts`.
3. **Refactorización del Hero:** Actualizar la parte superior de `WeddingBotanical.tsx` para construir el componente interactivo del sobre y la Polaroid.
4. **Actualización de Layouts:** Modificar las secciones (Padres, Eventos, Dress Code) para que coincidan con la estética de tarjetas flotantes sobre fondo texturizado.
5. **Prueba en Local:** Ejecutar y ajustar el padding/sombras hasta lograr el diseño exacto de la captura.
