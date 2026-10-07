import { AgeGroupConfig, AppReview, ProductRecommendation, Article, FAQItem } from '../types';

export const AGE_GROUPS: AgeGroupConfig[] = [
  {
    id: 'baby',
    name: 'Bebés (4-12 meses)',
    ageRange: '4 a 12 meses',
    recHoursMin: 12,
    recHoursMax: 16,
    recCyclesMin: 8,
    recCyclesMax: 10,
    description: 'Los bebés necesitan ciclos de sueño más frecuentes para el desarrollo cerebral acelerado y consolidación de memoria.',
    tips: ['Mantener la habitación a 20°C', 'Establecer rutinas de siesta regulares', 'Usar ruido blanco suave']
  },
  {
    id: 'toddler',
    name: 'Niños pequeños (1-2 años)',
    ageRange: '1 a 2 años',
    recHoursMin: 11,
    recHoursMax: 14,
    recCyclesMin: 7,
    recCyclesMax: 9,
    description: 'En esta etapa el sueño total incluye el descanso nocturno y las siestas. Mantener rutinas regulares ayuda a consolidar hábitos de sueño.',
    tips: ['Mantener una rutina tranquila antes de dormir', 'Reducir estímulos intensos al final del día', 'Consultar al pediatra si hay problemas persistentes de sueño']
  },
  {
    id: 'preschool',
    name: 'Preescolares (3-5 años)',
    ageRange: '3 a 5 años',
    recHoursMin: 10,
    recHoursMax: 13,
    recCyclesMin: 6,
    recCyclesMax: 8,
    description: 'Las necesidades de sueño siguen siendo altas y pueden incluir siesta según el niño. La regularidad de horarios suele ser más útil que perseguir un número exacto de ciclos.',
    tips: ['Mantener horarios consistentes', 'Crear una rutina relajante antes de dormir', 'Evitar pantallas justo antes de acostarse']
  },
  {
    id: 'child',
    name: 'Escolares (6-12 años)',
    ageRange: '6 a 12 años',
    recHoursMin: 9,
    recHoursMax: 12,
    recCyclesMin: 6,
    recCyclesMax: 8,
    description: 'Fundamental para el rendimiento escolar, la concentración y la regulación emocional.',
    tips: ['Horario fijo de acostarse incluso fines de semana', 'Habitación sin televisión ni tablets']
  },
  {
    id: 'teen',
    name: 'Adolescentes (13-17 años)',
    ageRange: '13 a 17 años',
    recHoursMin: 8,
    recHoursMax: 10,
    recCyclesMin: 5,
    recCyclesMax: 7,
    description: 'Sufren un retraso natural de la fase del sueño debido a cambios hormonales en el pico de melatonina nocturna.',
    tips: ['Filtro de luz azul en móviles por la noche', 'Exposición al sol matutino para regular ritmo circadiano']
  },
  {
    id: 'adult',
    name: 'Adultos (18-64 años)',
    ageRange: '18 a 64 años',
    recHoursMin: 7,
    recHoursMax: 9,
    recCyclesMin: 5,
    recCyclesMax: 6,
    description: 'Para adultos, la referencia general es dormir al menos 7 horas de forma regular. La duración exacta que necesita cada persona puede variar.',
    tips: ['Mantener una habitación cómoda y oscura', 'Evitar cafeína cerca de la hora de dormir si afecta al descanso', 'Mantener una hora de despertar relativamente consistente']
  },
  {
    id: 'senior',
    name: 'Adultos Mayores (65+ años)',
    ageRange: '65 años en adelante',
    recHoursMin: 7,
    recHoursMax: 8,
    recCyclesMin: 4.5,
    recCyclesMax: 5.5,
    description: 'El patrón de sueño se fragmenta de forma natural, pero la necesidad metabólica de descanso reparación sigue siendo de 7-8 horas.',
    tips: ['Si las siestas dificultan el sueño nocturno, revisar su duración y horario', 'Mantener actividad física adecuada a la condición de cada persona']
  }
];

export const APP_REVIEWS: AppReview[] = [
  {
    id: 'sleep-cycle',
    name: 'Sleep Cycle: Alarma Inteligente',
    score: 4.8,
    badge: 'La más popular 2026',
    price: 'Gratis con versión Premium opcional',
    platforms: ['iOS', 'Android'],
    description: 'Analiza tus patrones de sueño utilizando el micrófono y acelerómetro para despertarte suavemente durante tu fase de sueño ligero.',
    pros: ['Despertador con ventana de fase ligera (30 min)', 'Análisis de ronquidos y sonidos nocturnos', 'Estadísticas detalladas de calidad de descanso'],
    cons: ['Requiere dejar el teléfono cerca de la cama', 'La suscripción anual es de pago'],
    bestFor: 'Personas que sufren inercia del sueño al despertar con alarmas tradicionales.'
  },
  {
    id: 'adidas-runtastic',
    name: 'Calculadora de Sueño Adidas / Runtastic Sleep Better',
    score: 4.2,
    badge: 'Referencia Histórica',
    price: 'Descontinuada / Integrada en ecosistema Adidas',
    platforms: ['Web', 'iOS', 'Android'],
    hasAdidasRuntasticRelation: true,
    description: 'Históricamente desarrollada como Runtastic Sleep Better y adoptada por Adidas Runtastic. Pionera en calcular ciclos de sueño vinculados a actividades deportivas.',
    pros: ['Impacto de ejercicio e ingesta de cafeína en el sueño', 'Fases de la luna e historial de estados de ánimo', 'Cálculo de eficiencia de ciclos'],
    cons: ['Ya no recibe actualizaciones independientes', 'La app actual de Adidas se centra más en running'],
    bestFor: 'Deportistas interesados en cómo el entrenamiento diario impacta la recuperación nocturna.'
  },
  {
    id: 'pillow',
    name: 'Pillow Automatic Sleep Tracker',
    score: 4.7,
    badge: 'Mejor integración Apple Watch',
    price: 'Freemium',
    platforms: ['iOS', 'watchOS'],
    description: 'Monitorización avanzada de ciclos de sueño con diagrama en espiral de las fases REM, Ligero y Profundo.',
    pros: ['Detección automática sin presionar un botón', 'Grabación de audio de apnea o conversación en sueños', 'Integración nativa con Apple Health'],
    cons: ['Solo disponible en el ecosistema Apple'],
    bestFor: 'Usuarios de iPhone y Apple Watch.'
  },
  {
    id: 'calm',
    name: 'Calm & Sleep Stories',
    score: 4.6,
    badge: 'Mejor para Conciliar Sueño',
    price: 'Prueba gratis / Premium',
    platforms: ['iOS', 'Android', 'Web'],
    description: 'No calcula ciclos en sí, pero ofrece historias nocturnas narradas por celebridades y meditación guiada para entrar en Fase N1 rápidamente.',
    pros: ['Enormes paisajes sonoros (Lluvia, Bosque, Ruido Rosa)', 'Cuentos para dormir en español', 'Ejercicios de respiración parasimpática'],
    cons: ['No tiene función de alarma según ciclo de sueño'],
    bestFor: 'Personas con insomnio por ansiedad o mente acelerada por la noche.'
  }
];

export const PRODUCT_RECOMMENDATIONS: ProductRecommendation[] = [
  {
    id: 'prod-1',
    name: 'Almohada Cervical Ergonómica de Memoria Viscoelástica',
    category: 'almohadas',
    price: '34,99 €',
    rating: 4.9,
    reviewsCount: 1420,
    description: 'Diseñada con contorno mariposa ortopédico para alinear perfectamente la columna cervical y reducir microdespertares por dolor de cuello.',
    badge: 'Top Ventas 2026',
    pros: ['Soporte para durmientes de lado y boca arriba', 'Funda de fibra de bambú transpirable e hipoalergénica', 'Garantía de 100 noches de prueba']
  },
  {
    id: 'prod-2',
    name: 'Suplemento Melatonina 1.9mg + Pasiflora y Magnesio',
    category: 'suplementos',
    price: '18,50 €',
    rating: 4.8,
    reviewsCount: 980,
    description: 'Fórmula de liberación prolongada que reduce el tiempo necesario para conciliar el sueño (disminuye la latencia) y previene despertares nocturnos.',
    badge: 'Recomendación Farmacéutica',
    pros: ['Efecto en 15-20 minutos', 'Sin dependencia ni somnolencia matutina', 'Apta para vegetarianos']
  },
  {
    id: 'prod-3',
    name: 'Antifaz de Sueño 3D Ergonómico 100% Opaco',
    category: 'antifaces',
    price: '14,99 €',
    rating: 4.9,
    reviewsCount: 2150,
    description: 'Cavidad ocular moldeada en 3D que no ejerce presión en las pestañas ni ojos. Bloqueo total de luz para estimular el pico natural de melatonina.',
    badge: 'Imprescindible para Viajes',
    pros: ['Cero presión ocular', 'Correa regulable ultrasuave', 'Ideal para trabajo en turnos y siestas diurnas']
  },
  {
    id: 'prod-4',
    name: 'Máquina de Ruido Blanco y Sonidos Naturales HiFi',
    category: 'ruido_blanco',
    price: '39,90 €',
    rating: 4.7,
    reviewsCount: 810,
    description: '28 sonidos relajantes no repetitivos (ruido blanco, rosa, marrón, lluvia, olas del mar) con temporizador de apagado de 30/60/90 minutos.',
    badge: 'Ideal para Bebés y Adultos',
    pros: ['Enmascara ruidos molestos de la calle o vecinos', 'Diseño compacto con batería recargable', 'Luz nocturna cálida atenuable']
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: '¿Cómo funciona una calculadora de sueño?',
    answer: 'Nuestra calculadora de sueño se basa en la neurofisiología humana: el sueño normal se divide en ciclos de aproximadamente 90 minutos (fases NREM 1, 2, 3 y REM). La calculadora toma la hora a la que deseas despertar o dormir, añade 15 minutos promedio de latencia (tiempo para quedarse dormido), y resta o suma bloques de 90 minutos para sugerirte horas en las que despertarás en la fase de sueño ligero sin cansancio.',
    keywordMatched: 'calculadora de sueño',
    category: 'Algoritmo y Calculadora',
    actionLink: {
      label: 'Ir a la Calculadora Principal',
      targetId: 'calculadora-principal'
    }
  },
  {
    question: '¿Cuántos ciclos de sueño se recomiendan al día?',
    answer: 'Para un adulto sano se recomiendan entre 5 y 6 ciclos completos de sueño al día (lo que equivale a 7.5 o 9 horas totales). Dormir 4 ciclos (6 horas) puede ser suficiente ocasionalmente, pero acumular menos de 5 ciclos de forma continuada genera deuda de sueño acumulativa.',
    keywordMatched: 'calculadora de ciclos de sueño',
    category: 'Salud y Fisiología',
    actionLink: {
      label: 'Calcular Deuda de Sueño',
      targetId: 'deuda-sueno'
    }
  },
  {
    question: '¿Por qué me despierto cansado aunque duerma 8 horas?',
    answer: 'El agotamiento al despertar ocurre a menudo por la "inercia del sueño": romper un ciclo de sueño en mitad de la Fase N3 (sueño profundo de ondas lentas). Si tu alarma suena en ese momento, tu cerebro tarda hasta 30-60 minutos en reactivarse. Al usar nuestra calculadora de ciclos de sueño, coordinas tu alarma con el final de una fase REM o N1 ligera.',
    keywordMatched: 'ciclo de sueño calculadora',
    category: 'Salud y Fisiología',
    actionLink: {
      label: 'Ver Visualizador de Ciclos',
      targetId: 'visualizador-ciclos'
    }
  },
  {
    question: '¿A qué hora debo dejar de tomar café para no afectar mi sueño?',
    answer: 'La cafeína tiene una vida media metabólica de 5 a 8 horas. Para que tu cerebro elimine la cafeína residual por debajo del umbral de interrupción de melatonina (25 mg), debes tomar tu último café al menos 8 horas antes de acostarte. Puedes usar nuestra Calculadora de Cafeína para ver tu gráfico de eliminación exacto.',
    keywordMatched: 'calculadora de cafeina',
    category: 'Hábitos y Estilo de Vida',
    actionLink: {
      label: 'Probar Calculadora de Cafeína',
      targetId: 'calculadora-cafeina'
    }
  },
  {
    question: '¿Qué es el Test de Cronotipo (León, Oso, Lobo, Delfín) y para qué sirve?',
    answer: 'El cronotipo es la predisposición genética natural de tu reloj biológico circadiano. Determina a qué hora tus picos de melatonina y cortisol suceden. Conocer si eres León (madrugador), Oso (sincronizado con el sol), Lobo (nocturno) o Delfín (sueño ligero) te ayuda a programar tus horas ideales de descanso y trabajo.',
    keywordMatched: 'test de cronotipo',
    category: 'Salud y Fisiología',
    actionLink: {
      label: 'Hacer Test de Cronotipo (2 min)',
      targetId: 'test-cronotipo'
    }
  },
  {
    question: '¿Cómo calcular mi ciclo de sueño si tardo mucho en dormirme?',
    answer: 'Si por lo general tardas más de 15 minutos en conciliar el sueño (latencia alargada), puedes ajustar la latencia en minutos dentro de la calculadora para que el cálculo de las horas finales se adapte exactamente a tu ritmo personal.',
    keywordMatched: 'como calcular mi ciclo de sueño',
    category: 'Algoritmo y Calculadora'
  },
  {
    question: '¿Qué diferencia hay entre la calculadora de sueño Adidas / Runtastic y esta web?',
    answer: 'Runtastic Sleep Better de Adidas fue una aplicación móvil centrada en vincular el entrenamiento deportivo con el sueño. Nuestra herramienta en xn--calculadoradesueo-uxb.org es una plataforma web 100% gratuita, accesible desde cualquier dispositivo sin descargas ni registros, con algoritmos actualizados de cronobiología y sin consumo de batería.',
    keywordMatched: 'calculadora de sueño adidas',
    category: 'Apps y Comparativas',
    actionLink: {
      label: 'Ver Análisis de Apps',
      targetId: 'app-calculadora-de-sueno'
    }
  },
  {
    question: '¿Cómo ayudan los sonidos sintetizados (ruido blanco, marrón, rosa) a conciliar el sueño?',
    answer: 'Los sonidos enmascaran ruidos ambientales repentinos y promueven la actividad de ondas cerebrales Alfa y Theta. El ruido marrón es ideal para acallar pensamientos rumiantes, mientras que las ondas binaurales Delta (2.5 Hz) inducen relajación profunda cuando se usan auriculares estéreo.',
    keywordMatched: 'ruido blanco sueño',
    category: 'Hábitos y Estilo de Vida',
    actionLink: {
      label: 'Abrir Reproductor de Sonidos',
      targetId: 'reproductor-sonidos'
    }
  },
  {
    question: '¿Cómo calcular las horas de sueño recomendadas para niños y adolescentes?',
    answer: 'En nuestra sección especializada "Calculador de horas de sueño por edad", puedes seleccionar el rango exacto. Por ejemplo, los escolares necesitan de 9 a 12 horas (6 a 8 ciclos) y los adolescentes entre 8 y 10 horas debido al desarrollo metabólico y remodelación de circuitos prefrontales.',
    keywordMatched: 'como calcular las horas de sueño',
    category: 'Salud y Fisiología',
    actionLink: {
      label: 'Ver Calculadora por Edad',
      targetId: 'age-calculator'
    }
  },
  {
    question: '¿Es útil llevar un Diario de Sueño para calcular la Eficiencia TCC-I?',
    answer: 'Sí. La Terapia Cognitivo-Conductual para el Insomnio (TCC-I) utiliza el Diario de Sueño para calcular la Eficiencia del Sueño: (Tiempo Total Dormido / Tiempo en Cama) × 100. Una eficiencia superior al 85% indica que tu tiempo en cama está optimizado. Si es menor al 85%, se recomienda aplicar restricción del tiempo en cama.',
    keywordMatched: 'diario de sueño eficiencia',
    category: 'Salud y Fisiología',
    actionLink: {
      label: 'Abrir Diario de Sueño TCC-I',
      targetId: 'diario-sueno'
    }
  }
];

export const ARTICLES: Article[] = [
  {
    slug: 'como-calcular-mi-ciclo-de-sueno',
    title: '¿Cómo calcular mi ciclo de sueño? Fórmula, ejemplos y límites',
    metaDescription: 'Aprende cómo calcular mi ciclo de sueño con una fórmula orientativa, ejemplos de horarios y los límites reales de la regla de 90 minutos.',
    h1: '¿Cómo calcular mi ciclo de sueño? Fórmula, ejemplos y límites',
    date: 'Actualizado el 7 de octubre de 2026',
    datePublished: '2026-07-18',
    dateModified: '2026-10-07',
    readTime: '9 min de lectura',
    category: 'Guías de Sueño y Neurociencia',
    targetKeywords: ['como calcular mi ciclo de sueño', 'calcular los ciclos de sueño', 'ciclo de sueño calculadora', 'calculadora de sueño', 'calculador de ciclos de sueño'],
    summary: 'Una guía práctica para estimar horarios de sueño sin asumir que todos los ciclos duran exactamente 90 minutos ni que una calculadora puede medir tus fases reales.',
    contentMarkdown: `
**Respuesta corta:** para calcular un horario orientativo puedes sumar o restar una latencia estimada y varios bloques de una duración de ciclo elegida. Esta web usa **90 minutos como valor inicial configurable**, pero no como una constante biológica: el [NHLBI](https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno) explica que los ciclos suelen reiniciarse aproximadamente cada **80 a 100 minutos** y que normalmente se recorren de 4 a 6 ciclos por noche.

Por eso, una **calculadora de sueño** sirve para planificar horarios, no para saber con precisión en qué fase estarás al sonar la alarma. Sin EEG, polisomnografía u otros sensores, una página web no puede medir tus fases reales.

## Fórmula orientativa para calcular los ciclos de sueño

La fórmula de planificación es sencilla:

**Hora estimada = hora objetivo ± latencia ± (número de ciclos × duración elegida)**

Si quieres despertarte a las 07:00, supones 15 minutos para conciliar el sueño y usas 90 minutos por ciclo, cinco ciclos representan 7 horas y 30 minutos de sueño. El horario orientativo para ir a la cama sería aproximadamente las **23:15**.

Ese resultado no significa que tu quinto ciclo vaya a terminar exactamente a las 07:00. Significa únicamente que has construido un horario usando un modelo matemático transparente.

## Ejemplo: despertar a las 07:00

| Escenario | Sueño planificado | Hora orientativa de acostarse con 15 min de latencia | Cómo interpretarlo |
| --- | ---: | ---: | --- |
| 6 ciclos de 90 min | 9 h | 21:45 | Ventana larga de sueño |
| 5 ciclos de 90 min | 7 h 30 min | 23:15 | Dentro de una duración habitual para muchos adultos |
| 4 ciclos de 90 min | 6 h | 00:45 | Por debajo de la recomendación general para adultos |

La [American Academy of Sleep Medicine y la Sleep Research Society](https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf) recomiendan que los adultos duerman **7 o más horas por noche de forma regular**. Por eso, la opción de 6 horas puede aparecer como cálculo matemático, pero no debe interpretarse como una meta saludable de sueño regular.

## ¿Por qué 90 minutos no es una regla exacta?

El sueño alterna fases NREM y REM. El tiempo dedicado a cada etapa cambia a lo largo de la noche y también entre personas. El NHLBI describe un ciclo que se reinicia cada 80–100 minutos, no un bloque fijo de 90 minutos.

En la práctica, el número 90 es útil como valor inicial porque queda en medio de ese intervalo. La calculadora permite cambiarlo para comparar escenarios de 80, 85, 90, 95 o 100 minutos.

Lo importante es no confundir **precisión matemática** con **precisión fisiológica**. La hora calculada puede ser exacta dentro de la fórmula y, al mismo tiempo, seguir siendo una estimación del sueño real.

## ¿Despertar al final de un ciclo elimina la inercia del sueño?

No se puede garantizar. La **inercia del sueño** es el periodo de somnolencia y menor rendimiento que puede aparecer después de despertar. El momento del despertar puede influir, pero también importan la duración total del descanso, la privación previa de sueño, el horario circadiano y las interrupciones nocturnas.

Por eso, una **ciclo de sueño calculadora** puede ayudarte a explorar horarios, pero no debería prometer que despertarás “sin cansancio” o en una fase concreta.

## Cómo usar la calculadora de forma útil

1. Empieza por una duración total de sueño suficiente.
2. Introduce la hora a la que necesitas despertar.
3. Ajusta la latencia si normalmente tardas más o menos en dormirte.
4. Usa 90 minutos como punto de partida, no como verdad exacta.
5. Compara varias opciones dentro de una duración total razonable.
6. Observa durante varios días cómo te sientes al despertar.
7. Mantén horarios relativamente consistentes cuando sea posible.

Puedes hacer el cálculo directamente en la [calculadora de sueño](/).

## Factores que una fórmula no puede conocer

Una calculadora horaria no sabe si esa noche tendrás microdespertares, enfermedad, consumo de alcohol, estrés, ruido ambiental, cambios de horario o un trastorno del sueño. Tampoco mide la actividad cerebral que se utiliza para clasificar las fases.

Esto explica por qué dos noches con la misma hora de acostarse y despertar pueden sentirse muy diferentes.

## Preguntas frecuentes

### ¿Es mejor dormir 7,5 horas que 8 horas?

No necesariamente. No existe una regla que haga que 7,5 horas sean universalmente mejores por corresponder a cinco bloques de 90 minutos. Si 8 horas encajan mejor con tus necesidades y horario, no hay razón para recortar el sueño solo para completar un múltiplo teórico.

### ¿Puedo elegir ciclos de 80 o 100 minutos?

Sí. La herramienta permite explorar duraciones dentro del intervalo aproximado descrito por el NHLBI. Sigue siendo una simulación, no una medición personal.

### ¿Qué hago si me despierto cansado todos los días?

Revisa primero duración, regularidad, horario y calidad del descanso. Si la somnolencia es intensa, persistente, afecta a conducir o trabajar, o existe ronquido con pausas respiratorias, una calculadora no es suficiente y conviene consultar a un profesional sanitario.

## Fuentes principales

* [NHLBI / NIH — Fases y etapas del sueño](https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno): ciclos aproximados de 80–100 minutos y etapas del sueño.
* [AASM / SRS — Recommended Amount of Sleep for a Healthy Adult](https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf): recomendación de 7 o más horas de sueño regular para adultos.
* [Metodología y política editorial](/metodologia/): supuestos de las herramientas, criterios de fuentes y política de correcciones.
`
  },
  {
    slug: 'como-calcular-las-horas-de-sueno',
    title: '¿Cómo calcular las horas de sueño? Rangos por edad y ejemplos',
    metaDescription: 'Consulta cómo calcular las horas de sueño con rangos por edad, ejemplos de horarios y referencias de AASM para niños, adolescentes y adultos.',
    h1: '¿Cómo calcular las horas de sueño que necesitas?',
    date: 'Actualizado el 7 de octubre de 2026',
    datePublished: '2026-07-10',
    dateModified: '2026-10-07',
    readTime: '9 min de lectura',
    category: 'Salud y Cronobiología',
    targetKeywords: ['como calcular las horas de sueño', 'calculo de horas de sueño', 'calcular horas de sueño', 'calculadora de horas de sueño', 'calculador de horas de sueño'],
    summary: 'Los rangos de sueño cambian con la edad. Esta guía explica cómo usarlos como referencia sin convertirlos en una prescripción individual.',
    contentMarkdown: `
**Respuesta corta:** para **calcular las horas de sueño** conviene empezar por el rango recomendado para la edad y compararlo con el tiempo que realmente duermes. No existe una fórmula capaz de determinar con exactitud las necesidades individuales a partir de edad, estrés o actividad física.

La [American Academy of Sleep Medicine (AASM)](https://aasm.org/advocacy/position-statements/child-sleep-duration-health-advisory/) publica rangos por edad para niños y adolescentes. Para adultos, la AASM y la Sleep Research Society recomiendan [7 o más horas por noche de forma regular](https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf).

## Tabla de horas de sueño por edad

| Edad | Referencia de sueño |
| --- | --- |
| 4–12 meses | 12–16 horas por 24 h, incluidas siestas |
| 1–2 años | 11–14 horas por 24 h, incluidas siestas |
| 3–5 años | 10–13 horas por 24 h, incluidas siestas |
| 6–12 años | 9–12 horas por 24 h |
| 13–18 años | 8–10 horas por 24 h |
| Adultos | 7 o más horas por noche de forma regular |

Para menores de 4 meses la propia metodología del consenso pediátrico señala que no se estableció un rango equivalente por falta de evidencia suficiente. En edades avanzadas y en situaciones clínicas concretas, la necesidad personal también puede variar.

Puedes consultar el rango correspondiente en la [calculadora de horas de sueño por edad](/calculadora-horas-de-sueno).

## Cómo convertir un rango de horas en un horario

Supón que un adulto quiere planificar 8 horas de sueño y necesita levantarse a las 07:00. Si estima que tarda 20 minutos en dormirse, debería estar preparado para dormir alrededor de las 22:40.

**Hora de acostarse = hora de despertar − duración objetivo − latencia estimada**

Este cálculo es más directo que intentar adivinar una fase exacta del sueño. La latencia también es variable: una noche puedes tardar 10 minutos y otra bastante más.

## ¿Qué es la deuda de sueño?

“Deuda de sueño” es una forma práctica de describir la diferencia acumulada entre una duración objetivo y el sueño registrado. Por ejemplo, si decides usar 8 horas como objetivo personal y duermes 6 horas durante tres noches, la diferencia matemática acumulada es de 6 horas.

Eso no significa que exista una cuenta biológica exacta que pueda saldarse hora por hora. El cuerpo no funciona como un banco de minutos de sueño. La métrica es útil para observar tendencias, no para diagnosticar un déficit clínico.

Nuestro [diario de sueño](/diario-sueno) permite registrar horarios para comparar semanas sin enviar esos datos a un diagnóstico automático.

## Duración, regularidad y calidad

La duración es solo una dimensión del descanso. También importan:

* **Regularidad:** horarios que cambian mucho pueden dificultar la adaptación del ritmo sueño-vigilia.
* **Continuidad:** despertares frecuentes reducen el tiempo de sueño efectivo.
* **Momento del día:** el reloj circadiano influye en cuándo resulta más fácil dormir.
* **Calidad percibida:** sentirse descansado o somnoliento aporta información que una fórmula no capta.

El [NHLBI](https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle) explica que el ritmo circadiano y la presión homeostática interactúan para regular sueño y vigilia, y que la luz, la oscuridad y los horarios influyen en ese sistema.

## ¿Debo sumar horas por hacer deporte, estar estresado o estar enfermo?

No existe una regla universal del tipo “deportista +45 minutos” o “estrés +60 minutos” que una calculadora web pueda aplicar con rigor a todo el mundo. Algunas situaciones pueden aumentar la necesidad de descanso, pero la cantidad concreta debe observarse individualmente y, si existe una condición médica, valorarse profesionalmente.

Por ese motivo la calculadora por edad muestra el rango de referencia sin añadir automáticamente horas por embarazo, entrenamiento, estrés o enfermedad.

## ¿Qué pasa si trabajo de noche?

El objetivo de duración sigue siendo importante, pero el horario se vuelve más difícil porque el sueño puede producirse en una fase circadiana menos favorable. La oscuridad del dormitorio, el ruido, la exposición a la luz y la consistencia del turno pueden influir.

Una calculadora puede ayudarte a reservar una ventana de sueño, pero no corrige por sí sola un desajuste circadiano.

## Preguntas frecuentes

### ¿Contar tiempo en cama es lo mismo que contar sueño?

No. El tiempo en cama incluye periodos despierto. El diario del sitio permite registrar ambos para observar la relación entre ellos.

### ¿Tengo que dormir exactamente ocho horas?

No. Ocho horas es una cifra común, pero la recomendación para adultos se expresa como **7 o más horas** y existe variación individual. Niños y adolescentes tienen rangos distintos.

### ¿Puedo calcular las horas de sueño de un niño con ciclos de 90 minutos?

No es recomendable convertir automáticamente las necesidades pediátricas en bloques adultos de 90 minutos. Para niños resulta más útil partir de los rangos por edad y del sueño total en 24 horas cuando corresponda.

## Fuentes principales

* [AASM — Child Sleep Duration Health Advisory](https://aasm.org/advocacy/position-statements/child-sleep-duration-health-advisory/): rangos pediátricos y de adolescentes.
* [AASM / SRS — Recommended Amount of Sleep for a Healthy Adult](https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf): adultos.
* [NHLBI — Your Sleep/Wake Cycle](https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle): ritmo circadiano y presión de sueño.
* [Metodología y política editorial](/metodologia/): cómo se seleccionan y actualizan las fuentes.
`
  },
  {
    slug: 'guia-ciclo-de-sueno-calculadora',
    title: 'Ciclo de sueño calculadora: web, apps y wearables comparados',
    metaDescription: 'Compara una calculadora de sueño web, apps y wearables: qué datos usan, qué pueden estimar y por qué no sustituyen una medición clínica.',
    h1: 'Ciclo de sueño calculadora: comparativa de web, apps y wearables',
    date: 'Actualizado el 7 de octubre de 2026',
    datePublished: '2026-07-02',
    dateModified: '2026-10-07',
    readTime: '8 min de lectura',
    category: 'Tecnología e Innovación',
    targetKeywords: ['ciclo de sueño calculadora', 'calculadoras de sueño', 'calculadora de sueño app', 'calculadora de sueño adidas', 'calculadora de sueño runtastic'],
    summary: 'Una comparación práctica entre calculadoras horarias, apps con sensores y wearables, con especial atención a sus límites y privacidad.',
    contentMarkdown: `
**Respuesta corta:** una **ciclo de sueño calculadora** web calcula horarios a partir de horas y supuestos. Una app puede añadir movimiento o sonido y un wearable puede añadir señales fisiológicas, pero ninguno de esos métodos equivale por defecto a una polisomnografía clínica.

El [NHLBI](https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno) explica que los estudios de sueño utilizan sensores para registrar movimientos oculares y actividad cerebral con el fin de clasificar las fases. Una calculadora web no recoge esas señales.

## Qué hace una calculadora de sueño web

Una calculadora web como esta recibe datos sencillos:

* hora de acostarse o despertar;
* latencia estimada;
* duración de ciclo elegida.

Con esos datos genera ventanas de horario. Su ventaja principal es la transparencia: puedes ver el supuesto utilizado y cambiarlo. Su principal límite es igual de claro: **no mide lo que ocurre mientras duermes**.

## Qué puede añadir una app móvil

Una app puede utilizar acelerómetro, micrófono u otros sensores disponibles en el teléfono. Eso permite registrar movimiento o sonido y construir estimaciones adicionales.

La precisión depende del dispositivo, el algoritmo, la posición del teléfono, el entorno y la variable que se intente medir. Una app que detecta movimiento no está midiendo directamente la actividad cerebral.

## Qué puede añadir un wearable

Relojes, anillos y pulseras pueden combinar movimiento con frecuencia cardíaca, variabilidad de frecuencia cardíaca, temperatura u otras señales. Esos datos permiten crear modelos más ricos que una simple fórmula horaria.

Aun así, una estimación de “sueño profundo” o “REM” de un dispositivo de consumo no debe interpretarse automáticamente como equivalente a la clasificación clínica de un estudio de sueño.

## Comparativa rápida

| Tipo de herramienta | Datos principales | Valor más claro | Límite principal |
| --- | --- | --- | --- |
| Calculadora web | Hora, latencia y supuestos | Planificar horarios | No mide fases |
| App móvil | Hora + sensores del teléfono | Registrar patrones y sonidos | Depende del dispositivo y contexto |
| Wearable | Movimiento + señales fisiológicas | Tendencias personales | Las fases siguen siendo estimaciones |
| Estudio de sueño | Sensores clínicos, incluida actividad cerebral | Evaluación clínica cuando está indicada | Requiere equipamiento y supervisión |

## ¿Qué ocurre con Adidas / Runtastic Sleep Better?

Las búsquedas de **calculadora de sueño adidas** y **calculadora de sueño runtastic** suelen referirse a herramientas o aplicaciones históricas del ecosistema Runtastic/Adidas relacionadas con el registro del descanso. Esta página no pretende representar ni sustituir oficialmente esos productos.

Si lo que buscas hoy es una herramienta para calcular una hora orientativa de dormir o despertar, puedes usar la [calculadora de sueño](/). Si necesitas registrar señales nocturnas, una aplicación o wearable puede ofrecer datos que una calculadora horaria no tiene.

## Privacidad: qué conviene revisar

Antes de usar cualquier app o wearable, comprueba:

1. Qué sensores utiliza.
2. Si guarda audio.
3. Si necesita una cuenta.
4. Qué datos se sincronizan con la nube.
5. Si permite borrar o exportar información.
6. Si el servicio sigue funcionando sin una suscripción.

En esta web, los cálculos principales se realizan en el navegador. Las preferencias opcionales de analítica o publicidad, cuando existan, deben respetar la selección de consentimiento.

## Cómo elegir según tu objetivo

### Solo quiero saber a qué hora acostarme

Una calculadora web es suficiente para explorar ventanas horarias. No necesitas un sensor para hacer una resta de horas.

### Quiero observar tendencias durante semanas

Un diario de sueño, una app o un wearable puede ser más útil porque permite comparar días. Puedes empezar con el [diario de sueño](/diario-sueno).

### Quiero saber si tengo apnea o un trastorno del sueño

Ninguna comparativa de apps debería sustituir una evaluación sanitaria. Si existen pausas respiratorias, somnolencia peligrosa, insomnio persistente u otros síntomas relevantes, corresponde hablar con un profesional.

## Preguntas frecuentes

### ¿Una app que despierta en “fase ligera” sabe exactamente en qué fase estoy?

No necesariamente. La respuesta depende de qué sensores utilice y de cómo valide su algoritmo. La fase real del sueño se clasifica clínicamente con señales que una simple calculadora web no recoge.

### ¿Un wearable es siempre mejor que una calculadora web?

No. Es más complejo y recoge más señales, pero si tu único objetivo es reservar 8 horas para dormir, una herramienta sencilla puede ser suficiente.

### ¿Por qué esta web permite cambiar la duración del ciclo?

Porque el ciclo no es un bloque universal de 90 minutos. El intervalo de 80–100 minutos descrito por el NHLBI justifica mostrar el supuesto y permitir ajustarlo.

## Fuentes principales

* [NHLBI / NIH — Fases y etapas del sueño](https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno): fases, ciclos y medición mediante estudios de sueño.
* [NHLBI — Your Sleep/Wake Cycle](https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle): ritmo circadiano y factores que influyen en sueño/vigilia.
* [Metodología y política editorial](/metodologia/): criterios del sitio para herramientas, fuentes y correcciones.
`
  }
];
