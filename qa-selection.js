async (page) => {
 await page.goto('http://127.0.0.1:4173/tienda/pechera-aventura');await page.setViewportSize({width:1440,height:900});
 await page.getByRole('radio',{name:'Perro mediano $25.000'}).check();
 await page.getByRole('button',{name:'Agregar a tu selección',exact:true}).first().click();
 await page.waitForTimeout(1600);
 await page.getByRole('button',{name:'Agregar a tu selección',exact:true}).first().click();
 await page.getByRole('button',{name:'Ver tu selección',exact:true}).click();
 await page.getByRole('dialog',{name:'Tu selección'}).waitFor();
 if(await page.getByRole('heading',{name:'Pechera Aventura',exact:true}).count()!==2)throw Error('Duplicate selection row');
 if(!await page.getByText('$50.000',{exact:true}).isVisible())throw Error('Merge total');
 await page.getByRole('button',{name:'Copiar mi selección',exact:true}).click();await page.getByRole('button',{name:'Copiada',exact:true}).waitFor();
 await page.getByRole('button',{name:'Quitar Pechera Aventura, Perro mediano',exact:true}).click();await page.getByRole('heading',{name:'Tu selección está vacía'}).waitFor();
 await page.keyboard.press('Escape');
 const focus=await page.evaluate(()=>document.activeElement?.textContent);
 if(!focus?.includes('Ver tu selección'))throw Error('Focus not restored');
 await page.emulateMedia({reducedMotion:'reduce'});
 return {merge:true,copy:true,remove:true,focusRestored:true,reducedMotion:true};
}
