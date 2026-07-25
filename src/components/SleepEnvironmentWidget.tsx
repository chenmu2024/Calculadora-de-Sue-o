import React, { useState } from 'react';
import { ShieldCheck, Thermometer, Volume2, EyeOff, Wind, Tv, CheckCircle2, AlertTriangle, Sparkles, Sliders } from 'lucide-react';

export const SleepEnvironmentWidget: React.FC = () => {
  const [temp, setTemp] = useState<number>(20); // Celsius
  const [darkness, setDarkness] = useState<string>('total'); // total, partial, light
  const [noise, setNoise] = useState<string>('quiet'); // quiet, white_noise, noisy
  const [techInBed, setTechInBed] = useState<boolean>(true);
  const [ventilation, setVentilation] = useState<boolean>(true);

  const calculateScore = () => {
    let score = 100;

    // Temp impact (ideal 16-19)
    if (temp > 22) score -= 20;
    else if (temp > 19) score -= 10;
    else if (temp < 15) score -= 10;

    // Light
    if (darkness === 'light') score -= 25;
    if (darkness === 'partial') score -= 12;

    // Noise
    if (noise === 'noisy') score -= 25;

    // Tech
    if (techInBed) score -= 15;

    // Ventilation
    if (!ventilation) score -= 10;

    return Math.max(0, score);
  };

  const score = calculateScore();

  const getScoreBadge = (s: number) => {
    if (s >= 85) {
      return { label: 'Excelente (Santuario del Sueño)', color: 'text-emerald-400 bg-emerald-950 border-emerald-700' };
    }
    if (s >= 65) {
      return { label: 'Aceptable (Pequeños Ajustes)', color: 'text-amber-300 bg-amber-950 border-amber-700' };
    }
    return { label: 'Malo (Inhibidor de Melatonina)', color: 'text-rose-400 bg-rose-950 border-rose-700' };
  };

  const badge = getScoreBadge(score);

  return (
    <section id="evaluador-dormitorio" className="scroll-mt-20 my-10">
      <div className="bg-slate-900/90 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/20 border border-indigo-400/30 rounded-2xl text-indigo-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>Calculadora de Calidad del Dormitorio</span>
                <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                  Entorno 100% Optimizado
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evalúa si la temperatura, iluminación y ruido de tu habitación están favoreciendo o destruyendo tu melatonina.
              </p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-2xl border ${badge.color} text-right self-start sm:self-auto`}>
            <div className="text-[10px] uppercase font-extrabold tracking-wider opacity-80">Puntuación de Dormitorio</div>
            <div className="text-xl font-black flex items-center justify-end gap-1">
              <span>{score} / 100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Temperature Slider */}
            <div className="bg-slate-800/60 border border-slate-700/70 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="temp-range-input" className="text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer">
                  <Thermometer className="w-4 h-4 text-rose-400" />
                  <span>Temperatura del Dormitorio:</span>
                </label>
                <span className="text-xs font-extrabold text-amber-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                  {temp}°C {temp >= 16 && temp <= 19 ? '✓ Ideal (16-19°C)' : temp > 22 ? '⚠️ Demasiado cálido' : ''}
                </span>
              </div>
              <input
                id="temp-range-input"
                aria-label="Temperatura del dormitorio en grados Celsius"
                type="range"
                min="14"
                max="28"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>14°C (Frío)</span>
                <span className="text-emerald-400 font-semibold">18°C (Óptimo)</span>
                <span>28°C (Calor)</span>
              </div>
            </div>

            {/* Darkness level */}
            <div className="bg-slate-800/60 border border-slate-700/70 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-indigo-400" />
                <span>Nivel de Oscuridad:</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'total', label: 'Oscuridad Total', desc: 'Sin LED ni persianas subidas' },
                  { id: 'partial', label: 'Luz Tenue', desc: 'Pequeñas luces/farolas' },
                  { id: 'light', label: 'Mucha Luz', desc: 'Sin persianas o pantallas' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDarkness(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      darkness === item.id
                        ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] opacity-70 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Noise & Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-800/60 border border-slate-700/70 p-4 rounded-2xl space-y-2">
                <label htmlFor="noise-level-select" className="text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer">
                  <Volume2 className="w-4 h-4 text-teal-400" />
                  <span>Nivel de Ruido:</span>
                </label>
                <select
                  id="noise-level-select"
                  aria-label="Nivel de ruido ambiental"
                  value={noise}
                  onChange={(e) => setNoise(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="quiet">Silencio Absoluto (&lt;30 dB)</option>
                  <option value="white_noise">Ruido Blanco / Ventilador Constante</option>
                  <option value="noisy">Ruido Irregular / Tráfico / Ronquidos</option>
                </select>
              </div>

              <div className="bg-slate-800/60 border border-slate-700/70 p-4 rounded-2xl space-y-2 flex flex-col justify-center">
                <label htmlFor="tech-in-bed-checkbox" className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="tech-in-bed-checkbox"
                    aria-label="Uso móvil o televisión en la cama"
                    type="checkbox"
                    checked={techInBed}
                    onChange={(e) => setTechInBed(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-500 bg-slate-900 border-slate-700 focus:ring-indigo-400"
                  />
                  <span className="text-xs text-slate-200 font-semibold">Uso móvil/TV en la cama</span>
                </label>
                <label htmlFor="ventilation-checkbox" className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="ventilation-checkbox"
                    aria-label="Buena ventilación y humedad óptima"
                    type="checkbox"
                    checked={ventilation}
                    onChange={(e) => setVentilation(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-500 bg-slate-900 border-slate-700 focus:ring-indigo-400"
                  />
                  <span className="text-xs text-slate-200 font-semibold">Buena ventilación y humedad (40-60%)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Diagnosis & Tips Side */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Recomendaciones Personalizadas:</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {temp > 21 && (
                  <li className="flex items-start gap-2 bg-rose-950/40 border border-rose-900/50 p-2.5 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>Temperatura Elevada ({temp}°C):</strong> Tu cuerpo necesita bajar 1°C la temperatura central para conciliar el sueño profundo. Enfría la habitación a 17-19°C.</span>
                  </li>
                )}
                {darkness !== 'total' && (
                  <li className="flex items-start gap-2 bg-amber-950/40 border border-amber-900/50 p-2.5 rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Fuga de Luz:</strong> Incluso pequeñas luces LED o luz de farolas suprimen la liberación de melatonina a través de la piel y los párpados.</span>
                  </li>
                )}
                {techInBed && (
                  <li className="flex items-start gap-2 bg-indigo-950/40 border border-indigo-900/50 p-2.5 rounded-xl">
                    <Tv className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span><strong>Luz Azul Pre-Sueño:</strong> Usar el teléfono en la cama retrasa la fase del sueño hasta 90 minutos. Activa el modo filtro nocturno o deja el móvil fuera de alcance.</span>
                  </li>
                )}
                {darkness === 'total' && temp <= 19 && temp >= 16 && !techInBed && (
                  <li className="flex items-start gap-2 bg-emerald-950/40 border border-emerald-900/50 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>¡Tu habitación cumple los 3 pilares biológicos fundamentales! Temperatura ideal, oscuridad total y ausencia de pantallas.</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
              💡 <strong>Dato Científico:</strong> El cuerpo no entra en fase REM profunda si la temperatura ambiente supera los 22°C, ya que la termorregulación se desactiva temporalmente en REM.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
