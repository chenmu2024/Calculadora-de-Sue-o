import React from 'react';
import { BookOpen, Calculator, CheckCircle2, RefreshCw, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { AnswerFirst } from './AnswerFirst';
import { EDITORIAL_SOURCES } from '../data/sourceRegistry';

export const MethodologyView: React.FC = () => {
  return (
    <div id="metodologia" className="space-y-8 py-6 max-w-5xl mx-auto">
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
          Transparencia editorial
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Metodología, Fuentes y Política Editorial
        </h1>
        <p className="text-slate-300 leading-relaxed">
          Aquí explicamos qué calcula realmente el sitio, qué supuestos utiliza, qué no puede medir y cómo revisamos las afirmaciones sobre salud y sueño.
        </p>
      </header>

      <AnswerFirst
        title="¿Cómo se construyen los resultados de Calculadora de Sueño?"
        answer="Los resultados son estimaciones matemáticas de planificación. Parten de la hora indicada por el usuario, una latencia configurable y una duración de ciclo configurable. No se conectan a EEG, polisomnografía ni sensores clínicos, por lo que no pueden identificar la fase real en la que una persona estará al despertar."
        facts={[
          'El valor inicial de ciclo es 90 minutos, pero puede ajustarse porque los ciclos no duran exactamente lo mismo en todas las personas.',
          'Los rangos de sueño por edad se presentan como referencias poblacionales, no como diagnóstico individual.',
          'Cuando una afirmación factual afecta a salud o seguridad, preferimos fuentes primarias, organismos sanitarios o consensos profesionales.'
        ]}
        sources={EDITORIAL_SOURCES.slice(0, 3).map((source) => ({
          label: source.organization,
          href: source.url
        }))}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Calculator className="w-5 h-5 text-indigo-400" />
            Cómo funciona la calculadora principal
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            La herramienta suma o resta una latencia de inicio del sueño y múltiplos de una duración de ciclo elegida por el usuario. El valor inicial de 90 minutos es una aproximación práctica, no una constante fisiológica.
          </p>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-200">
            horario estimado = hora objetivo ± latencia ± (número de ciclos × duración elegida)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <BookOpen className="w-5 h-5 text-amber-300" />
            Qué significa una fuente válida
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Para recomendaciones de duración del sueño y fisiología básica priorizamos NIH/NHLBI, AASM, publicaciones de consenso y documentación primaria. Un enlace solo se conserva si respalda realmente la afirmación visible.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <RefreshCw className="w-5 h-5 text-emerald-400" />
            Correcciones y actualización
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            No cambiamos fechas solo para aparentar frescura. Una página se actualiza cuando cambia la herramienta, se corrige una afirmación, se reemplaza una fuente o se incorpora información que modifica de forma sustancial el contenido.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Sparkles className="w-5 h-5 text-violet-400" />
            Automatización y asistencia editorial
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Podemos utilizar automatización o herramientas de IA para estructurar borradores, detectar inconsistencias o mantener código y documentación. Esto no convierte una salida automática en evidencia: las afirmaciones sensibles deben apoyarse en fuentes verificables y los resultados de las calculadoras deben explicar sus supuestos.
          </p>
        </div>
      </section>

      <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          Registro de fuentes principales
        </h2>
        <div className="space-y-3">
          {EDITORIAL_SOURCES.map((source) => (
            <article key={source.id} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="font-bold text-white text-sm">{source.name}</h3>
                  <div className="text-xs text-indigo-300">{source.organization}</div>
                </div>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 hover:underline"
                >
                  Abrir fuente
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-3">
                <strong className="text-slate-300">Qué respalda:</strong> {source.supports}
              </p>
              <p className="text-[11px] text-slate-500 mt-2">Última comprobación editorial: {source.checkedDate}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-emerald-950/30 border border-emerald-700/40 rounded-3xl p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          <div>
            <h2 className="font-bold text-white mb-2">Límites del sitio</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Calculadora de Sueño no diagnostica apnea, insomnio, trastornos circadianos ni otras enfermedades; tampoco determina fases reales del sueño. Si existe somnolencia intensa, pausas respiratorias, insomnio persistente o un problema que afecte a la seguridad, la siguiente acción adecuada es consultar a un profesional sanitario.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
