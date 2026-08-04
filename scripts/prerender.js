import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seoData = {
  '/': {
    title: 'Calculadora de Sueño | Ciclos de 90 Minutos para Despertar con Energía',
    desc: 'Calculadora de ciclos de sueño de 90 minutos. Descubre tu hora ideal para despertar con energía, calcula tu descanso y test de cronotipo.'
  },
  '/calculadora-horas-de-sueno': {
    title: 'Calculadora de Horas de Sueño por Edad | xn--calculadoradesueo-uxb.org',
    desc: 'Descubre cuántas horas de sueño necesitas según tu edad exacta (desde bebés hasta adultos mayores). Recomendaciones médicas y científicas.'
  },
  '/app-calculadora-de-sueno': {
    title: 'Mejor App Calculadora de Sueño y Wearables (Reseñas)',
    desc: 'Comparativa de las mejores aplicaciones para medir ciclos de sueño (Sleep Cycle, Runtastic, AutoSleep) y wearables vs calculadoras web.'
  },
  '/siestas': {
    title: 'Calculadora de Siestas (Power Naps) | 20 o 90 minutos',
    desc: 'Calcula tu siesta perfecta de 20 minutos (Power Nap) para recuperar energía sin inercia del sueño, o de 90 minutos para un ciclo completo.'
  },
  '/diario-sueno': {
    title: 'Diario de Sueño TCC-I y Registro de Descanso',
    desc: 'Diario de sueño digital interactivo. Registra tus horas, calcula la eficiencia de tu descanso y detecta insomnio o deuda de sueño.'
  },
  '/blog': {
    title: 'Blog de Higiene del Sueño y Cronobiología',
    desc: 'Artículos científicos sobre la arquitectura del sueño, fases REM, ondas lentas y estrategias contra el insomnio.'
  },
  '/sonidos': {
    title: 'Ruido Blanco y Sonidos para Dormir (Rosa, Marrón)',
    desc: 'Generador de ruido blanco, ruido rosa y frecuencias bajas (ruido marrón) para bloquear distracciones y conciliar el sueño rápidamente.'
  },
  '/sobre-nosotros': {
    title: 'Sobre Nosotros - Equipo Calculadora de Sueño',
    desc: 'Conoce al equipo detrás de la herramienta. Compromiso con la salud circadiana y la divulgación científica rigurosa.'
  },
  '/contacto': {
    title: 'Contacto y Soporte - Calculadora de Sueño España',
    desc: 'Ponte en contacto para consultas, sugerencias de funcionalidades o reportes de usabilidad.'
  },
  '/politica-privacidad': {
    title: 'Política de Privacidad | xn--calculadoradesueo-uxb.org',
    desc: 'Garantía de privacidad. Todos tus datos del diario de sueño y cálculos se guardan 100% de forma local en tu dispositivo.'
  },
  '/terminos-de-uso': {
    title: 'Términos y Condiciones | xn--calculadoradesueo-uxb.org',
    desc: 'Términos de servicio. Información de carácter divulgativo e informativo.'
  }
};

const distPath = path.resolve(__dirname, '../dist');
const templatePath = path.join(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('index.html no encontrado en dist/');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

function injectMeta(html, url, meta) {
  let modifiedHtml = html;
  
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${meta.title}</title>`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta name="description" content=".*?"\s*\/>/i,
    `<meta name="description" content="${meta.desc}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content=".*?"\s*\/>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content=".*?"\s*\/>/i,
    `<meta property="og:description" content="${meta.desc}" />`
  );
  modifiedHtml = modifiedHtml.replace(
    /<link rel="canonical" href="https:\/\/xn--calculadoradesueo-uxb.org(\/.*?)?"\s*\/>/i,
    `<link rel="canonical" href="https://xn--calculadoradesueo-uxb.org${url === '/' ? '/' : url}" />`
  );
  return modifiedHtml;
}

// Generate files for each route
for (const [route, meta] of Object.entries(seoData)) {
  const html = injectMeta(template, route, meta);
  
  if (route === '/') {
    fs.writeFileSync(path.join(distPath, 'index.html'), html);
  } else {
    const routeDir = path.join(distPath, route.slice(1)); // remove leading slash
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  }
}

// Write a sitemap as well
const baseUrl = "https://xn--calculadoradesueo-uxb.org";
const date = new Date().toISOString().split('T')[0];
const sitemapUrls = Object.keys(seoData).map(route => {
  let priority = "0.8";
  let changefreq = "weekly";
  if (route === '/') {
    priority = "1.0";
    changefreq = "daily";
  } else if (['/calculadora-horas-de-sueno', '/siestas', '/app-calculadora-de-sueno', '/blog'].includes(route)) {
    priority = "0.9";
  } else if (route === '/diario-sueno') {
    priority = "0.85";
  } else if (['/politica-privacidad', '/terminos-de-uso'].includes(route)) {
    priority = "0.5";
    changefreq = "monthly";
  } else {
    priority = "0.7";
    changefreq = "monthly";
  }
  
  return `  <url>\n    <loc>${baseUrl}${route === '/' ? '' : route}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>`;
fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);

console.log('Prerender y Sitemap completados exitosamente.');
