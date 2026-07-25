import React from 'react';
import { ShieldCheck, Scale, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface TermsViewProps {
  setCurrentTab: (tab: string) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({ setCurrentTab }) => {
  return (
    <div id="terminos-uso" className="space-y-10 py-6 max-w-5xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Marco Legal y Condiciones de Servicio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Términos y Condiciones de Uso
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Última actualización: <strong>23 de Julio de 2026</strong> | Dominio: <strong>calculadoradesueño.org</strong>
        </p>
      </div>

      {/* Medical Warning Highlight Box */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-900/60 border border-amber-600 flex items-center justify-center text-amber-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-200">Aviso Legal de Exención de Responsabilidad Médica</h2>
            <p className="text-xs text-amber-300/80">Por favor, lee atentamente esta cláusula antes de utilizar la calculadora.</p>
          </div>
        </div>
        <p className="text-slate-300">
          Los resultados generados por <strong>calculadoradesueño.org</strong> (gráficos de ciclos, cálculo de horas por edad, tiempos de eliminación de cafeína y eficiencia de sueño TCC-I) son estimaciones estadísticas con fines puramente informativos y de educación sobre estilos de vida saludables. <strong>No constituyen un diagnóstico médico, prescripción ni consulta clínica.</strong>
        </p>
      </div>

      {/* Terms Sections */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>1. Aceptación de las Condiciones</span>
          </h2>
          <p>
            Al acceder y utilizar este sitio web, aceptas quedar vinculado por los presentes Términos y Condiciones de Uso. Si no estás de acuerdo con alguno de los términos enunciados, debes abstenerte de utilizar nuestras herramientas.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>2. Propiedad Intelectual</span>
          </h2>
          <p>
            Todos los textos, logotipos, algoritmos, diseños interactivos, código fuente e ilustraciones presentes en <strong>calculadoradesueño.org</strong> están protegidos por las leyes internacionales de propiedad intelectual y derechos de autor.
          </p>
          <p>
            Queda prohibida la reproducción total o parcial, venta o redistribución no autorizada del software o contenidos sin la cita explícita del dominio y enlace de retorno (backlink) a <code>https://calculadoradesueño.org</code>.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-400" />
            <span>3. Uso Permitido y Limitación de Responsabilidad</span>
          </h2>
          <p>
            El usuario se compromete a hacer un uso lícito y ético del sitio web. El equipo de <strong>calculadoradesueño.org</strong> no se hace responsable de:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
            <li>Interrupciones temporales del servicio debidas a mantenimiento técnico o fallos del proveedor de alojamiento.</li>
            <li>Decisiones de salud tomadas de forma unilateral por el usuario basadas en los resultados numéricos de las calculadoras.</li>
            <li>Incompatibilidades de reproducción de sonido en navegadores que restrinjan la reproducción automática de audio (Autoplay Policy).</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>4. Modificaciones del Servicio y Legislación Aplicable</span>
          </h2>
          <p>
            Nos reservamos el derecho de modificar o actualizar estas condiciones en cualquier momento para adaptarlas a novedades legislativas o mejoras técnicas en los algoritmos.
          </p>
          <p>
            Estas condiciones se rigen por la legislación española y europea sobre comercio electrónico y protección de los consumidores.
          </p>
        </section>

      </div>

      {/* Footer Contact Shortcut */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-2 text-xs">
        <p className="text-slate-400">
          Si tienes alguna consulta legal sobre estos términos, por favor contacta con nosotros en:
        </p>
        <a href="mailto:contacto@calculadoradesueño.org" className="text-indigo-400 hover:underline font-bold font-mono">
          contacto@calculadoradesueño.org
        </a>
      </div>

    </div>
  );
};
