import React from 'react';
import { Activity, ShieldCheck, Zap, Info, Clock, AlertCircle } from 'lucide-react';
import { SleepCycleResult } from '../types';

interface SleepCycleVisualizerProps {
  selectedResult?: SleepCycleResult | null;
}

export const SleepCycleVisualizer: React.FC<SleepCycleVisualizerProps> = ({ selectedResult }) => {
  const cyclesCount = selectedResult?.cycles || 5;
  const cyclesArray = Array.from({ length: cyclesCount }, (_, i) => i + 1);

  return (
    <div id="visualizador-ciclos" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800 mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fisiología del Sueño: Regla de los 90 Minutos</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Estructura Visual de tus {cyclesCount} Ciclos ({cyclesCount * 1.5} Horas)
          </h3>
        </div>

        {selectedResult && (
          <div className="bg-indigo-950/80 border border-indigo-500/40 rounded-xl px-4 py-2 text-right">
            <div className="text-xs text-slate-400">Hora seleccionada:</div>
            <div className="text-lg font-black text-indigo-200">{selectedResult.time}</div>
          </div>
        )}
      </div>

      {/* Sleep Phases Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">Fase N1 (Ligero)</div>
            <div className="text-[10px] text-slate-400">Adormecimiento (~5%)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">Fase N2 (Ligero)</div>
            <div className="text-[10px] text-slate-400">Ritmo cardiaco cae (~50%)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">Fase N3 (Profundo)</div>
            <div className="text-[10px] text-slate-400">Reparación física (~20%)</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-200">Fase REM (Sueños)</div>
            <div className="text-[10px] text-slate-400">Memoria y emociones (~25%)</div>
          </div>
        </div>
      </div>

      {/* Visual Timeline Bars */}
      <div className="space-y-3 mb-8">
        <div className="text-xs text-slate-400 font-medium mb-1">
          Línea de tiempo de los {cyclesCount} bloques de 90 minutos:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-6 gap-2">
          {cyclesArray.map((cycleNum) => {
            const isLastCycle = cycleNum === cyclesCount;
            return (
              <div
                key={cycleNum}
                className={`rounded-xl p-3 border transition-all ${
                  isLastCycle
                    ? 'bg-gradient-to-b from-indigo-950 to-slate-900 border-emerald-500/80 ring-1 ring-emerald-500/30'
                    : 'bg-slate-800/60 border-slate-700/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-indigo-300">
                    Ciclo {cycleNum}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    90 min
                  </span>
                </div>

                {/* Simulated Wave Representation */}
                <div className="h-10 w-full flex items-end gap-1 bg-slate-900/80 p-1 rounded-lg mb-2">
                  <div className="w-1/4 h-2/5 bg-cyan-400 rounded-sm" title="N1" />
                  <div className="w-1/4 h-3/5 bg-blue-500 rounded-sm" title="N2" />
                  <div className="w-1/4 h-full bg-purple-600 rounded-sm" title="N3 Profundo" />
                  <div className="w-1/4 h-4/5 bg-emerald-400 rounded-sm" title="REM" />
                </div>

                <div className="text-[11px] text-slate-300 font-semibold text-center">
                  {cycleNum * 1.5} Horas
                </div>

                {isLastCycle && (
                  <div className="mt-2 pt-1 border-t border-emerald-500/30 text-center">
                    <span className="text-[10px] text-emerald-400 font-extrabold flex items-center justify-center gap-1">
                      <Zap className="w-3 h-3" /> Momentode Despertar
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanatory Box */}
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">¿Por qué es clave despertar al finalizar el ciclo REM?</strong> Al terminar la fase REM de cada ciclo de 90 minutos, las ondas cerebrales vuelven a ser muy similares a las del estado de vigilia. Sonar tu alarma en este instante previene la <em>inercia del sueño</em> (pesadez matutina).
        </div>
      </div>
    </div>
  );
};
