# Ayde y Octavio · Crema y cielo

- Rama: `variant/ayde-octavio-cream-skyblue`, desde `feature/ayde-octavio-fotos-form` (`6fd46b1`).
- Preview: `/preview/ayde-octavio/cream-skyblue`.
- Referencia preservada: `/bodas/ayde-octavio`. No se cambian sus datos ni sus componentes.

## Exploración con Stitch

Proyecto: https://stitch.withgoogle.com/projects/3645633093060878149

Se generaron tres direcciones: editorial romántico (aire, tipografía y fotografías asimétricas), luxury suave (papelería en capas, marcos y champagne) y romántico floral delicado (arcos y botánicos suaves).

Se eligió editorial romántico por su legibilidad móvil y protagonismo de las fotos reales. Se adaptó al React existente con `InvitationLayout`, `CountdownTimer`, tokens propios y CSS Modules; no se incorporó el HTML generado ni fotografías ficticias de Stitch.

Paleta: marfil `#FCFAF5`, azul cielo `#DCEAF1`, papel cálido `#FFFEFB`, champagne `#B6A17A` y texto azul grisáceo `#304B5A`. Se reutilizan las tipografías disponibles.

## Fotografías

Los siete originales permanecen intactos en `src/assets/invitations/cafe-espresso/fotos/`.

| Archivo | Uso |
| --- | --- |
| HORIZONTAL PRINCIPAL.webp | Portada enmarcada con recorte editorial |
| VERTICAL PRINCIPAL.webp | Retrato principal en arco |
| VERTICAL 2.webp | Retrato secundario escalonado |
| HORIZONTAL (3).webp | Separador fotográfico de playa |
| HORIZONTAL (5).webp | Cierre |

## Datos e integración

Solo la variante incorpora los nuevos horarios: **7:00 pm — Misa en la Iglesia de San Francisco de Asís** y **8:30 pm — Boda civil en el salón Pérgolas**. El contador apunta al inicio de la misa, el 30 de enero de 2027, UTC-06:00. Se conservan los enlaces de ubicación existentes.

RSVP mediante botón a https://forms.gle/yAHXHLKRF3im4t5MA en nueva pestaña. Incluye pase para dos personas, indicación de nombres y 1/2 asistentes, fecha límite octubre de 2026 y aviso con un mes de anticipación. Contactos pendientes.

**PENDIENTE DE VERIFICACIÓN EN GOOGLE FORMS:** correo receptor, mensaje final y configuración interna de obligatoriedad. No se modificó el formulario ni se enviaron respuestas de prueba. La revisión pública previa detectó WhatsApp y mensaje obligatorios, y solicitud de número/nombres incluso al indicar que no se asistirá.

## Validación

- `npm run build`: correcto; persiste aviso de tamaño del chunk principal (>500 kB).
- ESLint de los cinco archivos de implementación y `git diff --check`: correctos.
- Revisión visual en navegador a 390 × 844 y 1440 × 1000, sin desbordamiento horizontal.
- Las cinco fotografías cargan; consola de la variante sin errores.
- El botón de confirmación abre el formulario público correcto en una nueva pestaña.
- Sin cambios en assets originales, landing, precios, otras invitaciones ni `main`.

La preview es local. Esta rama no se ha fusionado ni publicado.
