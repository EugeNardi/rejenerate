import json,re,pathlib
root=pathlib.Path(__file__).parent
brief=json.loads((root/'src/data/brief.json').read_text(encoding='utf-8'))
def field(key,label):
    return re.search(r'^- '+re.escape(label)+r': (.+)$',brief[key],re.M).group(1)
def blocks(text):
    return [{'title':m.group(1).rstrip('.'),'text':m.group(2).strip(' ·\n:')} for m in re.finditer(r'\*\*(.+?)\*\*\s*(.*?)(?=\*\*|$)',text,re.S)]
def nested(key):
    return blocks('\n'.join(l.strip()[2:] for l in brief[key].splitlines() if l.startswith('  - **')).replace('(bloque `indigo`)',''))
tables=[]
for match in re.finditer(r'(?:^\|.+\n)+',brief['7.7'],re.M):
    rows=[[c.strip().replace('**','') for c in l.split('|')[1:-1]] for l in match.group().splitlines()]
    tables.append([r for r in rows if not all(re.fullmatch(r'[- :]+',c) for c in r)])
data={
 'idea':field('7.2','Texto'), 'cycle':nested('7.2')[:3], 'purpose':nested('7.2')[3:],
 'marketStats':blocks(field('7.3','Cuatro cifras en tarjetas')), 'marketSource':field('7.3','Nota'), 'lines':blocks(field('7.3','Tres tarjetas')),
 'clients':blocks('\n'.join(l[2:] for l in brief['7.4'].splitlines() if l.startswith('- **'))),
 'findings':blocks(field('7.4','Cuatro hallazgos')),
 'value':field('7.5','Texto'), 'valueStatement':field('7.5','Síntesis destacada (bloque `indigo`, Lora)'), 'businessValue':field('7.5','Para las empresas que entregan material'),
 'canvas':blocks('\n'.join(re.sub(r'^\s+\d+\. ','',l) for l in brief['7.6'].splitlines() if re.match(r'^\s+\d+\. ',l))),
 'costIntro':field('7.7','Bajada'), 'costTables':tables,'costHighlights':blocks(field('7.7','Cuatro tarjetas')),
 'investmentNote':re.search(r'^  Nota: (.+)$',brief['7.7'],re.M).group(1),
 'milestones':blocks(field('7.8','Tres hitos grandes')), 'timeline':nested('7.8'), 'risks':blocks(field('7.8','Riesgos y previsiones, tres tarjetas')),
 'metrics':blocks(field('7.9','Tres tarjetas')), 'measurement':field('7.9','Texto')
}
(root/'src/data/presentation.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
