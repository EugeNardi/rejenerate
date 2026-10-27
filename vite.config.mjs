import { defineConfig, loadEnv } from 'vite';

export function resolveSiteOrigin(env) {
  const configured = env.VITE_SITE_URL;
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  if (!configured && !vercelHost) return '';
  const url = new URL(configured || `https://${vercelHost}`);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('VITE_SITE_URL debe ser una URL pública http o https, sin credenciales.');
  }
  return url.origin;
}

export default defineConfig(({ mode }) => {
  const origin = resolveSiteOrigin({ ...loadEnv(mode, process.cwd(), ''), ...process.env });
  return {
    plugins: [{
      name: 'site-social-metadata',
      transformIndexHtml(html) {
        return html.replaceAll('__SITE_ORIGIN__', origin);
      },
    }],
  };
});
