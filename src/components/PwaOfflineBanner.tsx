import React, { useState, useEffect } from 'react';
import { Smartphone, Download, Check, Sparkles, X, WifiOff, Bookmark } from 'lucide-react';

export const PwaOfflineBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in standalone mode (PWA)
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }
  }, []);

  if (!isVisible || isStandalone) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900 to-amber-950/90 border-b border-indigo-500/30 px-4 py-2.5 text-xs text-slate-200 shadow-md flex items-center justify-between gap-3 relative z-30">
        <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1">
          <span className="p-1.5 bg-amber-500/20 border border-amber-400/40 rounded-lg text-amber-300 shrink-0">
            <Smartphone className="w-3.5 h-3.5" />
          </span>
          <p className="line-clamp-1 sm:line-clamp-none">
            <strong className="text-white font-bold">¡Acceso sin conexión!</strong> Guarda <span className="text-amber-300 font-bold">Calculadora de Sueño</span> en tu pantalla de inicio para volver a usar las páginas que ya hayas visitado.
          </p>
          <button
            onClick={() => setShowGuide(true)}
            className="ml-auto sm:ml-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-[11px] border border-indigo-400/50 shadow shrink-0 transition-all flex items-center gap-1"
          >
            <Bookmark className="w-3 h-3" />
            <span>Instalar / Guardar</span>
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Installation Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-slate-800">
              <div className="p-3 bg-amber-500/20 border border-amber-400/30 rounded-2xl text-amber-300">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Instalar en la Pantalla de Inicio</h3>
                <p className="text-xs text-slate-400">Puede reutilizar recursos y páginas visitadas cuando pierdes la conexión.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="bg-amber-500 text-slate-950 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-black">1</span>
                  <span>En iPhone / iPad (Safari)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Toca el botón <strong>Compartir</strong> (icono de cuadrado con flecha) en Safari y selecciona <strong>"Añadir a la pantalla de inicio"</strong>.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <span className="bg-indigo-500 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-black">2</span>
                  <span>En Android (Chrome / Edge)</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Toca el menú de <strong>3 puntos (⋮)</strong> en la esquina superior derecha y elige <strong>"Instalar aplicación"</strong> o <strong>"Añadir a pantalla de inicio"</strong>.
                </p>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-800/80 p-3 rounded-2xl text-emerald-300 text-[11px] flex items-center gap-2">
                <WifiOff className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Tras una primera visita online, el navegador guarda recursos esenciales y páginas visitadas para poder reutilizarlas sin conexión.</span>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
