# Ayde y Octavio: composición floral premium

Cambios de presentación sobre `1aceefb`, exclusivamente en la rama
`feature/ayde-octavio-romantic-sky`. El componente WeddingCreamSkyblue tiene
actualmente un único consumidor real: la página de Ayde y Octavio.

## Composición

| Asset | Dimensiones | Uso |
| --- | --- | --- |
| floral-corner-top-right | 1254 × 1254 | Apertura y esquina superior de portada |
| floral-corner-bottom-left | 1254 × 1254 | Apertura, diagonal de portada y RSVP |
| floral-side-right | 1086 × 1448 | Lateral de itinerario; oculto en móvil |
| floral-frame-gold | 1122 × 1402 | Una sola tarjeta: título de lluvia de sobres |
| floral-divider | 2172 × 724 | Dos transiciones: después de padres y antes del cierre |

Portada con doble borde champagne y fotografía adyacente, padres en tarjeta
marfil, itinerario con línea fina y regalos con texto separado del marco para
preservar legibilidad móvil. Se mantienen textos, horarios, fotos y enlaces.

## Optimización y accesibilidad

Cinco PNG originales conservados. Copias WebP de la misma resolución, calidad
90, transparencia verificada idéntica: 8,106,105 → 2,486,556 bytes (69.3% menos).
No se importan los originales nuevos en el componente.
Decoraciones con alt vacío, aria-hidden, sin interacción ni selección;
carga lazy/async bajo la portada. Entrada breve y soporte reduced-motion.

## Validación local

- 49 pruebas aprobadas; build de producción exitoso.
- ESLint del componente: aprobado. Lint global: 7 errores y 10 advertencias
  preexistentes fuera de estos cambios (UI compartida, WeddingCafeEspresso,
  panel-api y tailwind.config; advertencias adicionales en UI/panel).
- Escritorio y móviles de 375, 390 y 430 px revisados visualmente; sin overflow
  horizontal. Fotos y florales cargados, sin errores de consola en la invitación.
- Música reproduce y pausa; botón de confirmación abre el Forms existente.
- Ambos enlaces de ubicación abren los destinos existentes de iglesia y salón.
- Pantalla de acceso al panel disponible mediante simulación local del hostname.
- No se enviaron respuestas, credenciales ni escrituras a servicios externos.
  Login autenticado, Supabase y sincronización Sheets no se probaron de extremo
  a extremo. Sus archivos, routing y Open Graph no se modificaron.
- Permanece la advertencia de Vite sobre bundle mayor de 500 kB.

Preview con servidor local: `/?__invitationHost=ayde-octavio.invitaciones-access.smartbrain.lat`.
Ruta tradicional conservada: `/bodas/ayde-octavio`.
Sin push, merge ni despliegue.
