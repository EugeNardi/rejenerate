from pathlib import Path
p=Path('src/main.tsx');t=p.read_text(encoding='utf-8')
t=t.replace('Link,NavLink,useLocation','Link,NavLink,Navigate,useLocation')
t=t.replace("import brief from './data/brief.json';", "import Presentation from './Presentation';")
start=t.index('function Home()');end=t.index('function Shop()',start)
t=t[:start]+'function Home(){return <Presentation/>}\n'+t[end:]
start=t.index('function Rich(');end=t.index('function NotFound(',start)
t=t[:start]+t[end:]
t=t.replace("const nav=[['/tienda','Tienda'],['/#canje','Canje'],['/#talles','Talles'],['/modelo','El modelo']];", "const nav=[['/#proyecto','El proyecto'],['/#modelo','El modelo'],['/#canje','Canje'],['/#equipo','Equipo']];")
t=t.replace('function App(){const [items',"function App(){const location=useLocation();const inStore=location.pathname.startsWith('/tienda');const pageNav=inStore?[['/','Volver al proyecto'],['/tienda','Tienda'],['/#talles','Talles']]:nav;const [items")
t=t.replace('{nav.map(', '{pageNav.map(')
old='<button className={s.bag} aria-label={`Tu selección, ${items.reduce((n,i)=>n+i.qty,0)} productos`} onClick={()=>setDrawer(true)}><Bag/><span className={s.bagText}>Tu selección</span><span className={s.badge}>{items.reduce((n,i)=>n+i.qty,0)}</span></button>'
new='{inStore?'+old+':<Link className={s.headerShop} to="/tienda">Ir a la tienda <Arrow/></Link>}'
assert old in t;t=t.replace(old,new)
t=t.replace('<Route path="/modelo" element={<Model/>}/>','<Route path="/modelo" element={<Navigate to="/#modelo" replace/>}/>')
t=t.replace('Lora,Georgia', 'Lora,Georgia')
t=t.replace('Dale otra vida al jean,<br/>dale diseño', 'Dale otra vida al jean, <br/>dale diseño')
p.write_text(t,encoding='utf-8')
