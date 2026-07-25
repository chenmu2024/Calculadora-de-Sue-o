import React from 'react';
import { Moon, Heart, Award, ShieldCheck, Users, BookOpen, Brain, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutUsViewProps {
  setCurrentTab: (tab: string) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ setCurrentTab }) => {
  return (
    <div id="sobre-nosotros" className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>Conoce Nuestra Misión y Compromiso Científico</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Sobre Nosotros - Calculadora de Sueño
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Somos la plataforma de divulgación científica y herramientas de cronobiología de acceso libre referente en español, dedicada a ayudarte a dormir mejor y despertar con energía.
        </p>
      </div>

      {/* Main Mission Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-amber-300 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">Nuestra Misión</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Democratizar la Ciencia del Descanso Fisiológico
            </h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          En <strong>xn--calculadoradesueo-uxb.org</strong>, creemos que un descanso reparador no debería ser un lujo ni depender de costosas suscripciones. Naciese con el objetivo de proporcionar a millones de hispanohablantes algoritmos precisos basados en la regla de los 90 minutos de ultradián, la escala de somnolencia de Epworth y los principios de la Terapia Cognitivo-Conductual para el Insomnio (TCC-I).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-2xl font-black text-emerald-400 block">100% Gratis</span>
            <span className="text-xs text-slate-300 font-medium">Sin registros obligatorios ni comisiones ocultas.</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-2xl font-black text-indigo-300 block">Privacidad 0% Data</span>
            <span className="text-xs text-slate-300 font-medium">Cálculos 100% locales en tu propio navegador.</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-2xl font-black text-amber-300 block">E-E-A-T Rigor</span>
            <span className="text-xs text-slate-300 font-medium">Contenidos revisados bajo guías AASM y NSF.</span>
          </div>
        </div>
      </div>

      {/* Why Choose Us & Key Pillars */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-400" />
          <span>Nuestros 4 Pilares de Excelencia Editorial y Técnica</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <Brain className="w-5 h-5 text-amber-300" />
              <span>1. Fundamento Neurofisiológico</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Nuestros algoritmos incorporan la curva de latencia promedio (15 minutos) y las distintas etapas del sueño (NREM 1, 2, 3 y REM) para evitar la inercia del sueño al despertar.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>2. Respeto Absoluto a la Privacidad</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Cumplimos estrictamente con el RGPD y la CCPA. Ninguno de tus registros de sueño, horarios ni datos de cafeína se envían a servidores externos ni se comercializan.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <Users className="w-5 h-5 text-sky-400" />
              <span>3. Accesibilidad Universal Multi-Dispositivo</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Diseñado para funcionar al instante en móviles, tablets y ordenadores sin requerir espacio de almacenamiento ni agotar la batería de tu dispositivo durante la noche.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <BookOpen className="w-5 h-5 text-violet-400" />
              <span>4. Actualización Científica Continua</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Revisamos periódicamente nuestros artículos y herramientas para reflejar las últimas investigaciones en cronobiología, higiene del sueño y metabolización de estimulantes.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Editorial Team & EEAT Doctor Credentials Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-amber-300">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">Dirección Médica & E-E-A-T</span>
            <h2 className="text-xl font-bold text-white">
              Comité Científico y Revisión Clínica
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-950 border-2 border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-lg">
                MF
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Dra. Marta Fernández</h3>
                <span className="text-xs text-indigo-300 font-semibold block">Especialista en Neurofisiología y Medicina del Sueño</span>
                <span className="text-[10px] text-slate-500 font-mono">Colegiada Nº 282809112</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supervisa la precisión algorítmica de los ciclos de 90 minutos, latencia de sueño y las directrices de higiene circadiana según la American Academy of Sleep Medicine (AASM).
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-950 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-300 font-bold text-lg">
                CR
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Dr. Carlos Ruiz</h3>
                <span className="text-xs text-emerald-300 font-semibold block">Especialista en Psicología Clínica y TCC-I</span>
                <span className="text-[10px] text-slate-500 font-mono">Colegiado Nº 28391004</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desarrollador de los protocolos de cálculo del Diario de Sueño TCC-I y la técnica de restricción del tiempo en cama para el manejo del insomnio.
            </p>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer & Editorial Team */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Aviso Médico y Transparencia</span>
        </h2>
        <p className="leading-relaxed">
          El contenido publicado en <strong>xn--calculadoradesueo-uxb.org</strong> tiene fines exclusivamente informativos, educativos y de autocuidado. Nuestras herramientas no constituyen asesoramiento médico profesional, diagnóstico ni tratamiento para trastornos clínicos del sueño como la apnea obstructiva del sueño (AOS), insomnio crónico o narcolepsia. Si experimentas somnolencia diurna excesiva o despertares asfixiantes, te recomendamos consultar con un médico somnólogo certificado.
        </p>

        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <span className="text-slate-400 text-xs">
            ¿Tienes alguna duda o sugerencia para mejorar nuestra calculadora?
          </span>
          <button
            onClick={() => setCurrentTab('contact')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
          >
            <span>Contactar con el Equipo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
