import React, { useState } from 'react';
import { Coffee, AlertTriangle, CheckCircle2, Clock, Zap, ShieldAlert, BookOpen } from 'lucide-react';
import { CustomTimePicker } from './CustomTimePicker';

interface Beverage {
  id: string;
  name: string;
  caffeineMg: number;
  icon: string;
}

const BEVERAGES: Beverage[] = [
  { id: 'espresso', name: 'Café Espresso / Cortado', caffeineMg: 80, icon: '☕' },
  { id: 'coffee-cup', name: 'Taza de Café Filtrado (250ml)', caffeineMg: 120, icon: '☕' },
  { id: 'energy', name: 'Bebida Energética (Red Bull / Monster)', caffeineMg: 160, icon: '⚡' },
  { id: 'tea', name: 'Té Negro / Té Verde (Taza)', caffeineMg: 45, icon: '🍵' },
  { id: 'pre-workout', name: 'Pre-entreno Deportivo (1 scoop)', caffeineMg: 200, icon: '🏋️' },
  { id: 'soda', name: 'Refresco de Cola (330ml)', caffeineMg: 35, icon: '🥤' }
];

export const CaffeineCalculatorWidget: React.FC = () => {
  const [selectedBev, setSelectedBev] = useState<string>('coffee-cup');
  const [customMg, setCustomMg] = useState<number>(120);
  const [drinkTime, setDrinkTime] = useState<string>('16:00'); // 4:00 PM
  const [bedTime, setBedTime] = useState<string>('23:00');   // 11:00 PM

  // Calculate caffeine remaining at bedtime
  const calculateResidualCaffeine = () => {
    const [dH, dM] = drinkTime.split(':').map(Number);
    const [bH, bM] = bedTime.split(':').map(Number);

    let drinkMinutes = dH * 60 + dM;
    let bedMinutes = bH * 60 + bM;

    // Handle cross-midnight bedtime
    if (bedMinutes <= drinkMinutes) {
      bedMinutes += 24 * 60;
    }

    const diffHours = (bedMinutes - drinkMinutes) / 60;
    
    const dose = selectedBev === 'custom' 
      ? customMg 
      : (BEVERAGES.find(b => b.id === selectedBev)?.caffeineMg || 100);

    // Pharmacokinetic exponential decay: C(t) = C0 * (0.5)^(t / 5.7)
    const halfLife = 5.7; // average caffeine half-life in adult humans
    const residual = dose * Math.pow(0.5, diffHours / halfLife);

    // Calculate cutoff time for < 20mg remaining
    // 20 = dose * (0.5)^(hours / 5.7) => hours = 5.7 * log2(dose / 20)
    let hoursNeeded = 0;
    if (dose > 20) {
      hoursNeeded = halfLife * (Math.log(dose / 20) / Math.log(2));
    }

    let cutoffMinutes = bedMinutes - hoursNeeded * 60;
    if (cutoffMinutes < 0) cutoffMinutes += 24 * 60;
    cutoffMinutes = cutoffMinutes % (24 * 60);

    const cutoffH = Math.floor(cutoffMinutes / 60).toString().padStart(2, '0');
    const cutoffM = Math.floor(cutoffMinutes % 60).toString().padStart(2, '0');

    return {
      diffHours: diffHours.toFixed(1),
      residualMg: Math.round(residual),
      dose,
      recommendedCutoff: `${cutoffH}:${cutoffM}`,
      hoursNeeded: hoursNeeded.toFixed(1)
    };
  };

  const result = calculateResidualCaffeine();

  const getImpactStatus = (mg: number) => {
    if (mg < 25) {
      return {
        level: 'Óptimo',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        badge: 'Sin impacto en fase N3 Deep',
        desc: 'El nivel residual de cafeína es lo suficientemente bajo como para no alterar la arquitectura del sueño ni reducir la fase de sueño profundo (Slow-Wave Sleep).'
      };
    } else if (mg < 50) {
      return {
        level: 'Moderado',
        color: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
        badge: 'Riesgo de fragmentación leve',
        desc: 'Podrías conciliar el sueño, pero la cafeína residual reducirá el porcentaje de sueño profundo de la primera mitad de la noche.'
      };
    } else {
      return {
        level: 'Crítico',
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        badge: 'Sombra de Cafeína Activa',
        desc: 'La cafeína bloquea activamente tus receptores de adenosina en el cerebro. Provocará latencia prolongada y microdespertares no conscientes.'
      };
    }
  };

  const impact = getImpactStatus(result.residualMg);

  return (
    <div id="calculadora-cafeina" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Coffee className="w-3.5 h-3.5" />
            <span>Farmacocinética de la Cafeína y Adenosina</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Calculadora de Impacto de Cafeína en el Sueño
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            La cafeína tiene una vida media promedio de 5.7 horas. Descubre cuánta cafeína activa quedará en tu cerebro a la hora de dormir.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Selecciona tu bebida con cafeína
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BEVERAGES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBev(b.id)}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                    selectedBev === b.id
                      ? 'bg-indigo-950 border-indigo-500 text-white font-bold shadow-md ring-1 ring-indigo-500'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <div className="truncate font-semibold">{b.name}</div>
                    <div className="text-[10px] text-amber-400 font-bold">{b.caffeineMg} mg cafeína</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                2. Hora a la que consumiste la bebida
              </label>
              <CustomTimePicker
                value={drinkTime}
                onChange={setDrinkTime}
                size="normal"
                id="drink-time"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                3. Hora planificada para dormir
              </label>
              <CustomTimePicker
                value={bedTime}
                onChange={setBedTime}
                size="normal"
                id="bedtime-caffeine"
              />
            </div>
          </div>

          {/* Scientific Info Box */}
          <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 text-slate-400 text-xs space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Fundamento Médico (SNC y Receptores A1/A2A)</span>
            </div>
            <p className="leading-relaxed">
              La cafeína no elimina el cansancio; es un antagonista competitivo que se acopla a los receptores de adenosina impidiendo que la presión homeostática de sueño envíe la señal de fatiga al córtex.
            </p>
          </div>
        </div>

        {/* Output Results */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Resultado al momento de acostarte
            </div>
            
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black text-white">{result.residualMg}</span>
              <span className="text-xl font-bold text-amber-300">mg residuales activas</span>
            </div>

            <div className="text-xs text-slate-400 mb-4">
              Consumiste {result.dose} mg de cafeína {result.diffHours} horas antes de ir a la cama.
            </div>

            {/* Impact Badge */}
            <div className={`p-4 rounded-2xl border ${impact.color} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Impacto: {impact.level}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-950/60 border border-current">
                  {impact.badge}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {impact.desc}
              </p>
            </div>
          </div>

          {/* Recommended Cutoff Advice */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Hora límite de café recomendada hoy:</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-emerald-400">
                  Antes de las {result.recommendedCutoff}
                </div>
                <div className="text-[11px] text-slate-400">
                  (Se requieren {result.hoursNeeded} h previas para eliminar la mayor parte de los {result.dose} mg)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
