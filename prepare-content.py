import json,re,pathlib
root=pathlib.Path(__file__).parent
doc=(root.parent/'materials/regenerate-web/REGENERATE_WEB.md').read_text(encoding='utf-8')
sections={m.group(1):m.group(2) for m in re.finditer(r'^### (\d+\.\d+) [^\n]+\n(.*?)(?=^### |^## |\Z)',doc,re.M|re.S)}
out={}
for key,body in sections.items():
    if not key.startswith(('5.','7.')):continue
    lines=body.splitlines(); clean=[]
    for line in lines:
        if re.match(r'- \*\*(Composición|Implementación|Objetivo|Imagen|Interacción|Pendiente|Accesibilidad|Rendimiento|Contraste|Estados|Nota interna|Implementaci)',line):continue
        clean.append(line)
    out[key]='\n'.join(clean)
(root/'src/data/brief.json').write_text(json.dumps(out,ensure_ascii=False),encoding='utf-8')
