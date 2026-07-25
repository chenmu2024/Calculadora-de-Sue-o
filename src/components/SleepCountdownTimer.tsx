import React, { useState, useEffect } from 'react';
import { Timer, Bell, Play, Pause, RotateCcw, Moon, Sparkles, ShieldCheck, CheckCircle, Volume2 } from 'lucide-react';

export const SleepCountdownTimer: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(30); // 30 mins default wind-down
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft !== null && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      // Play audio notification chime if possible
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = 432; // Calming frequency
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
      } catch (e) {
        console.error(e);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const handleStart = () => {
    if (secondsLeft === null || secondsLeft === 0) {
      setSecondsLeft(minutes * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900/90 border border-violet-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-violet-500/20 border border-violet-400/30 rounded-2xl text-violet-300">
            <Timer className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Temporizador de Desconexión Pre-Sueño (Wind-Down)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Inicia una cuenta atrás para apagar pantallas, bajar luces y señalizar a la epífisis que libere melatonina.
            </p>
          </div>
        </div>

        {/* Display Timer */}
        {secondsLeft !== null && (
          <div className="bg-slate-950 px-4 py-1.5 rounded-2xl border border-violet-500/40 text-center self-start sm:self-auto">
            <span className="text-2xl font-black text-amber-300 tracking-wider font-mono">
              {formatTime(secondsLeft)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-7 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">Duración de relajación:</span>
          {[15, 30, 45, 60].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMinutes(m);
                setSecondsLeft(m * 60);
                setIsRunning(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                minutes === m
                  ? 'bg-violet-600 text-white border-violet-400'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        <div className="md:col-span-5 flex items-center justify-end gap-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{secondsLeft !== null && secondsLeft > 0 ? 'Reanudar' : 'Iniciar Relajación'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-all"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pausar</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl border border-slate-700 transition-colors"
            title="Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {secondsLeft === 0 && (
        <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-700 rounded-2xl text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Tiempo de Desconexión completado! Tu mente está lista para dormir. Apaga las luces.</span>
        </div>
      )}
    </div>
  );
};
