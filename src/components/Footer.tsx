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
              Domain: xn--calculadoradesueo-uxb.org
            </div>
          </div>

          {/* Sitemaps Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Herramientas</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/'); setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block text-left">
                  Calculadora de Ciclos de Sueño
                </a>
              </li>
              <li>
                <a href="/siestas" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/siestas'); setCurrentTab('nap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block text-left">
                  Calculadora de Siestas & Power Naps
                </a>
              </li>
              <li>
                <a href="/diario-sueno" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/diario-sueno'); setCurrentTab('diary'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block text-left">
                  Diario de Sueño TCC-I y Eficiencia
                </a>
              </li>
              <li>
                <a href="/calculadora-horas-de-sueno" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculadora-horas-de-sueno'); setCurrentTab('age-calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block text-left">
                  Calculador de Horas por Edad
                </a>
              </li>
              <li>
                <a href="/sonidos" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/sonidos'); setCurrentTab('sounds'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block text-left">
                  Generador de Ruido Blanco
                </a>
              </li>
              <li>
                <a href="/app-calculadora-de-sueno" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/app-calculadora-de-sueno'); setCurrentTab('app-reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block text-left">
                  Comparativa Apps (Adidas / Runtastic)
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Institucional y Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/sobre-nosotros" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/sobre-nosotros'); setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="/contacto" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/contacto'); setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block">
                  Contacto y Soporte
                </a>
              </li>
              <li>
                <a href="/politica-privacidad" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/politica-privacidad'); setCurrentTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos-de-uso" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/terminos-de-uso'); setCurrentTab('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-300 transition-colors block">
                  Términos y Condiciones de Uso
                </a>
              </li>
              <li>
                <a href="/#faq" onClick={(e) => { e.preventDefault(); setCurrentTab('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-indigo-300 transition-colors block">
                  Preguntas Frecuentes (FAQ)
                </a>
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
        <div className="pt-6 border-t border-slate-900 pb-2 text-[10px] text-slate-500">
          <p className="mb-2"><strong>Otras calculadoras y comparativas de sueño populares:</strong></p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/app-calculadora-de-sueno" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/app-calculadora-de-sueno'); setCurrentTab('app-reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-400 underline decoration-slate-700 underline-offset-2">Comparativa de las mejores calculadoras de sueño</a>
            <a href="/app-calculadora-de-sueno" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/app-calculadora-de-sueno'); setCurrentTab('app-reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-400 underline decoration-slate-700 underline-offset-2">Calculadoras de sueño alternativas a Runtastic y Adidas</a>
            <a href="/app-calculadora-de-sueno" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/app-calculadora-de-sueno'); setCurrentTab('app-reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-400 underline decoration-slate-700 underline-offset-2">Mejores calculadoras de ciclo de sueño</a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex items-center justify-between flex-wrap gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 <strong>Calculadora de Sueño</strong> | xn--calculadoradesueo-uxb.org. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-3">
            <a href="/sobre-nosotros" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/sobre-nosotros'); setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300">
              Sobre Nosotros
            </a>
            <span>•</span>
            <a href="/politica-privacidad" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/politica-privacidad'); setCurrentTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300">
              Política de Privacidad
            </a>
            <span>•</span>
            <a href="/terminos-de-uso" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/terminos-de-uso'); setCurrentTab('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300">
              Términos de Uso
            </a>
            <span>•</span>
            <a href="/contacto" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/contacto'); setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-300">
              Contacto
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
