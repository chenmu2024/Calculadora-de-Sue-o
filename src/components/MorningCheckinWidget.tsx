import React, { useState, useEffect } from 'react';
import { Sun, Smile, Frown, Meh, Sparkles, Battery, BatteryCharging, CheckCircle, Calendar, RefreshCw, AlertCircle } from 'lucide-react';

interface CheckinLog {
  date: string;
  rating: number; // 1 to 5
  groggy: boolean; // inertia
  notes: string;
}

export const MorningCheckinWidget: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [groggy, setGroggy] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [logs, setLogs] = useState<CheckinLog[]>([]);
  const [savedToday, setSavedToday] = useState<boolean>(false);

  const todayStr = new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sueño_morning_checkins');
      if (stored) {
        const parsed: CheckinLog[] = JSON.parse(stored);
        setLogs(parsed);
        const hasToday = parsed.some(l => l.date === todayStr);
        if (hasToday) {
          setSavedToday(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [todayStr]);

  const handleSaveCheckin = (selectedRating: number) => {
    setRating(selectedRating);
    const newLog: CheckinLog = {
      date: todayStr,
      rating: selectedRating,
      groggy,
      notes
    };

    const updated = [newLog, ...logs.filter(l => l.date !== todayStr)].slice(0, 7);
    setLogs(updated);
    setSavedToday(true);
    try {
      localStorage.setItem('sueño_morning_checkins', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const getRatingFeedback = (val: number, isGroggy: boolean) => {
    if (val >= 4 && !isGroggy) {
      return {
        title: '¡Energía Óptima!',
        desc: 'Has despertado al final de un ciclo NREM/REM. Tu cuerpo está listo para el día. ¡Mantén esta rutina regular!',
        color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800'
      };
    }
    if (val >= 4 && isGroggy) {
      return {
        title: 'Ligera Inercia del Sueño',
        desc: 'Aunque descansaste bien, sientes pesadez al despertar. Bebe un vaso de agua e ilumina la habitación inmediatamente para frenar la melatonina.',
        color: 'text-amber-300 bg-amber-950/60 border-amber-800'
      };
    }
    if (val === 3) {
      return {
        title: 'Descanso Aceptable',
        desc: 'Tu sueño fue moderado. Intenta mantener tu hora de acostarte constante e intenta no tomar cafeína pasadas las 14:00.',
        color: 'text-indigo-300 bg-indigo-950/60 border-indigo-800'
      };
    }
    return {
      title: 'Interrupción de Ciclo / Inercia Elevada',
      desc: 'Es muy probable que la alarma sonara en medio de la fase de sueño profundo (Fase 3 o 4). Intenta ajustar tu hora de despertar 15-20 minutos para coincidir con el final de un ciclo de 90 minutos.',
      color: 'text-rose-300 bg-rose-950/60 border-rose-800'
    };
  };

  const ratingsData = [
    { level: 1, label: 'Agotado', icon: Frown, emoji: '😫', color: 'hover:bg-rose-900/40 text-rose-400' },
    { level: 2, label: 'Cansado', icon: Frown, emoji: '🥱', color: 'hover:bg-orange-900/40 text-orange-400' },
    { level: 3, label: 'Normal', icon: Meh, emoji: '😐', color: 'hover:bg-amber-900/40 text-amber-300' },
    { level: 4, label: 'Fresco', icon: Smile, emoji: '🙂', color: 'hover:bg-emerald-900/40 text-emerald-300' },
    { level: 5, label: 'Al 100%', icon: Sparkles, emoji: '⚡', color: 'hover:bg-emerald-800/50 text-emerald-200' },
  ];

  return (
    <section id="checkin-matutino" className="scroll-mt-20 my-10">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 border border-amber-400/30 rounded-2xl text-amber-300">
                <Sun className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>Registro Rápido Matutino</span>
                  <span className="text-xs font-semibold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Novedad
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Evalúa cómo te sientes hoy al despertar para identificar tu ritmo biológico ideal.
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Hoy: {todayStr}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Side */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-3">
                  ¿Con qué nivel de energía te has despertado hoy?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ratingsData.map((item) => (
                    <button
                      key={item.level}
                      onClick={() => handleSaveCheckin(item.level)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                        rating === item.level
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-lg scale-105'
                          : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
                      } ${item.color}`}
                    >
                      <span className="text-2xl mb-1">{item.emoji}</span>
                      <span className="text-[11px] font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/60">
                <input
                  type="checkbox"
                  id="groggy-check"
                  checked={groggy}
                  onChange={(e) => {
                    setGroggy(e.target.checked);
                    if (rating !== null) handleSaveCheckin(rating);
                  }}
                  className="w-4 h-4 rounded text-amber-400 focus:ring-amber-400 bg-slate-900 border-slate-700"
                />
                <label htmlFor="groggy-check" className="text-xs text-slate-300 cursor-pointer select-none">
                  <span className="font-semibold text-slate-100">Siento Inercia del Sueño</span> (pesadez mental, mareo o lentitud durante los primeros 20 min).
                </label>
              </div>

              {rating !== null && (
                <div className="animate-in fade-in duration-300">
                  {(() => {
                    const fb = getRatingFeedback(rating, groggy);
                    return (
                      <div className={`p-4 rounded-2xl border ${fb.color} space-y-1.5`}>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <BatteryCharging className="w-4 h-4" />
                          <span>Diagnóstico: {fb.title}</span>
                        </div>
                        <p className="text-xs leading-relaxed opacity-90">{fb.desc}</p>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* History / Weekly View Side */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Battery className="w-4 h-4 text-amber-300" />
                  <span>Historial Reciente (Últimos Días)</span>
                </span>
                {savedToday && (
                  <span className="text-[10px] bg-emerald-900/60 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Registrado hoy
                  </span>
                )}
              </div>

              {logs.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <span>Aún no has guardado registros. Selecciona tu estado de ánimo arriba para empezar tu seguimiento.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-300">{log.date}</span>
                        {log.groggy && (
                          <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800 font-medium">
                            Inercia
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 font-bold text-amber-300">
                        <span>{ratingsData.find(r => r.level === log.rating)?.emoji}</span>
                        <span>{log.rating}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
