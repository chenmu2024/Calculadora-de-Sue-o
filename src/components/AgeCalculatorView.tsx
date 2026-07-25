import React, { useState } from 'react';
import { Users, Clock, CheckCircle2, Sparkles, AlertTriangle, Lightbulb, Calendar, ArrowRight, RefreshCw, Sliders, Zap, Activity, HeartPulse, Brain, Heart, Layers } from 'lucide-react';
import { AGE_GROUPS } from '../data/sleepData';
import { AgeGroupConfig } from '../types';
import { downloadCalendarEvent } from '../utils/sleepCalculations';

interface AgeCalculatorViewProps {
  onSyncToMainCalculator?: (mode: 'wake_time' | 'bed_time', time: string) => void;
}

export const AgeCalculatorView: React.FC<AgeCalculatorViewProps> = ({ onSyncToMainCalculator }) => {
  const [selectedAgeId, setSelectedAgeId] = useState<string>('adult');
  const [inputExactAge, setInputExactAge] = useState<string>('28');
  const [chronotype, setChronotype] = useState<'owl' | 'lark' | 'neutral'>('neutral');

  // Life Modifiers state
  const [isAthlete, setIsAthlete] = useState<boolean>(false);
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isHighStress, setIsHighStress] = useState<boolean>(false);
  const [isSick, setIsSick] = useState<boolean>(false);
  const [targetWakeTime, setTargetWakeTime] = useState<string>('07:00');

  // Auto detect group if exact age is typed
  const handleExactAgeChange = (val: string) => {
    setInputExactAge(val);
    const num = parseFloat(val);
    if (isNaN(num)) return;

    if (num < 1) {
      setSelectedAgeId('baby');
    } else if (num >= 1 && num < 6) {
      setSelectedAgeId('toddler');
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

  const selectedGroup = AGE_GROUPS.find((g) => g.id === selectedAgeId) || AGE_GROUPS[4];

  // Calculate modifier offset
  let extraHours = 0;
  if (isAthlete) extraHours += 0.75;
  if (isPregnant) extraHours += 1.25;
  if (isHighStress) extraHours += 0.5;
  if (isSick) extraHours += 1.5;

  const adjustedMin = selectedGroup.recHoursMin + extraHours;
  const adjustedMax = selectedGroup.recHoursMax + extraHours;

  // Expected Sleep Architecture breakdown by age group
  const getArchitecture = (id: string) => {
    switch (id) {
      case 'baby':
        return { rem: 50, deep: 30, light: 20, note: '50% REM primordial para neurogénesis acelerada y aprendizaje sensorial' };
      case 'toddler':
        return { rem: 30, deep: 30, light: 40, note: 'Pico de Sueño Profundo para secreción masiva de Hormona del Crecimiento (GH)' };
      case 'child':
        return { rem: 25, deep: 25, light: 50, note: 'Consolidación de memoria académica y motora fina' };
      case 'teen':
        return { rem: 25, deep: 20, light: 55, note: 'Fase circadiana retrasada 2h biológicamente por melatonina tardía' };
      case 'senior':
        return { rem: 20, deep: 12, light: 68, note: 'Reducción natural de fase N3 (Profunda); vital optimizar eficiencia postural' };
      case 'adult':
      default:
        return { rem: 22, deep: 20, light: 58, note: 'Equilibrio óptimo para reparación muscular (N3) y equilibrio emocional (REM)' };
    }
  };

  const arch = getArchitecture(selectedGroup.id);

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
          <span>Calculador Oficial de Horas de Sueño por Edad 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Calculadora de Horas de Sueño Recomendadas
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Descubre el volumen exacto de <strong className="text-white font-semibold">horas de descanso y ciclos ultradianos</strong> recomendados según las pautas clínicas de la National Sleep Foundation.
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

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="text-xs font-bold text-indigo-300 whitespace-nowrap">
              Edad exacta (años):
            </label>
            <input
              type="number"
              min="0"
              max="110"
              value={inputExactAge}
              onChange={(e) => handleExactAgeChange(e.target.value)}
              className="bg-slate-950 border border-indigo-500/40 rounded-xl px-4 py-2 text-white font-extrabold text-center w-24 text-base focus:outline-none focus:border-indigo-400"
              placeholder="Ej. 28"
            />
          </div>
        </div>

        {/* Age Group Quick Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {AGE_GROUPS.map((group) => {
            const isSelected = group.id === selectedAgeId;
            return (
              <button
                key={group.id}
                onClick={() => {
                  setSelectedAgeId(group.id);
                  if (group.id === 'baby') setInputExactAge('0.5');
                  else if (group.id === 'toddler') setInputExactAge('3');
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

        {/* Life Situation Modifiers Selector */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Ajuste por Condición Fisiológica Especial:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => setIsAthlete(!isAthlete)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                isAthlete ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🏃 Atleta / Ejercicio Intenso</span>
              <span className="ml-auto text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300">+0.75h</span>
            </button>

            <button
              onClick={() => setIsPregnant(!isPregnant)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                isPregnant ? 'bg-violet-950/80 border-violet-500 text-violet-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🤰 Embarazo / Lactancia</span>
              <span className="ml-auto text-[10px] bg-violet-500/20 px-1.5 py-0.5 rounded text-violet-300">+1.25h</span>
            </button>

            <button
              onClick={() => setIsHighStress(!isHighStress)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                isHighStress ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>📑 Estrés / Examen Intenso</span>
              <span className="ml-auto text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300">+0.5h</span>
            </button>

            <button
              onClick={() => setIsSick(!isSick)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                isSick ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🤒 Enfermedad / Recuperación</span>
              <span className="ml-auto text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">+1.5h</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Result & Range Bar Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Diagnóstico Biológico Personalizado
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Etapa: {selectedGroup.name}
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
              {extraHours > 0 ? (
                <span className="text-amber-300 font-bold"> Incluye +{extraHours}h por factores especiales</span>
              ) : (
                <span>Equivalente a <strong className="text-white">{selectedGroup.recCyclesMin} - {selectedGroup.recCyclesMax} Ciclos</strong></span>
              )}
            </div>
          </div>
        </div>

        {/* Visual Sleep Range Gauge */}
        <div className="my-6 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-300">
            <span>Escala Recomendada de Descanso:</span>
            <span className="text-amber-300 font-black">Zona Óptima: {adjustedMin.toFixed(1)}h - {adjustedMax.toFixed(1)}h</span>
          </div>
          
          <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden flex relative">
            {/* Below recommended */}
            <div style={{ width: `${(adjustedMin / 16) * 100}%` }} className="bg-amber-500/30 h-full border-r border-slate-700 flex items-center justify-center text-[9px] text-amber-300 font-bold">
              Insuficiente (&lt;{adjustedMin.toFixed(1)}h)
            </div>
            {/* Recommended range */}
            <div style={{ width: `${((adjustedMax - adjustedMin) / 16) * 100}%` }} className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full flex items-center justify-center text-[10px] text-white font-black shadow-inner">
              ★ RECOMENDADO ({adjustedMin.toFixed(1)}h-{adjustedMax.toFixed(1)}h)
            </div>
            {/* Above recommended */}
            <div className="flex-1 bg-violet-500/30 h-full flex items-center justify-center text-[9px] text-violet-300 font-bold">
              Excesivo (&gt;{adjustedMax.toFixed(1)}h)
            </div>
          </div>
        </div>

        {/* Sleep Architecture Breakdown by Age Group */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 my-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Distribución Fisiológica Esperada de Fases ({selectedGroup.name})
              </h3>
            </div>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Patrón Típico
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            💡 {arch.note}
          </p>

          <div className="space-y-2">
            <div className="h-6 w-full rounded-xl overflow-hidden flex text-[10px] font-black text-white text-center">
              <div style={{ width: `${arch.deep}%` }} className="bg-indigo-600 flex items-center justify-center truncate px-1">
                Profundo N3 ({arch.deep}%)
              </div>
              <div style={{ width: `${arch.rem}%` }} className="bg-violet-500 flex items-center justify-center truncate px-1">
                REM ({arch.rem}%)
              </div>
              <div style={{ width: `${arch.light}%` }} className="bg-slate-700 flex items-center justify-center truncate px-1">
                Ligero ({arch.light}%)
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                Sueño Profundo (N3): <strong className="text-slate-200">Reparación Celular</strong>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" />
                Sueño REM: <strong className="text-slate-200">Memoria y Emociones</strong>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                Sueño Ligero: <strong className="text-slate-200">Transición Circadiana</strong>
              </span>
            </div>
          </div>
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
              2. Generador de Horario Ideal según tu Cronotipo
            </h3>
            <span className="text-xs text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-800 font-semibold">
              Regulado por gen PER3
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Ajusta tu ritmo biológico según prefieras levantarte temprano o acostarte tarde para generar tu ventana personalizada de descanso.
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
              <div className="text-xs opacity-80 mt-1">Pico de energía a las 8 AM. Acostarse temprano (~9:30 PM).</div>
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
              <div className="text-xs opacity-80 mt-1">Sincronizado con el sol. Acostarse ~11:00 PM, despertar ~7:00 AM.</div>
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
              <div className="text-xs opacity-80 mt-1">Mayor creatividad a las 9 PM. Acostarse tarde (~12:30 AM).</div>
            </button>
          </div>

          {/* Generated Ideal Schedule Box */}
          <div className="bg-gradient-to-r from-indigo-950/90 to-slate-900 border border-indigo-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs text-indigo-300 font-bold mb-1">
                Horario Sugerido para {selectedGroup.name} ({chronotype === 'lark' ? 'Alondra' : chronotype === 'owl' ? 'Búho' : 'Estándar'}):
              </div>
              <div className="flex items-center gap-3 text-white font-extrabold text-lg sm:text-xl">
                <span className="text-indigo-300">🌙 Acostarse: {schedule.bedStr}</span>
                <span className="text-slate-500">➔</span>
                <span className="text-emerald-300">☀️ Despertar: {schedule.wakeStr}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Total descanso: <strong className="text-white">{schedule.avgHours.toFixed(1)} Horas</strong> ({Math.round((schedule.avgHours / 1.5) * 10) / 10} Ciclos)
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => {
                  downloadCalendarEvent(
                    `Alarma Recomendada (${selectedGroup.name})`,
                    schedule.wake24,
                    `Recordatorio de despertar biológico para ${selectedGroup.name}`
                  );
                }}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Añadir Alarma</span>
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
                  <span>Sincronizar en Calculadora</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Reverse Bedtime Matrix for Target Wake Time */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Calculadora Inversa: Si tienes que despertarte a una hora específica
                </h4>
                <p className="text-[11px] text-slate-400">
                  Ingresa la hora en la que te levantas (colegio, trabajo, biberón) para calcular las horas de ir a la cama adaptadas a {selectedGroup.name}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Hora Despertar:</span>
                <input
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

              // Calculate 3 bedtime options: Optimal (Max Hours), Standard (Min Hours), Minimum (-1.5h)
              const latencyMin = 15; // 15 mins to fall asleep

              const calcBed = (hoursNeeded: number) => {
                const bDate = new Date(wakeDate.getTime() - (hoursNeeded * 60 + latencyMin) * 60 * 1000);
                return bDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
              };

              const bedOpt = calcBed(adjustedMax);
              const bedStd = calcBed(adjustedMin);
              const bedMin = calcBed(Math.max(4, adjustedMin - 1.5));

              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30">
                    <div className="text-emerald-400 font-bold mb-1 flex items-center justify-between">
                      <span>🌟 Descanso Óptimo</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded">{adjustedMax.toFixed(1)}h</span>
                    </div>
                    <div className="text-lg font-black text-white">{bedOpt}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Ir a la cama a esta hora garantiza la máxima regeneración celular y REM.</div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30">
                    <div className="text-indigo-300 font-bold mb-1 flex items-center justify-between">
                      <span>✅ Descanso Estándar</span>
                      <span className="text-[10px] bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded">{adjustedMin.toFixed(1)}h</span>
                    </div>
                    <div className="text-lg font-black text-white">{bedStd}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Cumple el volumen mínimo recomendado para el rendimiento diario.</div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30">
                    <div className="text-amber-300 font-bold mb-1 flex items-center justify-between">
                      <span>⚠️ Descanso Mínimo</span>
                      <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded">{(adjustedMin - 1.5).toFixed(1)}h</span>
                    </div>
                    <div className="text-lg font-black text-white">{bedMin}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Límite mínimo ocasional para evitar inercia del sueño intensa.</div>
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
                <th className="py-3 px-3">Ciclos Ultradianos</th>
                <th className="py-3 px-3">Función Biológica Principal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {AGE_GROUPS.map((g) => (
                <tr key={g.id} className={g.id === selectedAgeId ? 'bg-indigo-950/40 text-white font-semibold' : 'hover:bg-slate-800/40'}>
                  <td className="py-3 px-3 font-bold">{g.name}</td>
                  <td className="py-3 px-3">{g.ageRange}</td>
                  <td className="py-3 px-3 text-amber-300 font-bold">{g.recHoursMin} - {g.recHoursMax} hrs</td>
                  <td className="py-3 px-3">{g.recCyclesMin} - {g.recCyclesMax} ciclos</td>
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

