// Makes the picker thumbnails and the share card, by script, from the site's own pages.
//   node tools/screenshots.mjs   (needs playwright; the container has it)
// Thumbnails: each design's phone first screen (390 x 844, light, scale 1), JPEG at about 70 per cent.
// Share card: our own drawing (1200 x 630) of the title and the three numbers, in the Poster's colours.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const root = new URL('../site/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const srv = createServer((q, r) => { let f = join(root, decodeURI(q.url.split('?')[0])); if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html'); if (!existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': TYPES[f.slice(f.lastIndexOf('.'))] || 'application/octet-stream' }); r.end(readFileSync(f)); });
await new Promise((ok) => srv.listen(0, ok)); const base = `http://127.0.0.1:${srv.address().port}`;
const b = await chromium.launch(); mkdirSync(join(root, 'assets/designs'), { recursive: true });
for (let n = 1; n <= 5; n++) {
  const c = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: 'light' }); const p = await c.newPage();
  await p.goto(`${base}/d${n}/`); await p.screenshot({ path: join(root, `assets/designs/d${n}.jpg`), type: 'jpeg', quality: 70 }); await c.close();
}
const card = `<html><body style="margin:0;width:1200px;height:630px;background:#15171c;color:#f2f2ee;font:700 28px system-ui,Helvetica,Arial,sans-serif;position:relative;overflow:hidden">
<div style="display:flex;height:22px"><i style="flex:1;background:#3fae7a"></i><i style="flex:1;background:#ffd24d"></i><i style="flex:1;background:#4a8df0"></i><i style="flex:1;background:#e8504f"></i></div>
<div style="padding:44px 70px 0"><div style="font-size:24px;letter-spacing:.14em;color:#b9bdc4">GEN ZX FOUNDERS · A BOOK BY DINIS CRUZ</div>
<div style="font-size:92px;line-height:1.02;font-weight:900;margin-top:26px"><span style="color:#3fae7a">One Human,</span><br>Nine Agents,<br><span style="color:#e8504f">Nineteen Hours</span></div></div>
<div style="position:absolute;left:70px;bottom:44px;display:flex;gap:70px;font-size:26px;color:#b9bdc4"><div><b style="font-size:52px;color:#ffd24d">9</b><br>agents</div><div><b style="font-size:52px;color:#ffd24d">18 h 44 min</b><br>first commit to talk</div><div><b style="font-size:52px;color:#ffd24d">814</b><br>commits</div></div></body></html>`;
const c = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 }); const p = await c.newPage();
await p.setContent(card); mkdirSync(join(root, 'assets/share'), { recursive: true });
await p.screenshot({ path: join(root, 'assets/share/card-1200x630.jpg'), type: 'jpeg', quality: 85 });
await b.close(); srv.close(); console.log('screenshots and share card written');
