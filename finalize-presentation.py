from pathlib import Path
p=Path('src/site.module.css');t=p.read_text(encoding='utf-8').replace('.desktopNav a[aria-current]', '.desktopNav a[aria-current="page"]');p.write_text(t,encoding='utf-8')
p=Path('src/presentation.module.css');t=p.read_text(encoding='utf-8').replace('.canvasSection,section:global([id])','.canvasSection,:global(#modelo),section:global([id])');p.write_text(t,encoding='utf-8')
p=Path('src/Presentation.tsx');t=p.read_text(encoding='utf-8').replace('loading="eager" fetchPriority="high" decoding="async"','loading="eager" fetchPriority="high" decoding="async" style={{objectFit:"cover",objectPosition:"50% 55%"}}');p.write_text(t,encoding='utf-8')
