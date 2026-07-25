import React from 'react';
import { Moon, Heart, ShieldCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Moon className="w-4 h-4 fill-current text-amber-200" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                Calculadora de Sueño
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tu guía científica de ciclos del sueño. Calculadora gratis online para optimizar tu descanso diario.
            </p>
            <div className="text-[11px] text-indigo-400 font-mono">
              Domain: calculadoradesueño.org (xn--calculadoradesueo-uxb.org)
            </div>
          </div>

          {/* Sitemaps Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Herramientas</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-indigo-300 transition-colors text-left">
                  Calculadora de Ciclos de Sueño
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('nap')} className="hover:text-indigo-300 transition-colors text-left">
                  Calculadora de Siestas & Power Naps
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('diary')} className="hover:text-indigo-300 transition-colors text-left">
                  Diario de Sueño TCC-I y Eficiencia
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('age-calculator')} className="hover:text-indigo-300 transition-colors text-left">
                  Calculador de Horas por Edad
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('sounds')} className="hover:text-indigo-300 transition-colors text-left">
                  Generador de Ruido Blanco
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('app-reviews')} className="hover:text-indigo-300 transition-colors text-left">
                  Comparativa Apps (Adidas / Runtastic)
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Institucional y Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors">
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors">
                  Contacto y Soporte
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentTab('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors">
                  Términos y Condiciones de Uso
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('faq')} className="hover:text-indigo-300 transition-colors">
                  Preguntas Frecuentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Aviso Médico</span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Esta herramienta ofrece estimaciones basadas en modelos estadísticos de cronobiología y la regla de los 90 minutos. No constituye diagnóstico médico ni sustituye la consulta con un somnólogo certificado.
            </p>
          </div>
        </div>

        {/* Footer Keywords List (Comparativa de las mejores calculadoras de sueño) */}
        <div className="pt-6 border-t border-slate-900 flex items-center justify-between flex-wrap gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 <strong>Calculadora de Sueño</strong> | calculadoradesueño.org. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300 cursor-pointer">
              Sobre Nosotros
            </button>
            <span>•</span>
            <button onClick={() => { setCurrentTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300 cursor-pointer">
              Política de Privacidad
            </button>
            <span>•</span>
            <button onClick={() => { setCurrentTab('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300 cursor-pointer">
              Términos de Uso
            </button>
            <span>•</span>
            <button onClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300 cursor-pointer">
              Contacto
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
