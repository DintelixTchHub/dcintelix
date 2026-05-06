#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const publicDir = path.resolve(process.cwd(), 'public')
const outPath = path.join(publicDir, 'sitemap.xml')

// Edit this list as your site grows. Use absolute URLs below.
const routes = [
  '/',
  '/about',
  '/projects',
  '/contact',
  '/privacy'
]

const today = new Date().toISOString().split('T')[0]

const urlset = routes.map((r) => {
  const loc = `https://www.dcintelix.rw${r}`
  const changefreq = r === '/' || r === '/blogs' ? 'weekly' : 'monthly'
  const priority = r === '/' ? '1.00' : r === '/about' || r === '/projects' ? '0.80' : r === '/blogs' ? '0.70' : '0.64'
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(outPath, xml, 'utf8')
console.log('Sitemap written to', outPath)
