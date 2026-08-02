import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Calculadora de Sueño" });
});

const seoData: Record<string, { title: string, desc: string }> = {
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

function injectMeta(html: string, url: string) {
  // Strip trailing slashes, keep default for root
  const cleanUrl = url.replace(/\/$/, '') || '/';
  const meta = seoData[cleanUrl] || seoData['/'];
  
  let modifiedHtml = html;
  
  // Replace Title
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${meta.title}</title>`
  );
  
  // Replace Meta Description
  modifiedHtml = modifiedHtml.replace(
    /<meta name="description" content=".*?"\s*\/>/i,
    `<meta name="description" content="${meta.desc}" />`
  );
  
  // Replace Open Graph Title
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:title" content=".*?"\s*\/>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  
  // Replace Open Graph Description
  modifiedHtml = modifiedHtml.replace(
    /<meta property="og:description" content=".*?"\s*\/>/i,
    `<meta property="og:description" content="${meta.desc}" />`
  );
  
  // Update Canonical
  modifiedHtml = modifiedHtml.replace(
    /<link rel="canonical" href="https:\/\/xn--calculadoradesueo-uxb.org\/.*?"\s*\/>/i,
    `<link rel="canonical" href="https://xn--calculadoradesueo-uxb.org${cleanUrl === '/' ? '/' : cleanUrl}" />`
  );
  
  return modifiedHtml;
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Changed to custom so we can intercept index.html
    });
    
    // Let Vite handle its own static assets and internal requests
    app.use(vite.middlewares);
    
    // We add a middleware to intercept HTML requests and inject SEO data
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        const html = injectMeta(template, req.originalUrl.split('?')[0]);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
    
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files like JS, CSS, images (exclude index.html so we can intercept it)
    app.use(express.static(distPath, { index: false }));
    
    app.get("*", (req, res) => {
      const templatePath = path.join(distPath, "index.html");
      if (fs.existsSync(templatePath)) {
        let template = fs.readFileSync(templatePath, 'utf-8');
        const html = injectMeta(template, req.originalUrl.split('?')[0]);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } else {
        res.status(404).send('Not Found');
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Calculadora de Sueño server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
