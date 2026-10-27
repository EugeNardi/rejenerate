async (page) => {
 const errors=[];const failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url())});
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4173');await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
 const content=await page.locator('main').innerText();
 for(const value of ['Compañeros de paseo','Familias con patio','Consumidores responsables','80%','78%','94%','66%','$25.000','$16.674','$8.326','$49.527,18','6 sets al mes','85%','Menos de 5%','Hebra Circular','Quince, Indonesia Shop y Tejano','Tristana Barseghian','Esteban Conci','12 al 20 de diciembre','$70.000 a $200.000']){if(!content.includes(value))throw Error('Missing presentation data: '+value)}
 if(await page.getByRole('button',{name:/Tu selección/}).count())throw Error('Selection visible in presentation');
 if(await page.locator('main a[href^="/tienda/"]').count())throw Error('Product cards remain in presentation');
 if(await page.locator('#canvas article[data-block]').count()!==10)throw Error('Canvas incomplete');
 const results=[];
 for(const width of [320,360,390,768,1024,1280,1440]){
  await page.setViewportSize({width,height:width<640?844:900});
  const layout=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length}));
  if(layout.scroll>width||layout.h1!==1)throw Error('Layout '+JSON.stringify(layout));
  results.push(layout);
 }
 await page.setViewportSize({width:1440,height:900});
 await page.getByRole('navigation',{name:'Capítulos de la presentación'}).getByRole('link',{name:'08 CANVAS',exact:true}).click();
 if(await page.locator('#canvas').evaluate(e=>e.getBoundingClientRect().top)<170)throw Error('Canvas title hidden by sticky nav');
 await page.screenshot({path:'output/playwright/presentation-canvas-desktop.png'});
 await page.getByRole('button',{name:'Ampliar el CANVAS original'}).click();await page.getByRole('dialog',{name:'CANVAS de base circular'}).waitFor();await page.keyboard.press('Escape');
 await page.getByRole('navigation',{name:'Capítulos de la presentación'}).getByRole('link',{name:'09 Costos y precio',exact:true}).click();await page.screenshot({path:'output/playwright/presentation-costs-desktop.png'});
 await page.getByRole('navigation',{name:'Capítulos de la presentación'}).getByRole('link',{name:'10 Plan de lanzamiento',exact:true}).click();await page.screenshot({path:'output/playwright/presentation-launch-desktop.png'});
 await page.getByRole('banner').getByRole('link',{name:'Ir a la tienda',exact:true}).click();await page.waitForURL('**/tienda');
 await page.getByRole('button',{name:'Tu selección, 0 productos'}).waitFor();
 await page.getByRole('navigation',{name:'Navegación principal'}).getByRole('link',{name:'Volver al proyecto',exact:true}).click();await page.waitForURL('http://127.0.0.1:4173/');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/playwright/presentation-mobile.png'});
 await page.getByRole('button',{name:'Menú',exact:true}).click();await page.getByRole('dialog',{name:'Menú'}).waitFor();await page.getByRole('navigation',{name:'Navegación móvil'}).getByRole('link',{name:'Equipo',exact:true}).click();await page.waitForURL('**/#equipo');
 await page.getByRole('navigation',{name:'Capítulos de la presentación'}).getByRole('link',{name:'09 Costos y precio',exact:true}).click();await page.screenshot({path:'output/playwright/presentation-costs-mobile.png'});
 await page.goto('http://127.0.0.1:4173/modelo');await page.waitForURL('**/#modelo');
 if(errors.length||failed.length)throw Error(JSON.stringify({errors,failed}));
 return {presentationWords:content.split(/\s+/).length,canvasBlocks:10,launchTasks:12,widths:results.length,separateShop:true,chapters:true,legacyRedirect:true,errors,failed};
}
