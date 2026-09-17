// Foreground static server for `dist/`, used by Playwright's webServer.
//
// `astro preview` daemonizes itself (astro 7.2.3 backgrounds even without --background,
// and --no-background is ignored), so the command exits immediately and Playwright reports
// "Process from config.webServer exited early". This stays in the foreground instead.
// `npm run preview` still uses astro preview for interactive use.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4321);
const host = process.env.HOST || '127.0.0.1';
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml'
};

const resolve = async (pathname) => {
  // normalize() collapses any ../ segments before they escape dist/.
  const candidate = join(root, normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, ''));
  if (!candidate.startsWith(root)) return null;
  for (const file of [candidate, join(candidate, 'index.html'), `${candidate}.html`]) {
    const info = await stat(file).catch(() => null);
    if (info?.isFile()) return file;
  }
  return null;
};

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, `http://${host}:${port}`);
  const file = await resolve(pathname) ?? await resolve('/404.html');
  if (!file) { response.writeHead(404, { 'content-type': 'text/plain' }); return response.end('Not found'); }
  response.writeHead(file.endsWith('404.html') && pathname !== '/404.html' ? 404 : 200, {
    'content-type': types[extname(file)] ?? 'application/octet-stream'
  });
  createReadStream(file).pipe(response);
}).listen(port, host, () => console.log(`● Serving dist/ at http://${host}:${port}`));
