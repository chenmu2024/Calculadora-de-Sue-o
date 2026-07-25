import React, { useState, useEffect, useRef } from 'react';
import { Zap, Clock, Bell, Sparkles, Check, Play, RotateCcw, AlertTriangle, Calendar, Pause, Coffee, Sun, Droplets, Volume2, VolumeX, ShieldCheck, History, Plus } from 'lucide-react';
import { downloadCalendarEvent } from '../utils/sleepCalculations';

interface NapOption {
  durationMinutes: number;
  title: string;
  subtitle: string;
  benefits: string;
  inertiaRisk: 'Bajo' | 'Medio' | 'Nulo';
  badge: string;
  gradient: string;
  isCoffeeNap?: boolean;
}

interface NapLogItem {
  id: string;
  date: string;
  title: string;
  durationMinutes: number;
}

const NAP_OPTIONS: NapOption[] = [
  {
    durationMinutes: 20,
    title: 'Power Nap de Recarga',
    subtitle: '20 Minutos',
    benefits: 'Aumenta la alerta, mejora la concentración y el tiempo de reacción sin entrar en sueño profundo.',
    inertiaRisk: 'Nulo',
    badge: 'La más recomendada',
    gradient: 'from-amber-500/20 to-indigo-900/40 border-amber-500/40'
  },
  {
    durationMinutes: 20,
    title: 'Café-Siesta (Coffee Nap)',
    subtitle: '20 Minutos + Expreso',
    benefits: 'Toma un café expreso e inmediatamente duerme 20 min. La cafeína bloquea los receptores de adenosina justo al despertar.',
    inertiaRisk: 'Nulo',
    badge: 'Efecto Máximo Vigor',
    gradient: 'from-amber-700/30 to-amber-950/60 border-amber-500/60',
    isCoffeeNap: true
  },
  {
    durationMinutes: 30,
    title: 'Siesta NASA',
    subtitle: '30 Minutos',
    benefits: 'Utilizado por pilotos de la NASA. Mejora el rendimiento cognitivo en un 34% y la atención en un 100%.',
    inertiaRisk: 'Bajo',
    badge: 'Rendimiento Alto',
    gradient: 'from-indigo-600/20 to-slate-900 border-indigo-500/40'
  },
  {
    durationMinutes: 60,
    title: 'Siesta de Memoria',
    subtitle: '60 Minutos',
    benefits: 'Consolida la memoria de hechos, nombres y rostros (fase de ondas lentas). Puede causar ligera pesadez inicial.',
    inertiaRisk: 'Medio',
    badge: 'Estudio y Memoria',
    gradient: 'from-violet-600/20 to-slate-900 border-violet-500/40'
  },
  {
    durationMinutes: 90,
    title: 'Ciclo Completo REM',
    subtitle: '90 Minutos',
    benefits: 'Completa un ciclo de sueño completo (NREM + REM). Estimula la creatividad y evita completamente la inercia del sueño.',
    inertiaRisk: 'Nulo',
    badge: 'Siesta Profunda',
    gradient: 'from-emerald-600/20 to-slate-900 border-emerald-500/40'
  }
];

export const NapCalculatorWidget: React.FC = () => {
  const [selectedNap, setSelectedNap] = useState<NapOption>(NAP_OPTIONS[0]);
  const [latencyMinutes, setLatencyMinutes] = useState<number>(10);
  const [copiedAlarm, setCopiedAlarm] = useState<boolean>(false);

  // Custom start time state
  const [useCustomStartTime, setUseCustomStartTime] = useState<boolean>(false);
  const [customStartTime, setCustomStartTime] = useState<string>('14:30');

  // Live countdown timer state
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);

  // Audio Ambient Sound Synthesizer State
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [soundType, setSoundType] = useState<'pink' | 'rain' | 'delta'>('pink');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Wake up time morning state for circadian window calculation
  const [morningWakeTime, setMorningWakeTime] = useState<string>('07:00');

  // Nap History Log
  const [napLogs, setNapLogs] = useState<NapLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('nap_history_logs');
      return saved ? JSON.parse(saved) : [
        { id: '1', date: 'Ayer, 15:00', title: 'Power Nap de Recarga', durationMinutes: 20 },
        { id: '2', date: 'Hace 3 días', title: 'Café-Siesta (Coffee Nap)', durationMinutes: 20 }
      ];
    } catch (e) {
      return [];
    }
  });

  // Calculate target alarm time
  const getStartTimeDate = (): Date => {
    if (!useCustomStartTime) return new Date();
    const [h, m] = customStartTime.split(':').map(Number);
    const d = new Date();
    d.setHours(h || 14, m || 30, 0, 0);
    return d;
  };

  const startTimeDate = getStartTimeDate();
  const targetTime = new Date(startTimeDate.getTime() + (selectedNap.durationMinutes + latencyMinutes) * 60 * 1000);
  const targetTimeString = targetTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  // Handle Web Audio API sound generator
  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      if (soundType === 'pink') {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }
      } else {
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.03;
        }
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = soundType === 'delta' ? 300 : 800;

      const gain = ctx.createGain();
      gain.gain.value = 0.2;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noiseNodeRef.current = noise;
      setIsPlayingSound(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopAmbientSound = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as any).stop();
      } catch (e) {}
      noiseNodeRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlayingSound(false);
  };

  const toggleSound = () => {
    if (isPlayingSound) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  // Handle countdown timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      stopAmbientSound();
      alert('⏰ ¡TIEMPO DE SIESTA COMPLETADO! Despiértate con energía.');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeftSeconds]);

  const handleStartTimer = () => {
    const totalSecs = (selectedNap.durationMinutes + latencyMinutes) * 60;
    setTimeLeftSeconds(totalSecs);
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    stopAmbientSound();
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyAlarm = () => {
    navigator.clipboard.writeText(`Alarma Power Nap (${selectedNap.durationMinutes} min): ${targetTimeString}`);
    setCopiedAlarm(true);
    setTimeout(() => setCopiedAlarm(false), 2000);
  };

  const handleLogNap = () => {
    const newLog: NapLogItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
      title: selectedNap.title,
      durationMinutes: selectedNap.durationMinutes
    };
    const updated = [newLog, ...napLogs.slice(0, 4)];
    setNapLogs(updated);
    try {
      localStorage.setItem('nap_history_logs', JSON.stringify(updated));
    } catch (e) {}
  };

  // Circadian window calculation (6 to 8.5 hours after waking up)
  const getCircadianNapWindow = () => {
    const [h, m] = morningWakeTime.split(':').map(Number);
    const wakeD = new Date();
    wakeD.setHours(h || 7, m || 0, 0, 0);

    const windowStart = new Date(wakeD.getTime() + 6 * 60 * 60 * 1000);
    const windowEnd = new Date(wakeD.getTime() + 8.5 * 60 * 60 * 1000);

    return {
      startStr: windowStart.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      endStr: windowEnd.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const napWindow = getCircadianNapWindow();

  return (
    <div id="calculadora-siestas" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Calculadora de Siestas y Power Naps Optimizadas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Calcula la Hora de Despertar de tu Siesta
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Evita la <strong className="text-white">inercia del sueño</strong> (sensación de aturdimiento) programando la duración exacta según la ciencia circadiana.
          </p>
        </div>

        {/* Start Time Mode Switcher & Latency adjustment */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Custom Time Toggle */}
          <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl text-xs w-full sm:w-auto">
            <div className="text-[10px] font-bold text-slate-400 mb-1">¿Cuándo vas a dormir?</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUseCustomStartTime(false)}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  !useCustomStartTime ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Ahora Mismo
              </button>
              <button
                onClick={() => setUseCustomStartTime(true)}
                className={`px-3 py-1 rounded-xl font-bold transition-all ${
                  useCustomStartTime ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Hora Específica
              </button>
            </div>

            {useCustomStartTime && (
              <div className="mt-2 flex items-center gap-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-300 font-bold">Inicio:</span>
                <input
                  type="time"
                  value={customStartTime}
                  onChange={(e) => setCustomStartTime(e.target.value)}
                  className="bg-slate-900 border border-indigo-500/40 rounded-lg px-2 py-0.5 text-white font-extrabold focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Latency adjustment */}
          <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl text-xs w-full sm:w-auto">
            <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Tiempo para dormirse:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[5, 10, 15].map((m) => (
                <button
                  key={m}
                  onClick={() => setLatencyMinutes(m)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors ${
                    latencyMinutes === m
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  +{m} min
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nap Options Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {NAP_OPTIONS.map((nap) => {
          const isSelected = selectedNap.durationMinutes === nap.durationMinutes && selectedNap.isCoffeeNap === nap.isCoffeeNap;
          return (
            <button
              key={`${nap.durationMinutes}-${nap.title}`}
              onClick={() => setSelectedNap(nap)}
              className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? `bg-gradient-to-b ${nap.gradient} border-2 shadow-lg scale-[1.02]`
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800 truncate max-w-[120px]">
                    {nap.badge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    <span className={nap.inertiaRisk === 'Nulo' ? 'text-emerald-400' : 'text-amber-400'}>{nap.inertiaRisk}</span>
                  </span>
                </div>

                <div className="text-xl font-black text-white mb-1">
                  {nap.durationMinutes} <span className="text-xs font-semibold text-slate-400">min</span>
                </div>

                <div className="text-xs font-bold text-indigo-300 mb-1.5 line-clamp-1">
                  {nap.title}
                </div>

                <p className="text-[11px] text-slate-300 leading-tight mb-3">
                  {nap.benefits}
                </p>
              </div>

              {isSelected && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 pt-2 border-t border-amber-500/20">
                  <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Seleccionada</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Alarm Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-indigo-950/60 to-slate-900 border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Hora de Alarma Sugerida ({selectedNap.durationMinutes} min + {latencyMinutes} min dormirse)
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3 mt-0.5">
              <span>Programar alarma para las <strong className="text-amber-300">{targetTimeString}</strong></span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Basado en inicio a las {startTimeDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-auto shrink-0">
          {!isTimerRunning ? (
            <button
              onClick={handleStartTimer}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Temporizador Vivo</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto bg-amber-950/90 border border-amber-500/60 rounded-xl p-2 px-3">
              <span className="text-xs font-black text-amber-300 font-mono text-base">
                ⏱️ {formatTimerDisplay(timeLeftSeconds)}
              </span>
              <button
                onClick={handleStopTimer}
                className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Pausar
              </button>
            </div>
          )}

          <button
            onClick={() => {
              const target24 = targetTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
              downloadCalendarEvent(
                `Alarma ${selectedNap.title} (${selectedNap.durationMinutes} min)`,
                target24,
                `Despertar de siesta optimizada. ${selectedNap.benefits}`
              );
            }}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Añadir a Calendario</span>
          </button>

          <button
            onClick={handleCopyAlarm}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
          >
            {copiedAlarm ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            <span>{copiedAlarm ? '¡Copiado!' : 'Copiar Hora'}</span>
          </button>
        </div>
      </div>

      {/* Ambient Relaxation Sound Bar (Integrated Web Audio Synth) */}
      <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold transition-all ${
              isPlayingSound
                ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
            }`}
          >
            {isPlayingSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{isPlayingSound ? 'Detener Sonido Relajante' : 'Reproducir Sonido de Fondo'}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold">Frecuencia:</span>
            <button
              onClick={() => setSoundType('pink')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${soundType === 'pink' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              Ruido Rosa (Ondas)
            </button>
            <button
              onClick={() => setSoundType('delta')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${soundType === 'delta' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              Ondas Delta (300Hz)
            </button>
          </div>
        </div>

        <button
          onClick={handleLogNap}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold flex items-center gap-1.5 border border-slate-700 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Registrar Siesta en Mi Historial</span>
        </button>
      </div>

      {/* Special Coffee Nap Protocol Infographic (Show when Coffee Nap is selected) */}
      {selectedNap.isCoffeeNap && (
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-extrabold text-amber-200">
              Protocolo Científico del Café-Siesta (Coffee Nap)
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            La cafeína tarda aproximadamente 20 minutos en atravesar el tracto gastrointestinal y llegar al cerebro. Durante esos 20 minutos de siesta, tu cerebro elimina la adenosina acumulada. Justo al despertar a los 20 min, los receptores quedan limpios y la cafeína se acopla inmediatamente, duplicando la alerta.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs pt-1">
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-amber-400 font-bold block mb-0.5">1. Prepara Expreso</span>
              <span className="text-[10px] text-slate-400">Toma un café corto o frío rápido (100mg cafeína).</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-amber-400 font-bold block mb-0.5">2. Acuéstate Ya</span>
              <span className="text-[10px] text-slate-400">No esperes. Cierra los ojos inmediatamente.</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-amber-400 font-bold block mb-0.5">3. Alarma 20 Min</span>
              <span className="text-[10px] text-slate-400">Evita entrar en fase profunda N3 (&gt;25 min).</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-emerald-400 font-bold block mb-0.5">4. ¡Super Alerta!</span>
              <span className="text-[10px] text-slate-400">Despiertas con cafeína + receptores limpios.</span>
            </div>
          </div>
        </div>
      )}

      {/* Circadian Nap Window Calculator */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              Calculadora de la Ventana Circadiana Ideal de Siesta
            </h3>
            <p className="text-xs text-slate-400">
              Dormir fuera de esta ventana interfiere con la presión de sueño nocturna.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-300">Hora habitual de despertar:</span>
            <input
              type="time"
              value={morningWakeTime}
              onChange={(e) => setMorningWakeTime(e.target.value)}
              className="bg-slate-900 border border-amber-500/40 rounded-xl px-3 py-1 text-xs text-amber-300 font-extrabold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 w-full sm:w-auto flex-1">
            <span className="text-slate-400 block mb-0.5">Ventana Circadiana Perfecta para Siesta:</span>
            <span className="text-lg font-extrabold text-amber-300">
              Entre las {napWindow.startStr} y las {napWindow.endStr}
            </span>
          </div>

          <div className="text-[11px] text-slate-400 max-w-md">
            💡 Corresponde al bajón circadiano postprandial natural (temperatura corporal cae ligeramente entre 6 y 8 horas después de levantarte).
          </div>
        </div>
      </div>

      {/* Post-Nap Wake Up Protocol & Inertia Prevention */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-extrabold text-white">
            Protocolo Anti-Inercia para el Momento del Despertar ({selectedNap.title})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
            <Sun className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">1. Exposición Solar Directa</strong>
              <span className="text-slate-400 text-[11px]">Mira hacia la luz o una ventana por 2 minutos para frenar la melatonina.</span>
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
            <Droplets className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">2. Agua Fría en el Rostro</strong>
              <span className="text-slate-400 text-[11px]">Lávate la cara con agua fría para estimular el reflejo de inmersión y alerta.</span>
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200 block mb-0.5">3. Movimiento de 60 Segundos</strong>
              <span className="text-slate-400 text-[11px]">Camina o realiza un ligero estiramiento para elevar el ritmo cardíaco.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nap History Log */}
      {napLogs.length > 0 && (
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-400" />
              Historial Reciente de Siestas Completadas
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">
              ⚡ {napLogs.length} Siestas Registradas
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {napLogs.map((log) => (
              <div key={log.id} className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 shrink-0 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-bold text-white">{log.title}</span>
                <span className="text-[10px] text-slate-500">({log.durationMinutes} min)</span>
                <span className="text-[10px] text-slate-400">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
