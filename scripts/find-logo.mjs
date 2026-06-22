import https from 'node:https';
import fs from 'node:fs/promises';
const get = (url) => new Promise((res, rej) => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
    if (r.statusCode >= 300 && r.statusCode < 400) return res(get(r.headers.location));
    const c = []; r.on('data', d => c.push(d)); r.on('end', () => res(Buffer.concat(c)));
  }).on('error', rej);
});
const html = (await get('https://www.aydoganorme.com/')).toString();
const logos = [...html.matchAll(/https:\/\/www\.aydoganorme\.com\/wp-content\/uploads\/[^"' ]+\.(?:png|svg|webp|jpg)/g)].map(m=>m[0]);
console.log([...new Set(logos)].slice(0,20).join('\n'));
