import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES } from '../src/data/sleepData.ts';
import { CORE_ROUTES, SITE_NAME, SITE_URL } from '../src/config/siteConfig.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const templatePath = path.join(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('index.html no encontrado en dist/');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const escapeHtml = (value = '') =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

function renderInline(value: string) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+|#[^)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (listType) out.push(`</${listType}>`);
    listType = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      out.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      closeList();
      out.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('> ')) {
      closeList();
      out.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      if (listType !== 'ul') {
        closeList();
        listType = 'ul';
        out.push('<ul>');
      }
      out.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ''))}</li>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      if (listType !== 'ol') {
        closeList();
        listType = 'ol';
        out.push('<ol>');
      }
      out.push(`<li>${renderInline(line.replace(/^\d+\.\s+/, ''))}</li>`);
      continue;
    }
    if (line.startsWith('|')) {
      closeList();
      out.push(`<p>${renderInline(line.replaceAll('|', ' · '))}</p>`);
      continue;
    }

    closeList();
    out.push(`<p>${renderInline(line)}</p>`);
  }

  closeList();
  return out.join('\n');
}

function injectHead(html: string, routePath: string, title: string, desc: string, schema: unknown) {
  const fullUrl = `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
  let output = html
    .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/i, `<meta name="description" content="${escapeHtml(desc)}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/i, `<meta property="og:description" content="${escapeHtml(desc)}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/>/i, `<meta name="twitter:description" content="${escapeHtml(desc)}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/i, `<meta property="og:url" content="${fullUrl}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/i, `<link rel="canonical" href="${fullUrl}" />`);

  output = output.replace(
    /<link rel="alternate" hreflang="es" href=".*?"\s*\/>/i,
    `<link rel="alternate" hreflang="es" href="${fullUrl}" />`
  );
  output = output.replace(
    /<link rel="alternate" hreflang="x-default" href=".*?"\s*\/>/i,
    `<link rel="alternate" hreflang="x-default" href="${fullUrl}" />`
  );

  const schemaTag = `<script id="prerender-jsonld" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`;
  return output.replace('</head>', `  ${schemaTag}\n  </head>`);
}

function injectSnapshot(html: string, body: string) {
  const snapshot = `<div id="root"><main data-prerender="true" style="max-width:960px;margin:0 auto;padding:32px 20px;font-family:system-ui,sans-serif;line-height:1.7;color:#e2e8f0;background:#020617"><!-- Static SEO snapshot replaced by React after hydration -->${body}</main></div>`;
  return html.replace('<div id="root"></div>', snapshot);
}

function writeRoute(routePath: string, html: string) {
  if (routePath === '/') {
    fs.writeFileSync(path.join(distPath, 'index.html'), html);
    return;
  }

  const routeName = routePath.replace(/^\//, '');
  fs.writeFileSync(path.join(distPath, `${routeName}.html`), html);
  const routeDir = path.join(distPath, routeName);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
}

for (const route of CORE_ROUTES) {
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const body = `
    <nav aria-label="Breadcrumb"><a href="/">Inicio</a>${route.path !== '/' ? ` / <span>${escapeHtml(route.h1)}</span>` : ''}</nav>
    <article>
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.intro)}</p>
      <p><a href="/">Calculadora de sueño</a> · <a href="/calculadora-horas-de-sueno">Horas por edad</a> · <a href="/siestas">Siestas</a> · <a href="/diario-sueno">Diario de sueño</a> · <a href="/blog">Guías</a></p>
    </article>`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.desc,
    url: canonical,
    inLanguage: 'es',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL }
  };

  writeRoute(route.path, injectSnapshot(injectHead(template, route.path, route.title, route.desc, schema), body));
}

for (const article of ARTICLES) {
  const routePath = `/blog/${article.slug}`;
  const canonical = `${SITE_URL}${routePath}`;
  const body = `
    <nav aria-label="Breadcrumb"><a href="/">Inicio</a> / <a href="/blog">Guías</a> / <span>${escapeHtml(article.title)}</span></nav>
    <article>
      <header>
        <p>${escapeHtml(article.category)} · ${escapeHtml(article.date)} · ${escapeHtml(article.readTime)}</p>
        <h1>${escapeHtml(article.h1)}</h1>
        <p>${escapeHtml(article.summary)}</p>
      </header>
      ${markdownToHtml(article.contentMarkdown)}
      <hr />
      <p>Contenido divulgativo. No sustituye una evaluación, diagnóstico ni tratamiento médico profesional.</p>
      <p><a href="/blog">Ver todas las guías</a> · <a href="/">Usar la calculadora de sueño</a></p>
    </article>`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.h1,
    description: article.metaDescription,
    mainEntityOfPage: canonical,
    inLanguage: 'es',
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/android-chrome-512x512.png` }
    }
  };

  writeRoute(routePath, injectSnapshot(injectHead(template, routePath, article.title, article.metaDescription, schema), body));
}

const notFoundTitle = 'Página no encontrada | Calculadora de Sueño';
const notFoundDesc = 'La página solicitada no existe. Vuelve a la calculadora o explora las guías disponibles.';
const notFoundBody = `
  <article>
    <h1>Página no encontrada</h1>
    <p>La URL solicitada no existe o ha cambiado.</p>
    <p><a href="/">Volver a la calculadora</a> · <a href="/blog">Ver guías</a></p>
  </article>`;
let notFoundHtml = injectSnapshot(
  injectHead(template, '/404', notFoundTitle, notFoundDesc, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: notFoundTitle,
    description: notFoundDesc,
    url: `${SITE_URL}/404`,
    inLanguage: 'es'
  }),
  notFoundBody
);
notFoundHtml = notFoundHtml.replace(
  /<meta name="robots" content=".*?"\s*\/>/i,
  '<meta name="robots" content="noindex, follow" />'
);
fs.writeFileSync(path.join(distPath, '404.html'), notFoundHtml);

const today = new Date().toISOString().slice(0, 10);
const sitemapItems = [
  ...CORE_ROUTES.map((route) => ({
    path: route.path,
    priority: route.priority,
    changefreq: route.changefreq
  })),
  ...ARTICLES.map((article) => ({
    path: `/blog/${article.slug}`,
    priority: 0.8,
    changefreq: 'monthly' as const
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapItems.map((item) => `  <url>
    <loc>${SITE_URL}${item.path === '/' ? '' : item.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority.toFixed(2)}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
console.log(`Prerender completado: ${CORE_ROUTES.length} rutas principales + ${ARTICLES.length} artículos.`);
