# Subdominios de invitaciones

## Alcance y arquitectura

React + Vite + React Router; no es Next.js. Esta rama parte de `feature/ayde-octavio-fotos-form`, sin incorporar la variante visual. No modifica diseños, contenido, fotos ni Forms.

`src/routing/invitationRegistry.ts` descubre entradas con `import.meta.glob('/src/app/*/*/page.tsx')`. El registro se genera durante el build: agregar una invitación requiere un nuevo build, no editar una tabla de clientes.

Estructura admitida:

```text
src/app/<categoria>/<slug>/page.tsx
```

Cada `page.tsx` debe exportar por defecto un componente React sin props obligatorias. Categoría y slug deben tener de 1 a 63 caracteres: letras minúsculas ASCII, números y guiones interiores. No se admiten carpetas adicionales entre estos niveles, mayúsculas, espacios ni guiones al principio/final. Las carpetas de assets, templates y demás archivos del proyecto no se registran.

Ejemplo inicial:

```tsx
// src/app/bodas/ayde-octavio/page.tsx
export { default } from '@/pages/templates/WeddingCafeEspresso';
```

La entrada adapta la invitación funcional existente; no duplica su implementación. Las demos antiguas siguen usando `TemplateDemoPage` y no adquieren automáticamente subdominios.

## Resolver

El dominio base es `invitaciones-access.smartbrain.lat`. El hostname se normaliza a minúsculas y se acepta un punto DNS final. Se exige un único segmento delante del dominio base:

```text
ayde-octavio.invitaciones-access.smartbrain.lat
→ slug ayde-octavio
→ /bodas/ayde-octavio
```

Subdominios anidados como `otro.ayde-octavio.invitaciones-access.smartbrain.lat` se rechazan. Dominios parecidos que no tienen el sufijo exacto no activan el resolver.

`InvitationRouting` se ejecuta antes de las rutas comerciales y usa la misma página tanto para el subdominio como para la ruta tradicional. No redirige la dirección del navegador. En el host del cliente solo admite `/` y su propia ruta canónica (con o sin barra final); el resto muestra una 404 y nunca renderiza landing/catálogo/navbar comercial. Mantiene query y fragmento de la URL.

| Host y ruta | Resultado |
| --- | --- |
| `invitaciones-access.smartbrain.lat/` | Landing existente |
| `invitaciones-access.netlify.app/` | Landing existente |
| `invitaciones-access.netlify.app/bodas/ayde-octavio` | Invitación funcional |
| `ayde-octavio.invitaciones-access.smartbrain.lat/` | Misma invitación, sin landing |
| `no-existe.invitaciones-access.smartbrain.lat/` | 404 de invitación |

Si varias categorías comparten slug, el registro conserva sus rutas explícitas pero bloquea el subdominio. Emite en consola un error con las rutas en conflicto y muestra una página de invitación no disponible. Se debe renombrar el slug conflictivo; nunca se elige el primer resultado.

La 404 es una vista del cliente. El fallback SPA existente (`public/_redirects`) devuelve HTTP 200; esta fase no implementa un estado HTTP 404 en servidor.

## Prueba local

```sh
npm run dev -- --host 127.0.0.1 --port 8081 --strictPort
```

Abrir:

- `http://127.0.0.1:8081/?__invitationHost=ayde-octavio.invitaciones-access.smartbrain.lat`
- `http://127.0.0.1:8081/?__invitationHost=no-existe.invitaciones-access.smartbrain.lat`
- `http://127.0.0.1:8081/?__invitationHost=invitaciones-access.smartbrain.lat`
- `http://127.0.0.1:8081/?__invitationHost=invitaciones-access.netlify.app`
- `http://127.0.0.1:8081/bodas/ayde-octavio`

`__invitationHost` simula únicamente la entrada del resolver, sin alterar el hostname real del navegador. Solo funciona con `import.meta.env.DEV` y hosts `localhost`, `127.0.0.1` o `[::1]`. En producción se ignora por completo. No modifica DNS, el archivo hosts ni la configuración de Vite.

```sh
npm test
npm run build
```

Validación realizada: 21 pruebas exitosas (estructura, descubrimiento real, colisiones, hosts, aislamiento, rutas anteriores y simulación); build y ESLint de archivos modificados correctos. Navegador: invitación simulada sin landing, 404 desconocida, landing Netlify simulada y navegación desde catálogo a `/bodas/ayde-octavio`. Permanece el aviso de bundle principal superior a 500 kB.

## Netlify pendiente

Sitio objetivo: `invitaciones-access`; Site ID: `1084c7bc-85a6-49f0-a396-cdeecef50958`.

Esta fase prepara únicamente el frontend. No se ha publicado esta rama ni verificado el subdominio público. Para usarlo realmente deberán estar configurados DNS, el dominio correspondiente y HTTPS en el sitio, además de desplegar este código. No se añaden API calls, tokens ni GitHub Actions.
