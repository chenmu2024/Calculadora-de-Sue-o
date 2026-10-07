import React from 'react';
import { BookOpen, Calculator, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';
import { AnswerFirst } from './AnswerFirst';

const FAQS = [
  {
    q: '¿Cuánto dura un ciclo de sueño?',
    a: 'No existe una duración exacta universal. El NHLBI indica que el ciclo suele reiniciarse aproximadamente cada 80 a 100 minutos. Esta calculadora usa 90 minutos como valor inicial configurable para planificar horarios.'
  },
  {
    q: '¿La calculadora puede saber si despertaré en sueño ligero?',
    a: 'No. Sin sensores o un estudio de sueño, una calculadora web no puede conocer tu fase real en un momento concreto. El resultado es una estimación horaria, no una medición fisiológica.'
  },
  {
    q: '¿Es mejor dormir 7,5 horas que 8 horas por completar cinco ciclos?',
    a: 'No se puede afirmar de forma general. La duración total suficiente y la regularidad son más importantes que intentar encajar el sueño en bloques exactos. Para adultos, la AASM recomienda dormir 7 o más horas por noche de forma regular.'
  },
  {
    q: '¿Por qué puedo despertar cansado aunque haya dormido suficientes horas?',
    a: 'La sensación al despertar puede depender de la duración y calidad del sueño, el momento del despertar, interrupciones nocturnas, horario circadiano y otros factores. Si la somnolencia es intensa o persistente, una calculadora no sustituye una valoración profesional.'
  },
  {
    q: '¿Qué diferencia hay entre una calculadora web y un wearable?',
    a: 'La calculadora web usa horas y supuestos matemáticos. Un wearable puede añadir movimiento, frecuencia cardíaca u otras señales, pero sus estimaciones de fases tampoco equivalen a una polisomnografía.'
  }
];

export const SEOSection: React.FC = () => (
  <section className="mt-16 pt-12 border-t border-slate-800 space-y-8">
    <AnswerFirst
      title="¿Cómo usar una calculadora de sueño sin interpretar el resultado como una medición clínica?"
      answer="Úsala para explorar horarios posibles: introduce la hora a la que quieres dormir o despertar, ajusta tu latencia y prueba una duración de ciclo razonable. Después prioriza una duración total suficiente y observa cómo respondes durante varios días, en lugar de asumir que un múltiplo de 90 minutos predice tu fase real."
      facts={[
        'NHLBI: los ciclos suelen reiniciarse aproximadamente cada 80–100 minutos.',
        'AASM/SRS: los adultos deberían dormir 7 o más horas por noche de forma regular.',
        'La herramienta no mide EEG, REM, NREM ni diagnostica trastornos del sueño.'
      ]}
      sources={[
        { label: 'NHLBI: fases del sueño', href: 'https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno' },
        { label: 'AASM: duración del sueño en adultos', href: 'https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf' }
      ]}
    />

    <article className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-7">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300">
          <Calculator className="w-4 h-4" />
          Metodología de la calculadora
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          Cómo se calculan los ciclos de sueño en esta web
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          La calculadora toma una hora objetivo y suma o resta una latencia de inicio del sueño más varios bloques de la duración de ciclo seleccionada. El valor inicial es 90 minutos, pero puedes cambiarlo porque la duración real del ciclo varía.
        </p>
      </header>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
        <div className="text-xs text-slate-400 mb-2">Fórmula de planificación</div>
        <div className="font-mono text-sm text-indigo-200">
          hora estimada = hora objetivo ± latencia ± (número de ciclos × duración elegida)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-2">Lo que sí hace</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Calcula ventanas horarias a partir de tus entradas.</li>
            <li>• Permite cambiar latencia y duración de ciclo.</li>
            <li>• Ayuda a comparar opciones de duración total.</li>
          </ul>
        </section>
        <section className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-2">Lo que no hace</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• No identifica tu fase real de sueño.</li>
            <li>• No garantiza despertar sin inercia.</li>
            <li>• No diagnostica insomnio, apnea u otros trastornos.</li>
          </ul>
        </section>
      </div>

      <section className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-300" />
          Fuentes y transparencia
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Las afirmaciones principales se apoyan en fuentes de organismos especializados. La metodología completa, el registro de fuentes, las correcciones y el uso de automatización editorial están documentados públicamente.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <a href="/metodologia/" className="text-indigo-300 hover:underline">
            Ver metodología y política editorial
          </a>
          <a href="https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-300 hover:underline">
            NHLBI <ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-indigo-300 hover:underline">
            AASM/SRS <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>
    </article>

    <section id="faq" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300">
          <HelpCircle className="w-4 h-4 text-amber-300" />
          Preguntas frecuentes
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          Dudas sobre ciclos de sueño y la calculadora
        </h2>
        <p className="text-xs text-slate-400">
          Estas respuestas son informativas. No se usa FAQ Schema para prometer un resultado enriquecido en Google.
        </p>
      </header>

      <div className="space-y-3">
        {FAQS.map((faq) => (
          <details key={faq.q} className="group bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <summary className="cursor-pointer font-bold text-sm text-white">
              {faq.q}
            </summary>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">{faq.a}</p>
          </details>
        ))}
      </div>

      <div className="border-t border-slate-800 pt-4 text-xs text-slate-400 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <span>
          Si tienes somnolencia intensa, pausas respiratorias, insomnio persistente u otro síntoma que afecte a tu salud o seguridad, consulta a un profesional sanitario.
        </span>
      </div>
    </section>

    <nav aria-label="Enlaces relacionados" className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Continúa según tu objetivo</div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href="/calculadora-horas-de-sueno" className="text-indigo-300 hover:underline">Horas de sueño por edad</a>
        <a href="/siestas" className="text-indigo-300 hover:underline">Calculadora de siestas</a>
        <a href="/diario-sueno" className="text-indigo-300 hover:underline">Diario de sueño</a>
        <a href="/app-calculadora-de-sueno" className="text-indigo-300 hover:underline">Comparativa de apps</a>
        <a href="/blog" className="text-indigo-300 hover:underline">Guías sobre sueño</a>
        <a href="/metodologia/" className="text-indigo-300 hover:underline">Metodología y fuentes</a>
      </div>
    </nav>
  </section>
);
