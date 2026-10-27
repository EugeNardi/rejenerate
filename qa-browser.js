async (page) => {
 const errors=[]; const missing=[]; page.on('pageerror',e=>errors.push(e.message)); page.on('response',r=>{if(r.status()>=400)missing.push(r.url())});
 await page.goto('http://127.0.0.1:4173/tienda/pechera-aventura');
 await page.setViewportSize({width:1440,height:900});
 await page.getByRole('radio',{name:'Perro mediano $25.000'}).check();
 await page.getByRole('button',{name:'Agregar a tu selección',exact:true}).first().click();
 await page.getByRole('button',{name:'Ver tu selección',exact:true}).click();
 await page.getByRole('dialog',{name:'Tu selección'}).waitFor();
 if(!await page.getByText('Total de referencia',{exact:true}).isVisible())throw Error('Missing total');
 await page.getByRole('button',{name:'Aumentar cantidad de Pechera Aventura, Perro mediano'}).click();
 if(!await page.getByText('$50.000',{exact:true}).isVisible())throw Error('Quantity total');
 await page.screenshot({path:'output/playwright/selection-desktop.png'});
 await page.getByRole('button',{name:'Cerrar',exact:true}).click();
 await page.reload();
 await page.getByRole('button',{name:'Tu selección, 2 productos'}).click();
 await page.getByRole('dialog',{name:'Tu selección'}).waitFor();
 if(!await page.getByText('$50.000',{exact:true}).isVisible())throw Error('Persistence');
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Tu selección, 2 productos'}).click();
 await page.getByRole('button',{name:'Vaciar selección',exact:true}).click();
 await page.getByRole('button',{name:'Sí',exact:true}).click();
 await page.getByRole('heading',{name:'Tu selección está vacía'}).waitFor();
 await page.keyboard.press('Escape');
 const results=[];
 for (const path of ['/','/tienda','/tienda/cucha-nido','/modelo','/no-existe']) {
  await page.goto('http://127.0.0.1:4173'+path);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  for(const width of [320,360,390,768,1024,1280,1440]){
   await page.setViewportSize({width,height:width<640?844:900});
   const check=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));
   if(check.scroll>check.width)throw Error('Overflow '+path+' '+width+' '+check.scroll);
   if(check.h1!==1)throw Error('Heading count '+path);
   if(check.broken.length)throw Error('Broken images '+JSON.stringify(check.broken));
   results.push({path,width,pass:true});
   if([390,768,1440].includes(width))await page.screenshot({path:'output/playwright/'+(path==='/'?'home':path.replaceAll('/','-'))+'-'+width+'.png',fullPage:false});
  }
 }
 await page.goto('http://127.0.0.1:4173/tienda?linea=escolar');
 if(await page.locator('main').getByText(/\$/).count())throw Error('Upcoming prices visible');
 await page.getByRole('button',{name:'Hogar y accesorios',exact:true}).click();
 if(await page.locator('main').getByText(/\$/).count())throw Error('Homeware prices visible');
 await page.goto('http://127.0.0.1:4173/tienda/enrollable-oficina');
 await page.getByText('Foto en preparación',{exact:true}).waitFor();
 if(await page.getByRole('button',{name:'Agregar a tu selección',exact:true}).count())throw Error('Upcoming add button');
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Menú',exact:true}).click();await page.getByRole('dialog',{name:'Menú'}).waitFor();await page.keyboard.press('Escape');
 if(errors.length||missing.length)throw Error(JSON.stringify({errors,missing}));
 return {checks:results.length,selection:'add, quantity, persistence, clear, Escape passed',upcoming:'no price or add; missing photo passed',errors,missing};
}
