# Publicar ReJeanérate en Vercel

El repositorio contiene el proyecto en su raíz. No selecciones una subcarpeta llamada `rejeanerate` al importarlo en Vercel.

1. Entrá a https://vercel.com/new e iniciá sesión con GitHub.
2. Importá `EugeNardi/rejenerate`. Si no aparece, autorizá a Vercel a acceder a ese repositorio.
3. Dejá **Root Directory** en `./` y **Framework Preset** en **Vite**.
4. Usá **Node.js 24.x**. `package.json` ya fija esta versión.
5. Confirmá los ajustes que aporta `vercel.json`:

   | Ajuste | Valor |
   | --- | --- |
   | Install Command | `npm ci --include=dev` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Production Branch | `main` |

6. No necesitás configurar variables de entorno para el primer despliegue.
7. Presioná **Deploy** y abrí la URL que genere Vercel cuando termine.

## Comprobar la publicación

- Abrí la portada, entrá con «Ir a la tienda» y volvé con «Volver al proyecto».
- Abrí directamente `/tienda/cucha-nido` y recargá. Debe aparecer la ficha; el fallback de rutas está en `vercel.json`.
- Elegí un talle y agregalo a la selección. El estado permanece al recargar la misma pestaña.
- Revisá `/modelo`: debe llevar al CANVAS de la landing.
- Verificá el sitio desde el teléfono.

La tienda sigue siendo una demostración: permite explorar y armar una selección; no procesa pagos ni pedidos.

## Actualizaciones y dominio

Una vez conectado el repositorio, los pushes a `main` generan un nuevo despliegue de producción. Vercel administra el dominio `.vercel.app` y HTTPS; para un dominio propio, agregalo en **Settings → Domains**.

Los metadatos de redes usan `VERCEL_PROJECT_PRODUCTION_URL` o `VERCEL_URL`, sin depender del sitio privado anterior. Si querés fijar un dominio propio, agregá `VITE_SITE_URL=https://tudominio.com` en Vercel y volvé a desplegar. No incluyas claves ni contraseñas en variables con prefijo `VITE_`.

Instagram ya está configurado; WhatsApp y la feria siguen pendientes en `src/config/site.ts`. Las imágenes ilustrativas, precios y equivalencias de talles necesitan la validación comercial indicada en el README antes de habilitar ventas reales.

## Referencias

- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/environment-variables/system-environment-variables
