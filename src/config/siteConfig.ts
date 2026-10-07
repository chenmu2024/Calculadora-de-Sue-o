export const SITE_URL = 'https://xn--calculadoradesueo-uxb.org';
export const SITE_NAME = 'Calculadora de Sueño';

export type SiteTab =
  | 'home'
  | 'age-calculator'
  | 'nap'
  | 'diary'
  | 'app-reviews'
  | 'blog'
  | 'sounds'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface SiteRouteConfig {
  tab: SiteTab;
  path: string;
  title: string;
  desc: string;
  h1: string;
  intro: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

export const CORE_ROUTES: SiteRouteConfig[] = [
  {
    tab: 'home',
    path: '/',
    title: 'Calculadora de Sueño | Ciclos y Hora Ideal para Dormir',
    desc: 'Calculadora de sueño para estimar horarios de descanso con ciclos aproximados, latencia de sueño, cronotipo, cafeína y otras herramientas gratuitas.',
    h1: 'Calculadora de Sueño',
    intro: 'Estima a qué hora acostarte o despertarte según una duración de ciclo configurable y tu latencia para conciliar el sueño. Los resultados son orientativos y no sustituyen una medición clínica del sueño.',
    changefreq: 'weekly',
    priority: 1
  },
  {
    tab: 'age-calculator',
    path: '/calculadora-horas-de-sueno',
    title: 'Horas de Sueño por Edad - Calculadora y Tabla Recomendada',
    desc: 'Consulta cuántas horas de sueño se recomiendan según la edad, desde bebés hasta adultos mayores, con una calculadora y referencias de organizaciones del sueño.',
    h1: 'Calculadora de Horas de Sueño por Edad',
    intro: 'Compara tu descanso habitual con los rangos orientativos publicados por organizaciones especializadas. Las necesidades individuales pueden variar.',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    tab: 'nap',
    path: '/siestas',
    title: 'Calculadora de Siestas y Power Naps | 20 o 90 Minutos',
    desc: 'Calcula una hora orientativa para una siesta corta o una siesta más larga y reduce el riesgo de despertar con somnolencia.',
    h1: 'Calculadora de Siestas',
    intro: 'Planifica una siesta corta o una ventana de descanso más larga según tu horario. La respuesta individual depende de la presión de sueño, el momento del día y otros factores.',
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    tab: 'diary',
    path: '/diario-sueno',
    title: 'Diario de Sueño | Registro y Eficiencia del Descanso',
    desc: 'Registra horarios y hábitos de sueño, calcula la eficiencia del descanso y prepara un resumen que puedes comentar con un profesional sanitario.',
    h1: 'Diario de Sueño',
    intro: 'Registra tus horarios y observa tendencias de descanso directamente en tu dispositivo. La herramienta es informativa y no realiza diagnósticos.',
    changefreq: 'monthly',
    priority: 0.85
  },
  {
    tab: 'app-reviews',
    path: '/app-calculadora-de-sueno',
    title: 'Apps de Sueño: Comparativa de Calculadoras y Wearables',
    desc: 'Comparativa de apps, calculadoras web y wearables para planificar o registrar el sueño, con ventajas, limitaciones y criterios de privacidad.',
    h1: 'Comparativa de Apps y Calculadoras de Sueño',
    intro: 'Compara distintos tipos de herramientas para el sueño y entiende qué puede estimar cada una y qué requiere medición clínica.',
    changefreq: 'monthly',
    priority: 0.85
  },
  {
    tab: 'blog',
    path: '/blog',
    title: 'Guías sobre Sueño, Ciclos, Hábitos y Cronobiología',
    desc: 'Guías divulgativas sobre ciclos de sueño, duración del descanso, cafeína, siestas, hábitos y cronobiología con fuentes enlazadas.',
    h1: 'Guías sobre Sueño y Cronobiología',
    intro: 'Artículos divulgativos para entender mejor el descanso y usar las herramientas del sitio con expectativas realistas.',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    tab: 'sounds',
    path: '/sonidos',
    title: 'Ruido Blanco, Rosa y Marrón para Dormir',
    desc: 'Generador de ruido blanco, rosa y marrón para crear un entorno sonoro constante durante el descanso.',
    h1: 'Sonidos para Dormir',
    intro: 'Reproduce sonidos continuos desde el navegador. Ajusta el volumen a un nivel cómodo y evita exposiciones intensas durante periodos prolongados.',
    changefreq: 'monthly',
    priority: 0.75
  },
  {
    tab: 'about',
    path: '/sobre-nosotros',
    title: 'Sobre Nosotros | Calculadora de Sueño',
    desc: 'Conoce el propósito, la metodología editorial y los límites de las herramientas de Calculadora de Sueño.',
    h1: 'Sobre Calculadora de Sueño',
    intro: 'Proyecto independiente de herramientas y divulgación sobre descanso. Priorizamos transparencia, fuentes verificables, privacidad y lenguaje no diagnóstico.',
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    tab: 'contact',
    path: '/contacto',
    title: 'Contacto | Calculadora de Sueño',
    desc: 'Contacto para informar errores, proponer mejoras o realizar consultas sobre el funcionamiento del sitio.',
    h1: 'Contacto',
    intro: 'Puedes contactar para reportar problemas técnicos, sugerir mejoras o señalar fuentes que debamos revisar.',
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    tab: 'privacy',
    path: '/politica-privacidad',
    title: 'Política de Privacidad | Calculadora de Sueño',
    desc: 'Información sobre almacenamiento local, cookies, privacidad y tratamiento de datos en Calculadora de Sueño.',
    h1: 'Política de Privacidad',
    intro: 'Consulta qué información se guarda localmente y cómo funcionan las preferencias de privacidad del sitio.',
    changefreq: 'monthly',
    priority: 0.4
  },
  {
    tab: 'terms',
    path: '/terminos-de-uso',
    title: 'Términos de Uso | Calculadora de Sueño',
    desc: 'Términos de uso y límites de responsabilidad de las herramientas y contenidos informativos del sitio.',
    h1: 'Términos de Uso',
    intro: 'Las herramientas ofrecen estimaciones informativas y no sustituyen diagnóstico, tratamiento ni consejo médico profesional.',
    changefreq: 'monthly',
    priority: 0.4
  }
];

export const SEO_BY_TAB = Object.fromEntries(
  CORE_ROUTES.map((route) => [route.tab, route])
) as Record<SiteTab, SiteRouteConfig>;

export const SEO_BY_PATH = Object.fromEntries(
  CORE_ROUTES.map((route) => [route.path, route])
) as Record<string, SiteRouteConfig>;
