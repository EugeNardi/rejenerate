from pathlib import Path
p=Path('src/main.tsx');t=p.read_text(encoding='utf-8');t=t.replace('Hechos para<br/>el paseo de<br/>','Hechos para <br/>el paseo de <br/>')
t=t.replace('<NavLink key={to} to={to}>{label}</NavLink>', '<NavLink key={to} to={to} aria-current={to.includes("#")?false:undefined}>{label}</NavLink>')
t=t.replace('useState,createContext','useState,useId,createContext')
t=t.replace('const ref=useRef<HTMLDialogElement>(null);','const dialogTitle=useId();const ref=useRef<HTMLDialogElement>(null);')
t=t.replace("wide?'canvas-title':'dialog-title'",'dialogTitle')
p.write_text(t,encoding='utf-8')
