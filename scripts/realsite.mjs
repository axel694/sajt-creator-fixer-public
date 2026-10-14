// Riktig Chrome (headless, inga testflaggor), stegvis scroll, skärmdumpar, konsolfel, dolda element.
// Kör:  mkdir -p UT; SITE=/sökväg/till/sajt VW=1440 VH=900 node realsite.mjs UT index [sida ...]
// Utmappen måste finnas. Profilen i tmp rensas alltid efteråt.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const ROOT = process.env.SITE, OUT = process.argv[2];
const W = +process.env.VW || 1440, VH = +process.env.VH || 900;
const MAXSHOTS = +process.env.MAXSHOTS || 14;
const only = process.argv.slice(3);
if (!ROOT || !OUT) { console.error('SITE och utmapp krävs'); process.exit(1); }
const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '404.html' && (!only.length || only.includes(f.replace('.html', '')))).sort();
const port = 9444 + Math.floor(Math.random() * 400);
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'real-prof-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + prof, '--no-first-run', '--hide-scrollbars', 'about:blank'], {stdio: 'ignore'});
const cleanup = () => { try { chrome.kill(); } catch (e) {} try { fs.rmSync(prof, {recursive: true, force: true}); } catch (e) {} };
process.on('exit', cleanup);
process.on('SIGINT', () => process.exit(1));
const sleep = ms => new Promise(r => setTimeout(r, ms));

let tabs;
for (let i = 0; i < 30; i++) { await sleep(700); try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (tabs.find(t => t.type === 'page')) break; } catch (e) {} }
const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); let errs = [];
ws.onmessage = m => {
  const d = JSON.parse(m.data);
  if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result || d.error); pend.delete(d.id); return; }
  if (d.method === 'Runtime.exceptionThrown') errs.push((d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text || '').slice(0, 140));
  if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') errs.push(d.params.entry.text.slice(0, 120) + ' ' + (d.params.entry.url || '').slice(-60));
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({id: i, method, params})); });
const ev = async expr => (await send('Runtime.evaluate', {expression: expr, returnByValue: true, awaitPromise: true})).result?.value;

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
const mobile = W < 768;
await send('Emulation.setDeviceMetricsOverride', {width: W, height: VH, deviceScaleFactor: 1, mobile});
if (mobile) await send('Emulation.setTouchEmulationEnabled', {enabled: true});

for (const f of pages) {
  const name = f.replace('.html', ''); errs = [];
  await send('Page.navigate', {url: pathToFileURL(path.join(ROOT, f)).href});
  await sleep(1800);
  const h = await ev('Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)');
  const step = Math.round(VH * 0.85); let n = 0;
  for (let y = 0; y < h && n < MAXSHOTS; y += step, n++) {
    await ev(`window.scrollTo(0, ${y})`); await sleep(650);
    const shot = await send('Page.captureScreenshot', {format: 'jpeg', quality: 72});
    fs.writeFileSync(path.join(OUT, `${name}_${W}_${String(n).padStart(2, '0')}.jpg`), Buffer.from(shot.data, 'base64'));
  }
  const info = await ev(`(() => { const vis = e => { const r = e.getBoundingClientRect(); return r.height > 8 && r.width > 8; };
    const hidden = [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e); return s.opacity === '0' && vis(e) && s.visibility !== 'hidden'; }).length;
    const overflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src.slice(-50));
    return JSON.stringify({hidden, overflowX, broken, h1: (document.querySelector('h1')||{}).innerText}); })()`);
  console.log(JSON.stringify({page: name, w: W, h, shots: n, errs: [...new Set(errs)].slice(0, 5), ...JSON.parse(info || '{}')}));
}
cleanup();
process.exit(0);
