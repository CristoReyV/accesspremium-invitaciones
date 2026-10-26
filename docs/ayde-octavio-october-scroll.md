# Ayde y Octavio — observaciones de octubre de 2026

## Alcance

Solo `feature/ayde-octavio-romantic-sky`. Main conservada en
`c2e6c96b7cfb51fb7d41b7e9d7b851346f2d04b7`; sin push ni despliegue.

- Frase superior literal, incluidos «Mas» y «dos puedes resistir», con los
  saltos de línea proporcionados. No se corrigió la redacción del cliente.
- Timeline de cinco nodos: 7:00 PM Misa; 8:00 PM Recepción; 8:30 PM Ceremonia
  de matrimonio civil; 9:00 PM Programa social; 10:00 PM Cena.
- Iglesia para misa; Salón Pérgolas para recepción/civil; últimos dos sin lugar
  ni enlace inventados. Se conservan los enlaces existentes.
- Fotos, madre/cruz, regalos, RSVP, fecha y paleta preservados.

## Investigación de scroll

Antes: en Edge a 390 px, html/body/#root/main computaban overflow-x:hidden y
 overflow-y:auto. El documento medía 6989 px y las capas internas tenían esa
misma altura: no estaban limitadas a un viewport. Por tanto esto demuestra
contenedores de scroll implícitos, **no prueba por sí solo** la causa exacta
intermitente reportada en el teléfono del cliente.

Corrección preventiva dirigida a ese riesgo: clase local de esta invitación
en los ancestros con overflow-x:clip / overflow-y:visible y scroll-behavior:auto.
Se elimina al desmontar (prueba de regresión incluida). Se conserva el scroll
nativo y el zoom; no se añaden touchmove, preventDefault ni librerías.
También se usa clip en apertura/RSVP, en vez de crear otros scroll containers.

Segundo factor probable: transform/reveal sobre secciones completas con fotos
y florales. Se omiten esos reveals y el de portada en móvil/tablet y puntero
táctil; escritorio conserva entrada breve y elimina el transform al terminar.
Reduced-motion sigue respetado. Sin nuevos filtros ni blur.

Se corrigió el lateral floral del programa (right:-65px → 0) y se permitió
encoger celdas de grid/flex. La portada conserva min-height:100svh con fallback
100vh: altura estable ante barras móviles, sin fijar la altura del documento.

## Decoraciones e interacción

No se modificaron ni eliminaron assets. Se reutilizan WebP transparentes y
lazy/async. Medidas de cajas reales en 375/390/430 px: esquina superior 155 px,
inferior 120 px, divisor 200 × 66.7 px, marco 327–330 × 409–412 px, floral RSVP
180 px; lateral oculto (0 × 0). Todas con pointer-events:none y aria-hidden.
Botones flotantes: 44 × 44 px, sin padre fixed de pantalla completa.
Mensaje de error musical no intercepta gestos. No se encontraron listeners
que bloqueen touch/wheel, parallax ni scroll-snap en esta invitación.

## Validación

- 52 tests Vitest / 7 archivos: pasan, incluida restauración de ancestros.
- npm run build: pasa; advertencia existente de bundle >500 kB.
- ESLint de archivos cambiados y script: pasa.
- npm run lint global: 8 errores y 10 advertencias ajenos al cambio (UI
  compartida, WeddingCafeEspresso, panel-api, tailwind y hooks/fast refresh).
- Playwright ya instalado, con Edge local: 375/390/430/820/1440 px. No se
  instalaron navegadores ni dependencias. Capturas revisadas de hero/programa
  y composición completa, con padres/fotos/regalos/RSVP/cierre conservados.
- Gestos touch simulados lentos/rápidos y reversas; rueda cerca de ornamentos
  y controles; reproducción/pausa y scroll con música. Sin bloqueo observado.
- Sin overflow horizontal en el recorrido de todas las secciones. Todas las
  imágenes visibles cargaron. Sin errores JavaScript en esos recorridos.
- Botones Forms/ubicaciones abren pestañas externas; se conservaron destinos.
  No se enviaron respuestas ni se modificó el formulario.
- Ruta tradicional, hostname simulado y pantalla de acceso al panel: pasan.
  No se probó login autenticado, sincronización ni backend de extremo a extremo.
- Reduced motion: animación de portada none.

Reproducir la prueba local (Edge instalado):
`node scripts/verify-ayde-scroll.mjs <DIRECTORIO_DE_CAPTURAS>`
Variable opcional `PREVIEW_URL`; por defecto http://127.0.0.1:8082.

Limitación: prueba en navegador de escritorio con emulación, no en Safari/iOS
físico. El incidente original no se reprodujo de manera concluyente antes del
cambio. Conviene confirmar en el dispositivo donde se reportó antes de publicar.

## Mejora posterior: reveal ligero y fade inferior

La versión siguiente sustituye la desactivación móvil anterior por un observer
local de una sola aparición, sobre diez bloques de contenido (no fondos de
secciones completas). Opacidad y translate de 14 px, 650 ms ease-out, sin blur,
scroll listeners, bucles por frame, will-change ni dependencias. Cada bloque
se desobserva al entrar; el observer se desconecta al terminar. Reduced-motion
muestra todo inmediatamente, incluso al cambiar la preferencia durante la visita.
Se conserva la inclinación estática de la fotografía del ramo.

Fade inferior: 64 px, gradient marfil hasta alpha .55, pointer-events:none,
user-select:none, aria-hidden; z-index 5, debajo de controles (10). No usa
filter ni backdrop-filter. La corrección de scroll nativo permanece intacta.

El comprobador ahora espera la carga del hero, deja estabilizar la inercia antes
de medir una reversa y posiciona la rueda en una sección intermedia, evitando
falsos fallos al final del documento tras capturar un timeline alto. Incluye
un gesto iniciado dentro del fade, verificación de opacidad final y preferencia
de movimiento reducido. Es compatible con el preview mediante PREVIEW_URL.
