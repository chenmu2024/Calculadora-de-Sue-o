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
  | 'methodology'
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
  directAnswer?: string;
  keyFacts?: string[];
  sourceLinks?: Array<{ label: string; href: string }>;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
}

const NHLBI_STAGES = 'https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno';
const AASM_ADULT = 'https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf';
const AASM_CHILD = 'https://aasm.org/advocacy/position-statements/child-sleep-duration-health-advisory/';

export const CORE_ROUTES: SiteRouteConfig[] = [
  {
    tab: 'home',
    path: '/',
    title: 'Calculadora de Sueño | Ciclos y Hora Ideal para Dormir',
    desc: 'Calculadora de sueño para estimar horarios de descanso con ciclos aproximados, latencia de sueño, cronotipo, cafeína y otras herramientas gratuitas.',
    h1: 'Calculadora de Sueño',
    intro: 'Estima a qué hora acostarte o despertarte según una duración de ciclo configurable y tu latencia para conciliar el sueño. Los resultados son orientativos y no sustituyen una medición clínica del sueño.',
    directAnswer: 'Una calculadora de sueño puede ayudarte a planificar horarios, pero no puede saber en qué fase real estarás al sonar la alarma. Esta herramienta usa 90 minutos como valor inicial configurable porque los ciclos suelen reiniciarse aproximadamente cada 80 a 100 minutos; para adultos, prioriza dormir al menos 7 horas de forma regular.',
    keyFacts: [
      'El valor de 90 minutos es una aproximación configurable, no una duración exacta universal.',
      'La herramienta calcula horarios; no mide EEG, REM, NREM ni diagnostica trastornos del sueño.',
      'La duración total suficiente y la regularidad importan más que acertar un final de ciclo teórico.'
    ],
    sourceLinks: [
      { label: 'NHLBI: fases del sueño', href: NHLBI_STAGES },
      { label: 'AASM: duración en adultos', href: AASM_ADULT }
    ],
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
    directAnswer: 'Las necesidades de sueño cambian con la edad. La AASM recomienda, por ejemplo, 12–16 horas en 4–12 meses, 11–14 horas en 1–2 años, 10–13 horas en 3–5 años, 9–12 horas en 6–12 años y 8–10 horas en adolescentes; para adultos, la referencia general es 7 o más horas por noche.',
    keyFacts: [
      'En bebés y niños pequeños, los rangos incluyen siestas.',
      'Los rangos son referencias poblacionales, no prescripciones individuales.',
      'Somnolencia intensa, ronquidos con pausas o problemas persistentes requieren valoración profesional.'
    ],
    sourceLinks: [
      { label: 'AASM: niños y adolescentes', href: AASM_CHILD },
      { label: 'AASM: adultos', href: AASM_ADULT }
    ],
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    tab: 'nap',
    path: '/siestas',
    title: 'Calculadora de Siestas y Power Naps | Horarios Orientativos',
    desc: 'Calcula una hora orientativa para una siesta corta o una ventana de descanso más larga según tu horario y tu objetivo.',
    h1: 'Calculadora de Siestas',
    intro: 'Planifica una siesta corta o una ventana de descanso más larga según tu horario. La respuesta individual depende de la presión de sueño, el momento del día y otros factores.',
    directAnswer: 'Una siesta puede planificarse por duración y horario, pero no existe una duración perfecta para todas las personas. Una siesta tardía o demasiado larga puede dificultar el sueño nocturno, por lo que conviene observar cómo responde tu propio descanso.',
    keyFacts: [
      'La herramienta ofrece ventanas de planificación; no detecta fases reales del sueño.',
      'Si una siesta empeora tu sueño nocturno, reduce su duración o adelanta el horario.',
      'La necesidad de siesta cambia con la edad, la deuda de sueño y el horario de cada persona.'
    ],
    sourceLinks: [
      { label: 'NHLBI: ciclo sueño-vigilia', href: 'https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle' }
    ],
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
    directAnswer: 'Un diario de sueño sirve para registrar hora de acostarse, despertares, hora de levantarse y percepción del descanso. Es útil para detectar patrones y preparar una consulta, pero los datos autodeclarados no sustituyen una evaluación clínica.',
    keyFacts: [
      'Los registros se usan para observar tendencias, no para diagnosticar insomnio u otros trastornos.',
      'La eficiencia del sueño es una relación matemática entre tiempo dormido y tiempo en cama.',
      'Interpretar cambios persistentes o graves corresponde a un profesional sanitario.'
    ],
    sourceLinks: [
      { label: 'NHLBI: diario de sueño y ciclo sueño-vigilia', href: 'https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle' }
    ],
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
    directAnswer: 'Una calculadora web planifica horarios a partir de supuestos; una app o wearable puede añadir movimiento, sonido o señales fisiológicas, pero tampoco equivale a una polisomnografía. La mejor opción depende de si quieres planificar, registrar hábitos o medir señales.',
    keyFacts: [
      'Calculadora web: útil para planificación, sin medir fases.',
      'Apps y wearables: pueden estimar patrones con sensores, con precisión variable.',
      'Polisomnografía: referencia clínica para medir y clasificar el sueño cuando está indicada.'
    ],
    sourceLinks: [
      { label: 'NHLBI: cómo se clasifican las fases', href: NHLBI_STAGES }
    ],
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
    directAnswer: 'Las guías explican qué puede calcular el sitio, qué solo puede estimarse y qué requiere medición clínica. Cada artículo debe distinguir claramente entre hechos respaldados por fuentes, ejemplos de cálculo y recomendaciones prácticas no diagnósticas.',
    keyFacts: [
      'Las fuentes primarias se enlazan cuando sustentan una afirmación factual importante.',
      'Los artículos no sustituyen consejo médico individual.',
      'Las fechas se actualizan solo cuando cambia sustancialmente el contenido.'
    ],
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
    directAnswer: 'El ruido blanco, rosa o marrón puede servir como sonido de fondo para enmascarar cambios ambientales, pero el efecto sobre el sueño varía entre personas. Usa un volumen cómodo y detén la reproducción si resulta molesta.',
    keyFacts: [
      'El reproductor no induce una fase concreta del sueño.',
      'No uses auriculares a volumen alto durante periodos prolongados.',
      'Si el ruido empeora el descanso, no hay beneficio en mantenerlo.'
    ],
    changefreq: 'monthly',
    priority: 0.75
  },
  {
    tab: 'about',
    path: '/sobre-nosotros',
    title: 'Sobre Nosotros | Calculadora de Sueño',
    desc: 'Conoce el propósito, la identidad y los límites de las herramientas de Calculadora de Sueño.',
    h1: 'Sobre Calculadora de Sueño',
    intro: 'Proyecto independiente de herramientas y divulgación sobre descanso. Priorizamos transparencia, fuentes verificables, privacidad y lenguaje no diagnóstico.',
    directAnswer: 'Calculadora de Sueño es un proyecto web independiente en español. Su propósito es ayudar a planificar horarios y comprender conceptos básicos del descanso mediante herramientas transparentes, no ofrecer diagnóstico médico.',
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    tab: 'methodology',
    path: '/metodologia',
    title: 'Metodología, Fuentes y Política Editorial | Calculadora de Sueño',
    desc: 'Cómo funcionan los cálculos, qué fuentes usamos, cómo corregimos errores y cuáles son los límites editoriales y médicos del sitio.',
    h1: 'Metodología, Fuentes y Política Editorial',
    intro: 'Explicamos de forma pública cómo se calculan los horarios, qué supuestos usa cada herramienta, cómo seleccionamos fuentes y cómo gestionamos correcciones.',
    directAnswer: 'Los cálculos del sitio son modelos de planificación basados en entradas del usuario y supuestos explícitos; no miden fisiología real. Las afirmaciones médicas o de salud se revisan contra fuentes primarias o consensos reconocidos y se corrigen cuando la evidencia cambia.',
    keyFacts: [
      '90 minutos es un valor inicial configurable; NHLBI describe ciclos de aproximadamente 80–100 minutos.',
      'No publicamos credenciales médicas, estadísticas, reseñas o resultados que no podamos verificar.',
      'El contenido puede usar automatización como apoyo editorial, pero las afirmaciones sensibles deben quedar respaldadas por fuentes visibles.'
    ],
    sourceLinks: [
      { label: 'NHLBI: fases del sueño', href: NHLBI_STAGES },
      { label: 'AASM: adultos', href: AASM_ADULT },
      { label: 'AASM: pediatría', href: AASM_CHILD }
    ],
    changefreq: 'monthly',
    priority: 0.55
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
