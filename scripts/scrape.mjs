// Scrape product data from aydoganorme.com (catalog only).
// Outputs scripts/products.json and downloads images to public/images/products/
import fs from 'node:fs/promises';
import path from 'node:path';
import https from 'node:https';

const BASE = 'https://www.aydoganorme.com';
const CATS = [
  { slug: 'bayan-pijama',  name: 'Bayan Pijama' },
  { slug: 'erkek-pijama',  name: 'Erkek Pijama' },
  { slug: 'cocuk',         name: 'Çocuk' },
  { slug: 'ic-giyim',      name: 'İç Giyim' },
  { slug: 'hamile-lohusa', name: 'Hamile Lohusa' },
  { slug: 'buyuk-beden',   name: 'Büyük Beden' },
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

function getText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(getText(new URL(res.headers.location, url).toString()));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, async (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(new URL(res.headers.location, url).toString(), dest));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('HTTP ' + res.statusCode + ' ' + url));
      }
      await fs.mkdir(path.dirname(dest), { recursive: true });
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        await fs.writeFile(dest, Buffer.concat(chunks));
        resolve();
      });
    }).on('error', reject);
  });
}

// Parse product cards out of WooCommerce category HTML.
function parseProducts(html, max = 16) {
  const items = [];
  const liRe = /<li[^>]*class="[^"]*product[^"]*"[\s\S]*?<\/li>/g;
  const matches = html.match(liRe) || [];
  for (const li of matches) {
    if (items.length >= max) break;
    const hrefMatch = li.match(/href="([^"]*\/urun\/[^"]+)"/);
    if (!hrefMatch) continue;
    const url = hrefMatch[1];
    const slug = url.replace(/.*\/urun\//, '').replace(/\/$/, '');
    if (items.find((x) => x.slug === slug)) continue;
    const titleMatch = li.match(/<h2[^>]*>\s*(?:<a[^>]*>)?([^<]+)/);
    const altMatch = li.match(/<img[^>]*\salt="([^"]+)"/);
    const title = (titleMatch ? titleMatch[1] : altMatch ? altMatch[1] : '').trim();
    // image: prefer data-src, data-lazy-src, then srcset largest
    let image = '';
    const dataSrc = li.match(/data-src="([^"]+\.(?:jpg|jpeg|png|webp))"/i);
    const lazySrc = li.match(/data-lazy-src="([^"]+\.(?:jpg|jpeg|png|webp))"/i);
    const srcSet = li.match(/(?:data-srcset|srcset)="([^"]+)"/);
    const plainSrc = li.match(/<img[^>]*\ssrc="([^"]+\.(?:jpg|jpeg|png|webp))"/i);
    if (dataSrc) image = dataSrc[1];
    else if (lazySrc) image = lazySrc[1];
    else if (srcSet) {
      const candidates = srcSet[1].split(',').map((s) => s.trim().split(' ')[0]).filter(Boolean);
      image = candidates[candidates.length - 1] || '';
    } else if (plainSrc) image = plainSrc[1];
    if (!image || image.startsWith('data:')) continue;
    items.push({ slug, title, image, url });
  }
  return items;
}

const root = path.resolve(process.cwd());
const imgDir = path.join(root, 'public', 'images', 'products');

const out = { categories: [], productsBySlug: {} };

for (const cat of CATS) {
  process.stdout.write(`scraping ${cat.slug}... `);
  const html = await getText(`${BASE}/kategoriler/${cat.slug}/`);
  const items = parseProducts(html, 16);
  console.log(items.length + ' products');
  out.categories.push({ slug: cat.slug, name: cat.name, count: items.length });
  for (const it of items) {
    const ext = path.extname(new URL(it.image).pathname) || '.jpg';
    const localName = `${it.slug}${ext}`;
    const dest = path.join(imgDir, localName);
    try {
      await download(it.image, dest);
      out.productsBySlug[it.slug] = {
        slug: it.slug,
        title: it.title,
        image: `/images/products/${localName}`,
        category: cat.slug,
        categoryName: cat.name,
      };
    } catch (e) {
      console.warn('  fail', it.slug, e.message);
    }
  }
}

await fs.mkdir(path.join(root, 'src', 'data'), { recursive: true });
await fs.writeFile(
  path.join(root, 'src', 'data', 'products.json'),
  JSON.stringify(out, null, 2),
  'utf8',
);
console.log('Wrote src/data/products.json with', Object.keys(out.productsBySlug).length, 'products');
