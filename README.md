# ReJeanérate

Landing, catálogo de 34 productos y tienda de demostración, construidos con React 18, TypeScript, Vite y CSS Modules. La selección se conserva en sessionStorage. Los precios salen de `src/data/catalog.json`; hogar y escolar no muestran precios ni permiten agregarse.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run preview
```

Rutas: `/`, `/tienda`, `/tienda/:id`, `/modelo` y página 404. El hosting debe servir index.html como fallback de las rutas del navegador.

## Contenido y marca

Se usaron el catálogo y las imágenes provistas, Lora y Lato con sus licencias OFL, la paleta original y la dirección «Costura a la vista». No hay pagos, pedidos ni captura de datos. Instagram, WhatsApp y feria siguen en null en `src/config/site.ts`.

Referencia editorial: [VERIÉ, Ismail Nahid, Dribbble](https://dribbble.com/shots/26756837-VERI-Modern-Fashion-Website-Design). Se consultó Awwwards, pero su portada no respondió. No se copiaron imágenes ni identidad de terceros.

## Verificación

`npm run build` pasa. El recorrido con Playwright verifica selección, cantidades, persistencia, vaciado, menú, foto pendiente, ausencia de precios de líneas próximas y cinco rutas en 320, 360, 390, 768, 1024, 1280 y 1440 px. Capturas e informe Lighthouse en `output/playwright/`.

Lighthouse móvil local: rendimiento 91, accesibilidad 100, buenas prácticas 100; LCP 2,26 s. Son mediciones locales, no una garantía del entorno publicado.

Pendientes comerciales: fotos reales de prototipos, contactos, ubicación de feria, equivalencia de talles y validación final de precios. La tienda conserva el alcance de demostración del material entregado.
