import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X, Info } from 'lucide-react';

interface CookieConsentBannerProps {
  setCurrentTab: (tab: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ setCurrentTab }) => {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('cookie_consent_status');
    }
    return true;
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent_status', 'accepted_all');
    localStorage.setItem('cookie_preferences', JSON.stringify({ analytics: true, advertising: true }));
    setShowBanner(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('cookie_consent_status', 'essential_only');
    localStorage.setItem('cookie_preferences', JSON.stringify({ analytics: false, advertising: false }));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent_status', 'custom');
    localStorage.setItem('cookie_preferences', JSON.stringify({ analytics: analyticsConsent, advertising: advertisingConsent }));
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      role="region" 
      aria-label="Aviso de Consentimiento de Cookies GDPR y Google AdSense"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-lg border-t border-indigo-500/30 text-slate-200 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Info Column */}
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs sm:text-sm">
            <Cookie className="w-4 h-4 text-amber-300" />
            <span>Aviso de Cookies y Privacidad de Google AdSense (GDPR / CCPA)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Utilizamos cookies propias necesarias para recordar tus cálculos y cookies de terceros (incluido Google AdSense) para personalizar contenido publicitario y analizar el tráfico. Puedes aceptar todas o personalizar tu consentimiento según tus preferencias.
          </p>
        </div>

        {/* Custom Preferences Modal overlay */}
        {showPreferences && (
          <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 mt-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">Configurar Preferencias de Privacidad</span>
              <button 
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <div className="font-bold text-white">Cookies Esenciales y Técnicas</div>
                  <div className="text-[11px] text-slate-400">Guardar diario TCC-I y horas del cálculo local. (Siempre activas)</div>
                </div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950 px-2 py-1 rounded">Obligatorias</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                <label htmlFor="ads-consent-checkbox" className="cursor-pointer flex-1 mr-2">
                  <div className="font-bold text-white">Cookies de Anuncios Personalizados (Google AdSense)</div>
                  <div className="text-[11px] text-slate-400">Anuncios relevantes basados en navegación mediante red de socios de Google.</div>
                </label>
                <input 
                  id="ads-consent-checkbox"
                  aria-label="Cookies de Anuncios Personalizados (Google AdSense)"
                  type="checkbox" 
                  checked={advertisingConsent}
                  onChange={(e) => setAdvertisingConsent(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
              >
                Guardar Selección
              </button>
            </div>
          </div>
        )}

        {/* Buttons Action Group */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => {
              setCurrentTab('privacy');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs text-indigo-400 hover:underline px-2 py-1.5 mr-auto lg:mr-0 font-medium"
          >
            Política de Privacidad
          </button>

          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Configurar</span>
          </button>

          <button
            onClick={handleRejectNonEssential}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
          >
            Solo Necesarias
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Aceptar Todas</span>
          </button>
        </div>

      </div>
    </div>
  );
};
