// Referensskärmdumpar av riktiga sajter. Kör: mkdir -p UT; VW=1440 VH=900 node refshot.mjs UT https://a.se https://b.com ...
// Tar 3 skärmdumpar per sajt (topp, +1 vy, +2 vy). Profilen rensas efteråt.
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const OUT = process.argv[2], urls = process.argv.slice(3);
const W = +process.env.VW || 1440, VH = +process.env.VH || 900;
const port = 9844 + Math.floor(Math.random() * 300);
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'ref-prof-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + prof, '--no-first-run', '--hide-scrollbars', 'about:blank'], {stdio: 'ignore'});
const cleanup = () => { try { chrome.kill(); } catch (e) {} try { fs.rmSync(prof, {recursive: true, force: true}); } catch (e) {} };
process.on('exit', cleanup);
const sleep = ms => new Promise(r => setTimeout(r, ms));
let tabs;
for (let i = 0; i < 30; i++) { await sleep(700); try { tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (tabs.find(t => t.type === 'page')) break; } catch (e) {} }
const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result || d.error); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({id: i, method, params})); });
const ev = async e => (await send('Runtime.evaluate', {expression: e, returnByValue: true})).result?.value;
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {width: W, height: VH, deviceScaleFactor: 1, mobile: W < 768});
for (const u of urls) {
  const name = new URL(u).hostname.replace(/^www\./, '').replace(/\W+/g, '-');
  try {
    await send('Page.navigate', {url: u}); await sleep(4500);
    // stäng uppenbara cookie-rutor
    await ev(`[...document.querySelectorAll('button,a')].filter(b=>/^(accept|accepter|godkänn|allow|agree|ok|got it|reject|decline)/i.test((b.innerText||'').trim())).slice(0,1).forEach(b=>b.click())`);
    await sleep(700);
    for (let k = 0; k < 3; k++) {
      await ev(`window.scrollTo(0, ${Math.round(k * VH * 0.95)})`); await sleep(900);
      const s = await send('Page.captureScreenshot', {format: 'jpeg', quality: 70});
      fs.writeFileSync(path.join(OUT, `${name}_${W}_${k}.jpg`), Buffer.from(s.data, 'base64'));
    }
    console.log('ok', name, await ev('document.title.slice(0,70)'));
  } catch (e) { console.log('fel', name, String(e).slice(0, 80)); }
}
process.exit(0);
