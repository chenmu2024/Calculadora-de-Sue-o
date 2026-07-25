import React, { useState, useEffect } from 'react';
import { FileText, Printer, Check, Sparkles, Moon, Sun, Coffee, ShieldCheck, Clock, Download, Share2, X, Activity, UserCheck } from 'lucide-react';

interface SleepSummaryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SleepSummaryReportModal: React.FC<SleepSummaryReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [favoritesStr, setFavoritesStr] = useState<string>('07:00 AM (Despertar Recomendado - 5 Ciclos)');
  const [recentLogs, setRecentLogs] = useState<{ date: string; rating: number; groggy: boolean }[]>([]);
  const [chronotype, setChronotype] = useState<string>('No realizado (Predeterminado: Intermedio / Oso)');

  const reportDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  useEffect(() => {
    try {
      // 1. Favorites
      const storedFav = localStorage.getItem('sleep_calculator_favorites_v1');
      if (storedFav) {
        const parsed = JSON.parse(storedFav);
        if (parsed.length > 0) {
          setFavoritesStr(parsed.map((f: any) => `${f.label}: ${f.time}`).join(' | '));
        }
      }

      // 2. Morning Check-ins
      const storedLogs = localStorage.getItem('sueño_morning_checkins');
      if (storedLogs) {
        const parsed = JSON.parse(storedLogs);
        if (Array.isArray(parsed)) {
          setRecentLogs(parsed.slice(0, 5));
        }
      }

      // 3. Chronotype
      const storedChrono = localStorage.getItem('sueño_chronotype_result');
      if (storedChrono) {
        const parsed = JSON.parse(storedChrono);
        if (parsed?.name) {
          setChronotype(`${parsed.emoji || ''} Cronotipo ${parsed.name} (${parsed.summary || ''})`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `📋 INFORME MAESTRO DE SALUD DEL SUEÑO
----------------------------------------
📅 Fecha de Emisión: ${reportDate}
⏰ Horarios Favoritos: ${favoritesStr}
🧬 Cronotipo: ${chronotype}
☕ Hora Límite Cafeína: 14:00
🌡️ Entorno Ideal: 16-19°C, Oscuridad Total (<5 Lux)
----------------------------------------
Generado en CalculadoraDeSueño.es`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Content Header */}
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800">
          <div className="p-3 bg-amber-500/20 border border-amber-400/30 rounded-2xl text-amber-300 shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Informe Personalizado de Salud del Sueño</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generado el {reportDate} — Archivo de consulta y seguimiento personal.
            </p>
          </div>
        </div>

        {/* Report Body */}
        <div className="space-y-5 text-xs text-slate-300">
          {/* Section 1 */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4" />
              <span>1. Perfil de Sueño y Horarios Favoritos</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              Cálculo basado en <strong>ciclos Ultradianos de 90 minutos</strong> + 15 min de latencia media de adormecimiento:
            </p>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-200 font-medium">
              Horarios Registrados: <span className="text-amber-300 font-bold">{favoritesStr}</span>
            </div>
          </div>

          {/* Section 2: Chronotype & Circadian Rhythms */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="font-bold text-violet-300 flex items-center gap-1.5 text-sm">
              <UserCheck className="w-4 h-4" />
              <span>2. Cronotipo Circadiano</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-200">
              <span className="font-semibold text-violet-300">{chronotype}</span>
            </div>
          </div>

          {/* Section 3: Morning Energy History */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5 text-sm">
              <Activity className="w-4 h-4" />
              <span>3. Registro Reciente de Energía al Despertar</span>
            </div>
            {recentLogs.length === 0 ? (
              <p className="text-slate-400 italic">No hay registros matutinos recientes guardados.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recentLogs.map((log, idx) => (
                  <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span>{log.date}</span>
                    <span className="font-bold text-amber-300">
                      {log.rating}/5 {log.groggy ? '(Inercia)' : ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Stimulants & Environment */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="font-bold text-teal-300 flex items-center gap-1.5 text-sm">
              <Coffee className="w-4 h-4" />
              <span>4. Reglas Biológicas de Higiene del Sueño</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed">
              <li><strong>Límite Cafeína:</strong> 14:00 (o 8h antes de dormir) para evitar bloqueo de receptores de adenosina en sueño profundo.</li>
              <li><strong>Entorno Dormitorio:</strong> 16°C–19°C de temperatura, oscuridad absoluta (&lt;5 lux) y ventilación limpia.</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800 print:hidden">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-indigo-400" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Resumen'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-colors"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Imprimir / Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
