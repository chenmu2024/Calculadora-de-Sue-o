import React, { useState } from 'react';
import { Users, Clock, CheckCircle2, Sparkles, AlertTriangle, Lightbulb, Calendar, ArrowRight, RefreshCw, Sliders, Zap, Activity, HeartPulse, Brain, Heart, Layers, Share2, Copy, Check } from 'lucide-react';
import { AGE_GROUPS } from '../data/sleepData';
import { AgeGroupConfig } from '../types';
import { downloadCalendarEvent, getGoogleCalendarUrl } from '../utils/sleepCalculations';

interface AgeCalculatorViewProps {
  onSyncToMainCalculator?: (mode: 'wake_time' | 'bed_time', time: string) => void;
}

export const AgeCalculatorView: React.FC<AgeCalculatorViewProps> = ({ onSyncToMainCalculator }) => {
  const [selectedAgeId, setSelectedAgeId] = useState<string>('adult');
  const [inputExactAge, setInputExactAge] = useState<string>('28');
  const [ageWarning, setAgeWarning] = useState<string | null>(null);
  const [chronotype, setChronotype] = useState<'owl' | 'lark' | 'neutral'>('neutral');

  const [targetWakeTime, setTargetWakeTime] = useState<string>('07:00');
  const [copyDiagnosisSuccess, setCopyDiagnosisSuccess] = useState<boolean>(false);

  // Load saved preferences
  React.useEffect(() => {
    try {
      const savedAge = localStorage.getItem('calc_exactAge');
      if (savedAge) {
        handleExactAgeChange(savedAge, true); // true = avoid saving during load
      }
    } catch (e) {
      console.warn("Could not read from local storage");
    }
  }, []);

  const handleShareDiagnosis = () => {
    const text = `📊 Mi Recomendación de Sueño (${selectedGroup.name} - ${inputExactAge} años):\n` +
      `• Rango orientativo: ${adjustedMin.toFixed(1)} - ${adjustedMax.toFixed(1)} horas\n` +
      `• Horario sugerido: Acostarse ${schedule.bedStr} ➔ Despertar ${schedule.wakeStr}\n` +
      `Calcula tu horario ideal en: ${window.location.href}`;

    if (navigator.share) {
      navigator.share({
        title: `Recomendación de Sueño - ${selectedGroup.name}`,
        text: text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopyDiagnosisSuccess(true);
      setTimeout(() => setCopyDiagnosisSuccess(false), 2500);
    }
  };

  // Auto detect group if exact age is typed
  const handleExactAgeChange = (val: string, skipSave = false) => {
    setInputExactAge(val);
    if (!skipSave) {
      try { localStorage.setItem('calc_exactAge', val); } catch (e) {}
    }

    const num = parseFloat(val);
    if (isNaN(num)) {
      setAgeWarning(null);
      return;
    }

    if (num < 0 || num > 120) {
      setAgeWarning('Por favor, ingresa una edad válida (0-120 años).');
    } else {
      setAgeWarning(null);
    }

    if (num < 1) {
      setSelectedAgeId('baby');
    } else if (num >= 1 && num < 3) {
      setSelectedAgeId('toddler');
    } else if (num >= 3 && num < 6) {
      setSelectedAgeId('preschool');
    } else if (num >= 6 && num < 13) {
      setSelectedAgeId('child');
    } else if (num >= 13 && num < 18) {
      setSelectedAgeId('teen');
    } else if (num >= 18 && num < 65) {
      setSelectedAgeId('adult');
    } else {
      setSelectedAgeId('senior');
    }
  };

  const selectedGroup = AGE_GROUPS.find((g) => g.id === selectedAgeId) || AGE_GROUPS[5];

  const adjustedMin = selectedGroup.recHoursMin;
  const adjustedMax = selectedGroup.recHoursMax;



  // Calculate recommended bed/wake times based on chronotype offset
  const getRecommendedSchedule = () => {
    const avgHours = (adjustedMin + adjustedMax) / 2;
    let baseBedHour = 23; // 11 PM
    let baseBedMin = 0;

    if (chronotype === 'lark') {
      baseBedHour = 21; // 9:30 PM
      baseBedMin = 30;
    } else if (chronotype === 'owl') {
      baseBedHour = 0; // 12:30 AM
      baseBedMin = 30;
    }

    const bedDate = new Date();
    bedDate.setHours(baseBedHour, baseBedMin, 0, 0);

    const wakeDate = new Date(bedDate.getTime() + avgHours * 60 * 60 * 1000);

    const bedStr = bedDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    const wakeStr = wakeDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
    const wake24 = wakeDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

    return {
      bedStr,
      wakeStr,
      wake24,
      avgHours
    };
  };

  const schedule = getRecommendedSchedule();

  return (
    <div id="calculadora-horas-de-sueno" className="space-y-10 py-6">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>Calculadora de Horas de Sueño por Edad</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Calculadora de Horas de Sueño Recomendadas
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Consulta un <strong className="text-white font-semibold">rango orientativo de horas de sueño</strong> según la edad. Las necesidades individuales varían y esta herramienta no sustituye una valoración clínica.
        </p>
      </div>

      {/* Interactive Age Locator Input & Preset Group Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              1. Selecciona o Ingresa tu Edad Exacta
            </h2>
            <p className="text-xs text-slate-400">
              Escribe tu edad en años o selecciona directamente tu etapa biológica.
            </p>
          </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <label htmlFor="exact-age-input" className="text-xs font-bold text-indigo-300 whitespace-nowrap cursor-pointer">
                  Edad exacta (años):
                </label>
                <input
                  id="exact-age-input"
                  aria-label="Edad exacta en años"
                  type="number"
                  min="0"
                  max="120"
                  value={inputExactAge}
                  onChange={(e) => handleExactAgeChange(e.target.value)}
                  className="bg-slate-950 border border-indigo-500/40 rounded-xl px-4 py-2 text-white font-extrabold text-center w-24 text-base focus:outline-none focus:border-indigo-400"
                  placeholder="Ej. 28"
                />
              </div>
              {ageWarning && (
                <span className="text-xs text-amber-400 mt-2 font-medium bg-amber-950/40 px-2 py-1 rounded">
                  {ageWarning}
                </span>
              )}
            </div>
        </div>

        {/* Age Group Quick Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {AGE_GROUPS.map((group) => {
            const isSelected = group.id === selectedAgeId;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedAgeId(group.id);
                  if (group.id === 'baby') setInputExactAge('0.5');
                  else if (group.id === 'toddler') setInputExactAge('2');
                  else if (group.id === 'preschool') setInputExactAge('4');
                  else if (group.id === 'child') setInputExactAge('9');
                  else if (group.id === 'teen') setInputExactAge('15');
                  else if (group.id === 'adult') setInputExactAge('28');
                  else if (group.id === 'senior') setInputExactAge('68');
                }}
                className={`p-4 rounded-2xl text-center border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-600 to-violet-600 text-white border-indigo-400 shadow-xl shadow-indigo-600/30 font-bold scale-[1.03]'
                    : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 border-slate-800'
                }`}
              >
                <div className="text-[11px] font-semibold text-indigo-200 mb-1">{group.ageRange}</div>
                <div className="text-sm font-extrabold truncate">{group.name.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Detailed Result & Range Bar Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Estimación Orientativa por Edad
              </span>
              <button
                type="button"
                onClick={handleShareDiagnosis}
                className="ml-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 px-2.5 py-1 rounded-full border border-amber-700/60 transition-colors"
                title="Compartir estimación"
              >
                {copyDiagnosisSuccess ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3 text-amber-300" />
                    <span>Compartir Estimación</span>
                  </>
                )}
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Calcular horas de sueño recomendadas: Etapa {selectedGroup.name}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Rango de edad correspondiente: <strong className="text-slate-200">{selectedGroup.ageRange}</strong>
            </p>
          </div>

          <div className="bg-indigo-950/90 border border-indigo-500/50 rounded-2xl p-5 text-center min-w-[260px] shadow-xl">
            <div className="text-xs text-slate-300 font-medium mb-1">Horas Diarias Recomendadas:</div>
            <div className="text-3xl font-black text-amber-300 tracking-tight">
              {adjustedMin.toFixed(1)} - {adjustedMax.toFixed(1)} Horas
            </div>
            <div className="text-xs text-indigo-200 font-semibold mt-1">
              Rango general por grupo de edad; la necesidad personal puede variar.
            </div>
          </div>
        </div>

        {/* Visual Sleep Range Gauge */}
        <div className="my-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Rango General de Referencia:</span>
            <span className="text-amber-300 font-black">Rango orientativo: {adjustedMin.toFixed(1)}h - {adjustedMax.toFixed(1)}h</span>
          </div>
          
          <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden flex relative">
            {/* Below recommended */}
            <div style={{ width: `${(adjustedMin / 16) * 100}%` }} className="bg-amber-500/30 h-full border-r border-slate-700 flex items-center justify-center text-[9px] text-amber-300 font-bold">
              Insuficiente (&lt;{adjustedMin.toFixed(1)}h)
            </div>
            {/* Recommended range */}
            <div style={{ width: `${((adjustedMax - adjustedMin) / 16) * 100}%` }} className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full flex items-center justify-center text-[10px] text-white font-black shadow-inner">
              RANGO ORIENTATIVO ({adjustedMin.toFixed(1)}h-{adjustedMax.toFixed(1)}h)
            </div>
            {/* Above recommended */}
            <div className="flex-1 bg-violet-500/30 h-full flex items-center justify-center text-[9px] text-violet-300 font-bold">
              Por encima del rango (&gt;{adjustedMax.toFixed(1)}h)
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 my-6">
          <h3 className="text-sm sm:text-base font-extrabold text-white mb-2">
            Sobre las fases del sueño
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            La proporción de sueño ligero, profundo y REM cambia con la edad y también de una noche a otra. Esta calculadora no mide fases del sueño ni asigna porcentajes individuales; para medirlas se requieren dispositivos o estudios específicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Importancia Fisiológica en esta Etapa
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
              {selectedGroup.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Recomendaciones y Hábitos Específicos
            </h3>
            <ul className="space-y-2.5">
              {selectedGroup.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Chronotype Schedule Generator */}
        <div className="mt-8 pt-6 border-t border-slate-800 bg-slate-950/80 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-300" />
              2. Ejemplo de Horario según tu Preferencia
            </h3>
            <span className="text-xs text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800 font-semibold">
              Preferencia horaria orientativa
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Elige una preferencia matutina, neutra o vespertina para generar un ejemplo de horario usando el punto medio del rango de horas recomendado.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setChronotype('lark')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                chronotype === 'lark' ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>🌅 Alondra Mañanera</span>
              </div>
              <div className="text-xs opacity-80 mt-1">Preferencia por actividad y sueño más tempranos.</div>
            </button>

            <button
              onClick={() => setChronotype('neutral')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                chronotype === 'neutral' ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md ring-1 ring-indigo-500' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>🐻 Intermedio (Oso)</span>
              </div>
              <div className="text-xs opacity-80 mt-1">Preferencia intermedia, sin un desplazamiento marcado hacia mañana o noche.</div>
            </button>

            <button
              onClick={() => setChronotype('owl')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                chronotype === 'owl' ? 'bg-violet-950/80 border-violet-500 text-violet-200 shadow-md ring-1 ring-violet-500' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>🦉 Búho Nocturno</span>
              </div>
              <div className="text-xs opacity-80 mt-1">Preferencia por actividad y sueño más tardíos.</div>
            </button>
          </div>

          {/* Generated Ideal Schedule Box */}
          <div className="bg-gradient-to-r from-indigo-950/90 to-slate-900 border border-indigo-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs text-indigo-300 font-bold mb-1">
                Ejemplo de horario para {selectedGroup.name} ({chronotype === 'lark' ? 'Alondra' : chronotype === 'owl' ? 'Búho' : 'Estándar'}):
              </div>
              <div className="flex items-center gap-3 text-white font-extrabold text-lg sm:text-xl">
                <span className="text-indigo-300">🌙 Acostarse: {schedule.bedStr}</span>
                <span className="text-slate-500">➔</span>
                <span className="text-emerald-300">☀️ Despertar: {schedule.wakeStr}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Duración usada para el ejemplo: <strong className="text-white">{schedule.avgHours.toFixed(1)} horas</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 flex-wrap">
              <a
                href={getGoogleCalendarUrl(
                  `Alarma Recomendada (${selectedGroup.name})`,
                  schedule.wake24,
                  `Recordatorio de despertar para ${selectedGroup.name}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-indigo-950/90 hover:bg-indigo-900 text-indigo-200 font-bold text-xs flex items-center gap-1.5 border border-indigo-700 transition-colors"
                title="Añadir a Google Calendar"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>GCalendar</span>
              </a>

              <button
                onClick={() => {
                  downloadCalendarEvent(
                    `Alarma Recomendada (${selectedGroup.name})`,
                    schedule.wake24,
                    `Recordatorio de despertar biológico para ${selectedGroup.name}`
                  );
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Descargar archivo iCal (.ics)"
              >
                <span>.iCal</span>
              </button>

              {onSyncToMainCalculator && (
                <button
                  onClick={() => {
                    onSyncToMainCalculator('wake_time', schedule.wake24);
                    document.getElementById('calculadora-principal')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Sincronizar</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Reverse Bedtime Matrix for Target Wake Time */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Calculadora Inversa: Si tienes que despertarte a una hora específica
                </h3>
                <p className="text-[11px] text-slate-400">
                  Ingresa la hora en la que te levantas (colegio, trabajo, biberón) para calcular las horas de ir a la cama adaptadas a {selectedGroup.name}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="target-wake-time-input" className="text-xs font-bold text-slate-300 cursor-pointer">Hora Despertar:</label>
                <input
                  id="target-wake-time-input"
                  aria-label="Hora exacta de despertar"
                  type="time"
                  value={targetWakeTime}
                  onChange={(e) => setTargetWakeTime(e.target.value)}
                  className="bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-xs text-emerald-300 font-extrabold focus:outline-none"
                />
              </div>
            </div>

            {/* Matrix calculated times */}
            {(() => {
              const [h, m] = targetWakeTime.split(':').map(Number);
              const wakeDate = new Date();
              wakeDate.setHours(h || 7, m || 0, 0, 0);

              // Three examples that stay inside the general recommended range.
              const latencyMin = 15; // configurable planning assumption

              const calcBedObj = (hoursNeeded: number) => {
                const bDate = new Date(wakeDate.getTime() - (hoursNeeded * 60 + latencyMin) * 60 * 1000);
                const time12 = bDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
                const time24 = bDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
                return { time12, time24 };
              };

              const midHours = (adjustedMin + adjustedMax) / 2;
              const bedOpt = calcBedObj(adjustedMax);
              const bedStd = calcBedObj(midHours);
              const bedMin = calcBedObj(adjustedMin);

              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="text-emerald-400 font-bold mb-1 flex items-center justify-between">
                        <span>Extremo superior del rango</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded">{adjustedMax.toFixed(1)}h</span>
                      </div>
                      <div className="text-lg font-black text-white">{bedOpt.time12}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Ejemplo calculado usando el extremo superior del rango general de horas.</div>
                    </div>
                    {onSyncToMainCalculator && (
                      <button
                        type="button"
                        onClick={() => {
                          onSyncToMainCalculator('bed_time', bedOpt.time24);
                          document.getElementById('calculadora-principal')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-2 w-full text-[10px] font-bold text-emerald-300 hover:text-emerald-100 bg-emerald-950/80 hover:bg-emerald-900 py-1.5 rounded-lg border border-emerald-800 transition-colors flex items-center justify-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Usar {bedOpt.time12} en Calculadora</span>
                      </button>
                    )}
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="text-indigo-300 font-bold mb-1 flex items-center justify-between">
                        <span>Punto medio del rango</span>
                        <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded">{midHours.toFixed(1)}h</span>
                      </div>
                      <div className="text-lg font-black text-white">{bedStd.time12}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Ejemplo calculado usando el punto medio del rango general.</div>
                    </div>
                    {onSyncToMainCalculator && (
                      <button
                        type="button"
                        onClick={() => {
                          onSyncToMainCalculator('bed_time', bedStd.time24);
                          document.getElementById('calculadora-principal')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-2 w-full text-[10px] font-bold text-indigo-300 hover:text-indigo-100 bg-indigo-950/80 hover:bg-indigo-900 py-1.5 rounded-lg border border-indigo-800 transition-colors flex items-center justify-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Usar {bedStd.time12} en Calculadora</span>
                      </button>
                    )}
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="text-amber-300 font-bold mb-1 flex items-center justify-between">
                        <span>Extremo inferior del rango</span>
                        <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">{adjustedMin.toFixed(1)}h</span>
                      </div>
                      <div className="text-lg font-black text-white">{bedMin.time12}</div>
                      <div className="text-[10px] text-slate-400 mt-1">Ejemplo calculado usando el extremo inferior del rango recomendado para la edad.</div>
                    </div>
                    {onSyncToMainCalculator && (
                      <button
                        type="button"
                        onClick={() => {
                          onSyncToMainCalculator('bed_time', bedMin.time24);
                          document.getElementById('calculadora-principal')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="mt-2 w-full text-[10px] font-bold text-amber-300 hover:text-amber-100 bg-amber-950/80 hover:bg-amber-900 py-1.5 rounded-lg border border-amber-800 transition-colors flex items-center justify-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Usar {bedMin.time12} en Calculadora</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Lifespan Comparison Overview Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          Tabla Comparativa del Desarrollo del Sueño a lo Largo de la Vida
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-3 px-3">Etapa Vital</th>
                <th className="py-3 px-3">Rango de Edad</th>
                <th className="py-3 px-3">Horas Recomendadas</th>
                <th className="py-3 px-3">Función Biológica Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {AGE_GROUPS.map((g) => (
                <tr key={g.id} className={g.id === selectedAgeId ? 'bg-indigo-950/40 text-white font-semibold' : 'hover:bg-slate-800/40'}>
                  <td className="py-3 px-3 font-bold">{g.name}</td>
                  <td className="py-3 px-3">{g.ageRange}</td>
                  <td className="py-3 px-3 text-amber-300 font-bold">{g.recHoursMin} - {g.recHoursMax} hrs</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{g.description.substring(0, 90)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

