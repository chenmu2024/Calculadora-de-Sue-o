import React, { useState, useEffect } from 'react';
import { Clock, Moon, Sun, Play, Calendar, Zap, Info, ShieldCheck, Sparkles, CheckCircle2, Sliders, Share2, Eye, RefreshCw, Bookmark, Star, Printer, Trash2 } from 'lucide-react';
import { CalculationMode, SleepCycleResult } from '../types';
import { calculateSleepTimes, downloadCalendarEvent, getGoogleCalendarUrl } from '../utils/sleepCalculations';
import { CustomTimePicker } from './CustomTimePicker';

interface SleepCalculatorWidgetProps {
  onSelectResultForVisualizer?: (result: SleepCycleResult) => void;
}

export const SleepCalculatorWidget: React.FC<SleepCalculatorWidgetProps> = ({
  onSelectResultForVisualizer
}) => {
  const [mode, setMode] = useState<CalculationMode>('wake_time');
  const [timeInput, setTimeInput] = useState<string>('07:00');
  const [latencyMinutes, setLatencyMinutes] = useState<number>(15);
  const [cycleLengthMinutes, setCycleLengthMinutes] = useState<number>(90);
  const [is24HourFormat, setIs24HourFormat] = useState<boolean>(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [liveNowTime, setLiveNowTime] = useState<string>('');
  
  const [results, setResults] = useState<SleepCycleResult[]>([]);
  const [copiedTime, setCopiedTime] = useState<string | null>(null);
  const [sharedNotice, setSharedNotice] = useState<string | null>(null);
  const [favoriteNotice, setFavoriteNotice] = useState<string | null>(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<{ id: string; label: string; mode: CalculationMode; time: string; latency: number }[]>(() => {
    try {
      const saved = localStorage.getItem('sleep_calculator_favorites_v1');
      return saved ? JSON.parse(saved) : [
        { id: '1', label: 'Días Laborables', mode: 'wake_time', time: '07:00', latency: 15 },
        { id: '2', label: 'Fines de Semana', mode: 'wake_time', time: '09:00', latency: 15 }
      ];
    } catch {
      return [];
    }
  });

  const saveFavoritesToStorage = (updated: { id: string; label: string; mode: CalculationMode; time: string; latency: number }[]) => {
    setFavorites(updated);
    try {
      localStorage.setItem('sleep_calculator_favorites_v1', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddCurrentToFavorites = () => {
    const labelName = prompt('Ingresa un nombre para este horario favorito:', mode === 'wake_time' ? `Despertar a las ${timeInput}` : `Acostarse a las ${timeInput}`);
    if (!labelName) return;

    const newItem = {
      id: Date.now().toString(),
      label: labelName,
      mode,
      time: timeInput,
      latency: latencyMinutes
    };

    const updated = [newItem, ...favorites.filter(f => f.label !== labelName)];
    saveFavoritesToStorage(updated);
    setFavoriteNotice('¡Horario guardado en tus favoritos!');
    setTimeout(() => setFavoriteNotice(null), 2500);
  };

  const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favorites.filter(f => f.id !== id);
    saveFavoritesToStorage(updated);
  };

  const handleLoadFavorite = (fav: { mode: CalculationMode; time: string; latency: number }) => {
    setMode(fav.mode);
    setTimeInput(fav.time);
    setLatencyMinutes(fav.latency);
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  // Live ticking clock for 'sleep_now' mode
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveNowTime(
        now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Recalculate whenever mode, timeInput, latencyMinutes, or cycleLengthMinutes changes
  useEffect(() => {
    const computed = calculateSleepTimes(mode, timeInput, latencyMinutes, cycleLengthMinutes);
    setResults(computed);
  }, [mode, timeInput, latencyMinutes, cycleLengthMinutes]);

  const handlePresetTime = (t: string) => {
    setTimeInput(t);
  };

  const handleRecalculateNow = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    setTimeInput(`${hours}:${mins}`);
    const computed = calculateSleepTimes('sleep_now', `${hours}:${mins}`, latencyMinutes, cycleLengthMinutes);
    setResults(computed);
  };

  const handleCopyTime = (timeStr: string) => {
    navigator.clipboard.writeText(timeStr);
    setCopiedTime(timeStr);
    setTimeout(() => setCopiedTime(null), 2000);
  };

  const handleShareResult = async (res: SleepCycleResult) => {
    const shareText = `⏰ Calculé mi ciclo de sueño en xn--calculadoradesueo-uxb.org:\nIdeal ${mode === 'wake_time' ? 'acostarme' : 'despertarme'} a las ${res.time} (${res.cycles} ciclos, ${res.hoursFormatted}). ¡Pruébalo gratis!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Calculadora de Sueño - Mi Horario Ideal',
          text: shareText,
          url: 'https://xn--calculadoradesueo-uxb.org/'
        });
        return;
      } catch (e) {
        // Fallback to clipboard if share cancelled
      }
    }

    navigator.clipboard.writeText(shareText);
    setSharedNotice(res.time);
    setTimeout(() => setSharedNotice(null), 2500);
  };

  return (
    <section id="calculadora-principal" className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Glow Overlay */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Calculadora de Sueño Gratis Online - Oficial 2026</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          La mejor <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-amber-200 bg-clip-text text-transparent">Calculadora de Sueño</span>
        </h1>
        
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          ¡<strong className="text-white font-semibold">Calcula tu ciclo de sueño</strong> y despiértate sin cansancio ni inercia! Sincroniza la hora ideal para acostarte o despertarte con tu reloj biológico.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-3xl mx-auto relative z-10">
        <button
          id="tab-mode-wake"
          onClick={() => {
            setMode('wake_time');
            setTimeInput('07:00');
          }}
          className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-medium text-sm transition-all text-left ${
            mode === 'wake_time'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
          }`}
        >
          <Sun className="w-5 h-5 text-amber-300 shrink-0" />
          <div>
            <div className="font-bold">Quiero despertarme a...</div>
            <div className="text-xs opacity-80">Calcula a qué hora acostarte</div>
          </div>
        </button>

        <button
          id="tab-mode-bed"
          onClick={() => {
            setMode('bed_time');
            setTimeInput('23:00');
          }}
          className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-medium text-sm transition-all text-left ${
            mode === 'bed_time'
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
          }`}
        >
          <Moon className="w-5 h-5 text-indigo-300 shrink-0" />
          <div>
            <div className="font-bold">Quiero irme a dormir a...</div>
            <div className="text-xs opacity-80">Calcula a qué hora despertar</div>
          </div>
        </button>

        <button
          id="tab-mode-now"
          onClick={() => {
            setMode('sleep_now');
            handleRecalculateNow();
          }}
          className={`flex items-center justify-center gap-2.5 p-4 rounded-2xl font-medium text-sm transition-all text-left ${
            mode === 'sleep_now'
              ? 'bg-gradient-to-r from-violet-600 to-emerald-600 text-white shadow-lg shadow-violet-600/25 border border-emerald-400/30'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
          }`}
        >
          <Zap className="w-5 h-5 text-emerald-300 shrink-0 animate-pulse" />
          <div>
            <div className="font-bold">Dormirme ahora mismo</div>
            <div className="text-xs opacity-80">Calcula tu despertar inmediato</div>
          </div>
        </button>
      </div>

      {/* Favorites / Saved Schedules Bar */}
      <div className="max-w-xl mx-auto bg-slate-900/90 border border-indigo-900/50 rounded-2xl p-3.5 mb-6 shadow-md relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-amber-300" />
            <span>Tus Horarios Guardados (Favoritos):</span>
          </span>
          <button
            onClick={handleAddCurrentToFavorites}
            className="text-[11px] bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Star className="w-3 h-3 text-amber-300" />
            <span>Guardar Actual</span>
          </button>
        </div>

        {favoriteNotice && (
          <div className="text-[11px] text-emerald-400 font-semibold mb-2 bg-emerald-950/60 p-1.5 rounded border border-emerald-800/60 text-center">
            {favoriteNotice}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {favorites.length === 0 ? (
            <span className="text-xs text-slate-400 italic">No tienes horarios guardados. ¡Guarda tus horas habituales de despertarte!</span>
          ) : (
            favorites.map((fav) => (
              <div
                key={fav.id}
                onClick={() => handleLoadFavorite(fav)}
                className="group flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-xl text-xs font-medium border border-slate-700/80 cursor-pointer transition-all"
              >
                <span className="text-amber-300">★</span>
                <span>{fav.label} ({fav.time})</span>
                <button
                  onClick={(e) => handleRemoveFavorite(fav.id, e)}
                  className="text-slate-500 hover:text-rose-400 ml-1"
                  title="Eliminar favorito"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input Control Box */}
      <div className="max-w-xl mx-auto bg-slate-800/90 border border-slate-700/70 rounded-2xl p-6 mb-8 shadow-xl relative z-10">
        {mode !== 'sleep_now' ? (
          <div>
            <label className="block text-slate-200 text-sm font-semibold mb-2">
              {mode === 'wake_time' ? '¿A qué hora deseas despertarte?' : '¿A qué hora piensas acostarte?'}
            </label>
            <div className="mb-4">
              <CustomTimePicker
                value={timeInput}
                onChange={(newVal) => setTimeInput(newVal)}
                id="time-picker-input"
              />
            </div>

            {/* Quick Time Presets */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-xs text-slate-400 font-medium">Horas populares:</span>
              {(mode === 'wake_time' ? ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30'] : ['22:00', '22:30', '23:00', '23:30', '00:00', '00:30']).map((pt) => (
                <button
                  key={pt}
                  onClick={() => handlePresetTime(pt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    timeInput === pt ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-2 mb-4">
            <div className="inline-flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-700 text-indigo-300 text-sm font-bold mb-3">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Hora actual: {liveNowTime || new Date().toLocaleTimeString('es-ES')}</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Calculando horas ideales para despertar si apagas la luz en este instante con <strong className="text-amber-300 font-semibold">{latencyMinutes} min</strong> de latencia inicial.
            </p>
            <button
              onClick={handleRecalculateNow}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Actualizar hora actual</span>
            </button>
          </div>
        )}

        {/* Latency Adjuster */}
        <div className="pt-4 border-t border-slate-700/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Tiempo para quedarte dormido (Latencia SOL):
            </span>
            <span className="text-xs font-bold text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
              {latencyMinutes} minutos
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {[5, 15, 25, 35].map((mins) => (
              <button
                key={mins}
                onClick={() => setLatencyMinutes(mins)}
                className={`py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  latencyMinutes === mins
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {mins} min {mins === 15 ? '(Promedio)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Settings Toggle Button */}
        <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between">
          <button
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdvancedSettings ? 'Ocultar Ajustes Avanzados' : 'Ajustes Avanzados (Duración de Ciclo & Formato)'}</span>
          </button>

          <button
            onClick={() => setIs24HourFormat(!is24HourFormat)}
            className="text-[11px] bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 font-semibold hover:text-white"
          >
            Formato: {is24HourFormat ? '24 Horas' : '12 Horas (AM/PM)'}
          </button>
        </div>

        {/* Advanced Settings Expandable Panel */}
        {showAdvancedSettings && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-700 space-y-3 text-xs text-slate-300">
            <div>
              <label className="block text-slate-200 font-bold mb-1">
                Duración Personalizada de Ciclo (Por defecto: 90 minutos)
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[80, 85, 90, 95, 100].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setCycleLengthMinutes(mins)}
                    className={`py-1.5 rounded text-xs font-semibold ${
                      cycleLengthMinutes === mins
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {mins}m {mins === 90 ? '★' : ''}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Ajusta la duración si conoces tu ritmo ultradiano personal (ej. madrugadores ~85m, nocturnos ~95m).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="text-center mb-6 relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {mode === 'wake_time' ? 'Deberías acostarte a una de estas horas:' : 'Deberías despertarte a una de estas horas:'}
        </h2>
        <p className="text-xs text-slate-400">
          Calculado con latencia de {latencyMinutes} min y ciclos ultradianos de {cycleLengthMinutes} minutos.
        </p>
      </div>

      {/* Results Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 relative z-10">
        {results.map((res, idx) => {
          const isOptimal = res.qualityTag === 'optimal';
          const isRecommended = res.qualityTag === 'recommended';
          const isPrimary = isOptimal || isRecommended;
          const displayTime = is24HourFormat ? res.time24 : res.time;

          return (
            <div
              key={idx}
              className={`rounded-2xl p-5 transition-all relative flex flex-col justify-between ${
                isOptimal
                  ? 'bg-gradient-to-b from-indigo-950/90 to-slate-900 border-2 border-emerald-500/80 shadow-xl shadow-emerald-950/40 scale-[1.02]'
                  : isRecommended
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-indigo-500/80 shadow-xl'
                  : 'bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800'
              }`}
            >
              {isPrimary && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-md ${
                  isOptimal ? 'bg-emerald-600' : 'bg-indigo-600'
                }`}>
                  {isOptimal ? '★ Mejor Opción (5 Ciclos)' : '★ Máximo Descanso (6 Ciclos)'}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3 pt-1">
                  <span className={`text-3xl font-black tracking-tight ${
                    isOptimal ? 'text-emerald-300' : isRecommended ? 'text-indigo-300' : 'text-white'
                  }`}>
                    {displayTime}
                  </span>

                  <button
                    onClick={() => handleCopyTime(displayTime)}
                    className="text-xs bg-slate-900/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors"
                  >
                    {copiedTime === displayTime ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <span>Copiar</span>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    {res.hoursFormatted} de sueño
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {res.cycles} ciclos
                  </span>
                </div>

                {/* Vitality Progress Meter */}
                <div className="mb-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Nivel de Energía Matutino:</span>
                    <span className={`font-bold ${
                      res.vitalityScore && res.vitalityScore >= 90 ? 'text-emerald-400' : res.vitalityScore && res.vitalityScore >= 70 ? 'text-indigo-300' : 'text-amber-400'
                    }`}>
                      {res.vitalityScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        res.vitalityScore && res.vitalityScore >= 90 ? 'bg-emerald-400' : res.vitalityScore && res.vitalityScore >= 70 ? 'bg-indigo-500' : 'bg-amber-400'
                      }`}
                      style={{ width: `${res.vitalityScore}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between gap-1.5 flex-wrap">
                <div className="flex items-center gap-1">
                  <a
                    href={getGoogleCalendarUrl(
                      `Alarma Ciclo de Sueño: ${displayTime}`,
                      res.time24,
                      `Recordatorio de dormir/despertar para completar ${res.cycles} ciclos (${res.hoursFormatted})`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-indigo-100 font-semibold bg-indigo-950/80 hover:bg-indigo-900 px-2 py-1.5 rounded-lg border border-indigo-800 transition-colors"
                    title="Añadir evento a Google Calendar"
                  >
                    <Calendar className="w-3 h-3 text-amber-300" />
                    <span>GCalendar</span>
                  </a>

                  <button
                    onClick={() => downloadCalendarEvent(
                      `Alarma Ciclo de Sueño: ${displayTime}`,
                      res.time24,
                      `Recordatorio de dormir/despertar para completar ${res.cycles} ciclos (${res.hoursFormatted})`
                    )}
                    className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white font-semibold bg-slate-900/80 hover:bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-700 transition-colors"
                    title="Descargar archivo iCal (.ics) para iCal/Outlook"
                  >
                    <span>.iCal</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleShareResult(res)}
                    className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-900/80 px-2 py-1.5 rounded-lg border border-slate-700"
                    title="Compartir resultado"
                  >
                    <Share2 className="w-3 h-3 text-amber-300" />
                    <span>{sharedNotice === res.time ? '¡Listo!' : 'Compartir'}</span>
                  </button>

                  {onSelectResultForVisualizer && (
                    <button
                      onClick={() => onSelectResultForVisualizer(res)}
                      className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-200 font-semibold underline ml-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Ver Fases</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Personalized Sleep Routine Timeline Box */}
      {results.length > 0 && (
        <div className="mt-8 bg-slate-950/90 border border-indigo-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                Tu Cronograma Recomendado de Higiene Nocturna
              </h3>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold px-2.5 py-1 rounded-full">
                Basado en 5 Ciclos (7.5h)
              </span>
              <button
                onClick={handlePrintSchedule}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 transition-colors print:hidden"
                title="Imprimir o Guardar en PDF"
              >
                <Printer className="w-3.5 h-3.5 text-amber-300" />
                <span>Imprimir / PDF</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Para garantizar que te duermas exactamente a tu hora calculada y aproveches al máximo tus ciclos de sueño, te recomendamos seguir este protocolo biológico:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-amber-400 font-bold mb-1 flex items-center gap-1">
                <span>☕ Ultimo Café</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Al menos 8 horas antes de acostarte para permitir que el hígado metabolice la cafeína.
              </p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-amber-300 font-bold mb-1 flex items-center gap-1">
                <span>🍽️ Última Cena</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Cena ligera 3 horas antes para evitar reflujo y picos de insulina que fragmentan la fase REM.
              </p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-indigo-400 font-bold mb-1 flex items-center gap-1">
                <span>📱 Modo Noche</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Apaga pantallas o activa filtro azul 60 min antes para estimular la melatonina natural.
              </p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="text-violet-300 font-bold mb-1 flex items-center gap-1">
                <span>🛌 En la Cama</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Acuéstate {latencyMinutes} min antes de tu hora ideal para cumplir la latencia de adormecimiento.
              </p>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/40">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1">
                <span>⏰ Despertar Vivo</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">
                Alarma ajustada al final exacto del ciclo ultradiano. ¡Cero inercia ni pesadez!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
