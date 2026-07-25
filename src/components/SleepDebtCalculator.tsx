import React, { useState } from 'react';
import { BatteryCharging, AlertCircle, CheckCircle2, RotateCcw, Calendar, Sparkles, TrendingDown } from 'lucide-react';

export const SleepDebtCalculator: React.FC = () => {
  const [targetHours, setTargetHours] = useState<number>(7.5);
  const [includeWeekends, setIncludeWeekends] = useState<boolean>(true);
  const [hoursList, setHoursList] = useState<number[]>([6, 6.5, 6, 7, 6.5, 8, 8.5]); // Mon to Sun

  const activeDaysCount = includeWeekends ? 7 : 5;
  const activeHours = hoursList.slice(0, activeDaysCount);

  const totalTarget = targetHours * activeDaysCount;
  const totalActual = activeHours.reduce((a, b) => a + b, 0);
  const sleepDebt = Math.max(0, totalTarget - totalActual);
  const averageDailyActual = totalActual / activeDaysCount;

  const handleHourChange = (idx: number, val: number) => {
    const updated = [...hoursList];
    updated[idx] = val;
    setHoursList(updated);
  };

  const handleResetDefaults = () => {
    setHoursList([6, 6.5, 6, 7, 6.5, 8, 8.5]);
    setTargetHours(7.5);
  };

  const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div id="deuda-sueno" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800 mb-2">
            <BatteryCharging className="w-3.5 h-3.5 text-amber-300" />
            <span>Diagnóstico Clínico: Deuda de Sueño Acumulada</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Calculadora de Deuda de Sueño Semanal
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Calcula las horas acumuladas de déficit de descanso y genera un plan gradual para saldarlas sin desincronizar tu reloj circadiano.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-right min-w-[210px] shadow-lg">
            <div className="text-xs text-slate-400 font-semibold">Deuda Total Acumulada:</div>
            <div className={`text-3xl font-black ${sleepDebt > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {sleepDebt > 0 ? `-${sleepDebt.toFixed(1)} Horas` : '0.0 Horas (¡Al Día!)'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Promedio real: <strong className="text-white">{averageDailyActual.toFixed(1)}h/noche</strong> vs objetivo {targetHours}h
            </div>
          </div>
        </div>
      </div>

      {/* Mode & Target Controls */}
      <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-bold">Modo de Cálculo:</span>
          <button
            onClick={() => setIncludeWeekends(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              includeWeekends ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Semana Completa (7 días)
          </button>
          <button
            onClick={() => setIncludeWeekends(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              !includeWeekends ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Solo Laborables (5 días)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="target-hours-select" className="text-xs text-slate-300 font-bold whitespace-nowrap cursor-pointer">
            Objetivo Diario:
          </label>
          <select
            id="target-hours-select"
            aria-label="Objetivo diario de horas de sueño"
            value={targetHours}
            onChange={(e) => setTargetHours(parseFloat(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-indigo-300 font-bold focus:outline-none"
          >
            <option value={7}>7.0h (5 Ciclos Cortos)</option>
            <option value={7.5}>7.5h (5 Ciclos Estándar - Recomendado)</option>
            <option value={8}>8.0h (Estándar Adulto)</option>
            <option value={9}>9.0h (6 Ciclos Máximo)</option>
          </select>

          <button
            onClick={handleResetDefaults}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="Restablecer valores"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Daily Inputs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
        {dayNames.slice(0, activeDaysCount).map((day, idx) => {
          const val = hoursList[idx];
          const isDeficit = val < targetHours;
          const dayInputId = `sleep-hours-day-${idx}`;
          return (
            <div
              key={day}
              className={`p-3 rounded-2xl border transition-all text-center ${
                isDeficit
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-emerald-950/20 border-emerald-500/30'
              }`}
            >
              <label htmlFor={dayInputId} className="text-xs font-bold text-slate-300 block mb-1 cursor-pointer">
                {day}
              </label>
              <input
                id={dayInputId}
                aria-label={`Horas dormidas el ${day}`}
                type="number"
                step="0.5"
                min="2"
                max="14"
                value={val}
                onChange={(e) => handleHourChange(idx, parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-1.5 px-2 text-center text-sm font-black text-white focus:border-indigo-500 focus:outline-none"
              />
              <span className={`text-[10px] font-semibold mt-1 block ${isDeficit ? 'text-amber-400' : 'text-emerald-400'}`}>
                {isDeficit ? `-${(targetHours - val).toFixed(1)}h` : `+${(val - targetHours).toFixed(1)}h`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Recovery Strategy & Action Plan */}
      {sleepDebt > 0 ? (
        <div className="bg-gradient-to-r from-amber-950/40 via-indigo-950/50 to-slate-900 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-300 shrink-0" />
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              Plan Personalizado para Saldar {sleepDebt.toFixed(1)} Horas de Deuda:
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            ⚠️ <strong className="text-white">Nunca intentes recuperar todas las horas perdidas de un solo golpe el fin de semana.</strong> Dormir 12 horas seguidas destruye tu ritmo circadiano (jetlag social) y causa insomnio la noche del domingo. Aplica este protocolo científico gradual:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-amber-300 font-bold block mb-1">1. Adelanta tu hora de acostarte</span>
              <p className="text-slate-300 text-[11px] leading-snug">
                Añade <strong>30 a 45 minutos</strong> cada noche durante las próximas {Math.ceil(sleepDebt / 0.75)} noches.
              </p>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-indigo-300 font-bold block mb-1">2. Siesta de Recuperación</span>
              <p className="text-slate-300 text-[11px] leading-snug">
                Realiza una Power Nap de <strong>20 minutos entre las 1:00 PM y 3:00 PM</strong> (nunca más tarde).
              </p>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-emerald-300 font-bold block mb-1">3. Luz Solar Matutina</span>
              <p className="text-slate-300 text-[11px] leading-snug">
                Expón tus ojos a 10 minutos de sol al despertar para frenar la melatonina residual y resincronizar el núcleo supraquiasmático.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-5 flex items-center gap-3 text-xs text-slate-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <strong className="text-emerald-300 block text-sm mb-0.5">¡Excelente Higiene del Sueño!</strong>
            Estás cumpliendo perfectamente tu volumen semanal de {totalTarget} horas. Mantén tu horario regular de acostarte y despertarte de forma constante para preservar tu salud inmunológica e intelectual.
          </div>
        </div>
      )}
    </div>
  );
};
