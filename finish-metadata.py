from pathlib import Path
p=Path('index.html');t=p.read_text(encoding='utf-8')
t=t.replace('<link rel="preload" as="image"','<link rel="preload" as="image" fetchpriority="high"')
t=t.replace('ReJeanérate · Accesorios para mascotas hechos con jean recuperado','ReJeanérate · Un jean, otra historia')
t=t.replace('Correas, pecheras, collares y cuchas de jean recuperado, cosidos a mano en Córdoba. Traé tu jean y ganá un descuento.','Conocé ReJeanérate: diseño circular, jean recuperado y productos hechos a mano en Córdoba. La idea, el canje, el modelo de negocio y la tienda.')
p.write_text(t,encoding='utf-8')
p=Path('src/main.tsx');t=p.read_text(encoding='utf-8').replace('ReJeanérate · Accesorios para mascotas hechos con jean recuperado','ReJeanérate · Un jean, otra historia');p.write_text(t,encoding='utf-8')
