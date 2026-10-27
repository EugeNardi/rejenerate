# ReJeanérate

Landing de presentación extensa, catálogo de 34 productos y tienda de demostración, construidos con React 18, TypeScript, Vite y CSS Modules. La selección se conserva en sessionStorage. Los precios salen de `src/data/catalog.json`; hogar y escolar no muestran precios ni permiten agregarse.

## Desarrollo

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Producción en Vercel

Configurado para Node.js 24.x, instalación reproducible con `npm ci --include=dev`, compilación `npm run build` y salida `dist`. `vercel.json` permite abrir y recargar las rutas de React Router. No requiere backend ni claves de servicios externos.

Importá `EugeNardi/rejenerate` en Vercel con **Root Directory `./`** y **Framework Vite**. Instrucciones completas: [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md).

Rutas: `/`, `/tienda`, `/tienda/:id` y página 404. `/modelo` redirige al capítulo del modelo en la landing. El hosting debe servir index.html como fallback de las rutas del navegador.

La landing y la tienda tienen navegación diferente. La landing reúne la presentación del proyecto y conduce al catálogo con «Ir a la tienda». La selección solo aparece en las páginas de tienda. «Volver al proyecto» permite regresar.

La presentación contiene unas 3.600 palabras: idea y propósito, canje de dos vías, mercado y fuentes, tres perfiles de clientes, cuatro hallazgos, propuesta de valor, canales, diseño, producción y cadena de valor, condiciones completas del canje, diez bloques de CANVAS, costos e inversión inicial, doce tareas del lanzamiento, riesgos, métricas, equipo y profesores, talles y preguntas frecuentes. Incluye índice fijo por capítulos y CANVAS original ampliable.

## Contenido y marca

Se usaron el catálogo y las imágenes provistas, Lora y Lato con sus licencias OFL, la paleta original y la dirección «Costura a la vista». No hay pagos, pedidos ni captura de datos. Instagram, WhatsApp y feria siguen en null en `src/config/site.ts`.

Referencia editorial: [VERIÉ, Ismail Nahid, Dribbble](https://dribbble.com/shots/26756837-VERI-Modern-Fashion-Website-Design). Se consultó Awwwards, pero su portada no respondió. No se copiaron imágenes ni identidad de terceros.

## Verificación

`npm run build` pasa. El recorrido inicial con Playwright verifica selección, cantidades, persistencia, vaciado, menú, foto pendiente, ausencia de precios de líneas próximas y cinco rutas en 320, 360, 390, 768, 1024, 1280 y 1440 px. La ampliación verifica los datos principales, diez bloques de CANVAS, siete anchos, navegación por capítulos, modal, menú móvil, separación de tienda y redirección de /modelo. La regresión de tienda verifica combinación de ítems, copia, eliminación y retorno del foco. Capturas e informes Lighthouse en `output/playwright/`.

Los informes Lighthouse se guardan por versión en `output/playwright/`; las mediciones locales no garantizan el resultado del entorno publicado.

Medición móvil de la presentación extensa: rendimiento 78, accesibilidad 100 y buenas prácticas 100; LCP 3,7 s, sin desplazamientos de diseño. La carga anticipada de las fuentes redujo el bloqueo del hilo principal. El objetivo de rendimiento 85 y LCP menor a 2,5 s del documento inicial aún no se alcanza con esta versión ampliada.

Pendientes comerciales: fotos reales de prototipos, contactos, ubicación de feria, equivalencia de talles y validación final de precios. La tienda conserva el alcance de demostración del material entregado.
