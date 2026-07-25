import React, { useState, useEffect } from 'react';
import { ChevronUp, Compass, Clock, Volume2, Activity, Coffee, Moon, BookOpen, HelpCircle } from 'lucide-react';

interface FloatingQuickNavProps {
  onNavigateTab: (tab: string, elementId?: string) => void;
}

export const FloatingQuickNav: React.FC<FloatingQuickNavProps> = ({ onNavigateTab }) => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpenMenu(false);
  };

  const navItems = [
    { label: 'Calculadora de Ciclos', id: 'calculadora-principal', icon: Clock, tab: 'home' },
    { label: 'Sonidos & Ruido Marrón', id: 'reproductor-sonidos', icon: Volume2, tab: 'home' },
    { label: 'Calculadora de Cafeína', id: 'calculadora-cafeina', icon: Coffee, tab: 'home' },
    { label: 'Test Diagnóstico Sueño', id: 'test-diagnostico-suno', icon: Activity, tab: 'home' },
    { label: 'Test de Cronotipo (León/Búho)', id: 'test-cronotipo', icon: Moon, tab: 'home' },
    { label: 'Diario de Sueño TCC-I', id: '', icon: BookOpen, tab: 'diary' },
    { label: 'Calculadora de Siestas', id: '', icon: Compass, tab: 'nap' },
    { label: 'Preguntas Frecuentes FAQ', id: 'faq', icon: HelpCircle, tab: 'home' },
  ];

  const handleSelectNav = (tab: string, elementId?: string) => {
    onNavigateTab(tab, elementId);
    setIsOpenMenu(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5 print:hidden">
      {/* Expanded Quick Navigation Menu */}
      {isOpenMenu && (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-2xl w-64 space-y-1 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800 px-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Navegación Rápida</span>
            </span>
            <button
              onClick={() => setIsOpenMenu(false)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {navItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectNav(item.tab, item.id)}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-indigo-600/30 transition-all text-left"
                >
                  <IconComp className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Buttons Bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2.5 rounded-full shadow-lg border border-indigo-400/40 font-bold text-xs transition-all hover:scale-105 active:scale-95"
          title="Abrir Menú de Acceso Rápido"
        >
          <Compass className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">Índice Rápido</span>
        </button>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
            title="Volver arriba de la página"
          >
            <ChevronUp className="w-4 h-4 text-amber-300" />
          </button>
        )}
      </div>
    </div>
  );
};
