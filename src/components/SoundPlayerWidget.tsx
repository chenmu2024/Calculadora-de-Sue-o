import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square, Timer, Waves, CloudRain, Sparkles, Sliders, Trees, Headphones, Heart, Wind, HelpCircle, ShieldCheck } from 'lucide-react';
import { sleepAudio } from '../utils/audioSynthesizer';

type SoundType = 'white' | 'pink' | 'brown' | 'green' | 'rain' | 'ocean' | 'binaural';

export const SoundPlayerWidget: React.FC = () => {
  const [activeSound, setActiveSound] = useState<SoundType | null>(null);
  const [volume, setVolume] = useState<number>(0.4);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(30);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);
  const [showBreathingGuide, setShowBreathingGuide] = useState<boolean>(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhala' | 'Mantén' | 'Exhala'>('Inhala');
  const [breathingCount, setBreathingCount] = useState<number>(4);

  // 4-7-8 Breathing Timer Loop
  useEffect(() => {
    let breathInterval: any = null;
    if (showBreathingGuide) {
      let currentPhase: 'Inhala' | 'Mantén' | 'Exhala' = 'Inhala';
      let count = 4;

      breathInterval = setInterval(() => {
        count--;
        if (count <= 0) {
          if (currentPhase === 'Inhala') {
            currentPhase = 'Mantén';
            count = 7;
          } else if (currentPhase === 'Mantén') {
            currentPhase = 'Exhala';
            count = 8;
          } else {
            currentPhase = 'Inhala';
            count = 4;
          }
        }
        setBreathingPhase(currentPhase);
        setBreathingCount(count);
      }, 1000);
    }

    return () => {
      if (breathInterval) clearInterval(breathInterval);
    };
  }, [showBreathingGuide]);

  // Main countdown timer effect with smooth fade out
  useEffect(() => {
    let interval: any = null;
    if (activeSound && timeLeftSeconds !== null && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev === null || prev <= 1) {
            sleepAudio.fadeAndStop(3, () => {
              setActiveSound(null);
            });
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSound, timeLeftSeconds]);

  const handleToggleSound = (type: SoundType) => {
    if (activeSound === type) {
      sleepAudio.fadeAndStop(2, () => {
        setActiveSound(null);
        setTimeLeftSeconds(null);
      });
    } else {
      sleepAudio.playSound(type, volume);
      setActiveSound(type);
      if (timerMinutes) {
        setTimeLeftSeconds(timerMinutes * 60);
      } else {
        setTimeLeftSeconds(null);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    sleepAudio.setVolume(newVol);
  };

  const sounds: { id: SoundType; name: string; desc: string; icon: any; isNew?: boolean }[] = [
    { id: 'brown', name: 'Ruido Marrón', desc: 'Frecuencia grave profunda ideal para calmar pensamientos rumiantes.', icon: Waves, isNew: true },
    { id: 'green', name: 'Ruido Verde', desc: 'Frecuencias medias naturales (~500Hz) similares a bosques y ríos.', icon: Trees, isNew: true },
    { id: 'pink', name: 'Ruido Rosa', desc: 'Frecuencia equilibrada más suave que imita brisa y hojas.', icon: Sparkles },
    { id: 'rain', name: 'Lluvia Relajante', desc: 'Filtro continuo para aislar ruidos y promover ondas Alfa.', icon: CloudRain },
    { id: 'ocean', name: 'Olas del Mar', desc: 'Modulación rítmica de 8s para acompasar con la respiración.', icon: Waves },
    { id: 'binaural', name: 'Ondas Delta (2.5 Hz)', desc: 'Sincronización hemisférica profunda (requiere auriculares).', icon: Timer },
    { id: 'white', name: 'Ruido Blanco', desc: 'Aislamiento acústico total para bloquear ruidos repentinos.', icon: Waves },
  ];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="reproductor-sonidos" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl relative overflow-hidden space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800 mb-2">
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Generador Sintetizado de Ruido Blanco y Relajación</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Sonidos Sintetizados para Reducir la Latencia de Sueño
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Escucha frecuencias ambientales sintetizadas en tiempo real directamente en tu navegador para inducir el sueño en menos de 15 minutos.
          </p>
        </div>

        {/* Volume & Timer Controls */}
        <div className="flex flex-wrap items-center gap-4 bg-slate-800/80 p-3 rounded-2xl border border-slate-700 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <label htmlFor="sound-volume-slider" className="cursor-pointer">
              <Volume2 className="w-4 h-4 text-slate-400" />
            </label>
            <input
              id="sound-volume-slider"
              aria-label="Control de volumen de sonido"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4 text-slate-400" />
            {[15, 30, 60].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setTimerMinutes(m);
                  if (activeSound) setTimeLeftSeconds(m * 60);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  timerMinutes === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Countdown display & visual progress bar if active */}
      {activeSound && timeLeftSeconds !== null && (
        <div className="bg-indigo-950/80 border border-indigo-500/50 rounded-2xl p-4 space-y-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="text-xs text-slate-200 font-semibold">
                Sonido activo con <strong className="text-emerald-300">desvanecimiento progresivo final</strong>. Apagado automático en:
              </span>
            </div>
            <span className="text-lg font-black text-amber-300 font-mono self-end sm:self-auto">
              {formatTime(timeLeftSeconds)}
            </span>
          </div>

          {/* Visual Progress Bar */}
          {timerMinutes && (
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-indigo-900/50">
              <div
                className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-300 h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(0, Math.min(100, (timeLeftSeconds / (timerMinutes * 60)) * 100))}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Quick Preset Selector */}
      <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Presets Rápidos de Relajación Recomendados:</span>
          </span>
          <span className="text-[10px] text-slate-400 font-normal">1-Clic para iniciar</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: '🌧️ Lluvia Nocturna', sound: 'rain' as SoundType },
            { label: '🟤 Marrón Anti-Rumia', sound: 'brown' as SoundType },
            { label: '🍃 Bosque Zen', sound: 'green' as SoundType },
            { label: '🌊 Olas del Mar', sound: 'ocean' as SoundType },
            { label: '🎧 Delta 2.5Hz (REM)', sound: 'binaural' as SoundType },
          ].map((preset) => (
            <button
              key={preset.sound}
              onClick={() => handleToggleSound(preset.sound)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                activeSound === preset.sound
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sounds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sounds.map((s) => {
          const Icon = s.icon;
          const isPlayingThis = activeSound === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleToggleSound(s.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isPlayingThis
                  ? 'bg-gradient-to-b from-indigo-600 to-violet-700 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-5 h-5 ${isPlayingThis ? 'text-amber-300' : 'text-indigo-400'}`} />
                    {s.isNew && (
                      <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800">
                        Nuevo
                      </span>
                    )}
                  </div>
                  {isPlayingThis ? (
                    <Square className="w-4 h-4 text-rose-300 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="font-bold text-sm text-white mb-1">{s.name}</div>
                <div className="text-[11px] opacity-80 leading-snug">{s.desc}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-700/40 text-[10px] font-semibold tracking-wider uppercase opacity-90">
                {isPlayingThis ? '► Reproduciendo' : 'Haz clic para activar'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive 4-7-8 Breathing Guide Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-extrabold text-white">
              Guía Visual Acompañante de Respiración 4-7-8
            </h3>
          </div>
          <button
            onClick={() => setShowBreathingGuide(!showBreathingGuide)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-300 border border-slate-700 transition-colors"
          >
            {showBreathingGuide ? 'Ocultar Guía' : 'Iniciar Guía 4-7-8'}
          </button>
        </div>

        {showBreathingGuide && (
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2 pb-2 bg-slate-900/90 rounded-2xl p-6 border border-slate-800">
            <div className="relative flex items-center justify-center w-32 h-32">
              <div
                className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                  breathingPhase === 'Inhala'
                    ? 'scale-110 border-sky-400 bg-sky-500/20 shadow-lg shadow-sky-500/30'
                    : breathingPhase === 'Mantén'
                    ? 'scale-100 border-amber-400 bg-amber-500/20'
                    : 'scale-75 border-indigo-500 bg-indigo-500/20'
                }`}
              />
              <div className="text-center z-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-300 block">
                  {breathingPhase}
                </span>
                <span className="text-3xl font-black text-white font-mono">
                  {breathingCount}s
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 max-w-sm">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>¿Cómo funciona el método 4-7-8?</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                Diseñado por el Dr. Andrew Weil: activa la respuesta parasimpática reduciendo el ritmo cardíaco y disminuyendo el nivel de cortisol para dormirte más rápido.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Scientific Info & Headphones Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
          <Headphones className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Aviso sobre Ondas Delta Binaurales</span>
            <p className="text-slate-400 leading-relaxed">
              Las ondas binaurales requieren <strong>auriculares estéreo</strong> para enviar frecuencias ligeramente distintas a cada oído (ej. 200Hz y 202.5Hz), creando la pulsación percibida de 2.5Hz en el cerebro.
            </p>
          </div>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Tecnología 100% Local en Tiempo Real</span>
            <p className="text-slate-400 leading-relaxed">
              Todos los sonidos se sintetizan mediante la Web Audio API de tu navegador. No consume ancho de banda de descargas ni datos móviles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
