import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, Flame, Moon, Coffee, Utensils, Laptop, Smartphone, Volume2, Sparkles } from 'lucide-react';

interface ChecklistItem {
  id: string;
  rule: string;
  targetTime: string;
  title: string;
  description: string;
  icon: any;
  category: string;
}

const HYGIENE_RULES: ChecklistItem[] = [
  {
    id: 'rule-10',
    rule: '10 Horas Antes',
    targetTime: '13:00 (si te duermes a las 23:00)',
    title: 'Cero Cafeína o Estimulantes',
    description: 'La vida media de la cafeína es de 5 a 8 horas en el hígado. Evita café, teína, bebidas energéticas o pre-entrenos.',
    icon: Coffee,
    category: 'Estimulantes'
  },
  {
    id: 'rule-3',
    rule: '3 Horas Antes',
    targetTime: '20:00 (si te duermes a las 23:00)',
    title: 'Cero Comidas Pesadas y Alcohol',
    description: 'La digestión activa eleva la temperatura corporal e impide entrar en la Fase N3 de sueño profundo. El alcohol fragmenta la Fase REM.',
    icon: Utensils,
    category: 'Alimentación'
  },
  {
    id: 'rule-2',
    rule: '2 Horas Antes',
    targetTime: '21:00 (si te duermes a las 23:00)',
    title: 'Cero Trabajo o Tareas Estresantes',
    description: 'Desconecta el cerebro de emails y listas de pendientes para reducir los niveles de cortisol y preparar el tono vagal parasimpático.',
    icon: Laptop,
    category: 'Estrés'
  },
  {
    id: 'rule-1',
    rule: '1 Hora Antes',
    targetTime: '22:00 (si te duermes a las 23:00)',
    title: 'Cero Pantallas y Luz Azul',
    description: 'La luz azul de 480nm destruye la síntesis natural de melatonina en la glándula pineal. Cambia a luces cálidas de baja intensidad.',
    icon: Smartphone,
    category: 'Ritmo Circadiano'
  },
  {
    id: 'rule-0',
    rule: '0 Veces',
    targetTime: 'Al Despertar',
    title: 'Cero Botón Snooze (Postponer Alarma)',
    description: 'Postponer la alarma 9 minutos fragmenta un nuevo ciclo de sueño, provocando una inercia de sueño severa durante toda la mañana.',
    icon: Moon,
    category: 'Inercia'
  }
];

export const SleepHygieneChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = HYGIENE_RULES.length;
  const scorePercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div id="regla-10-3-2-1-0" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Método Científico de Preparación Nocturna</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            La Regla de Oro 10-3-2-1-0 para la Higiene del Sueño
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Marca las pautas que has cumplido hoy para optimizar la entrada en la Fase N1 en menos de 15 minutos.
          </p>
        </div>

        {/* Score indicator */}
        <div className="bg-slate-950 border border-indigo-500/30 p-4 rounded-2xl flex items-center gap-3 shrink-0">
          <Flame className={`w-8 h-8 ${scorePercent === 100 ? 'text-amber-300 animate-bounce' : 'text-indigo-400'}`} />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Puntuación de Preparación Nocturna
            </div>
            <div className="text-2xl font-black text-amber-300">
              {completedCount} / {totalCount} ({scorePercent}%)
            </div>
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HYGIENE_RULES.map((item) => {
          const isChecked = !!checkedItems[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isChecked
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                    {item.rule}
                  </span>
                  <div className="text-emerald-400">
                    {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-slate-600" />}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] text-indigo-300 font-semibold">{item.targetTime}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                <span>Categoría: {item.category}</span>
                <span className={isChecked ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isChecked ? '¡Cumplido!' : 'Pendiente'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
