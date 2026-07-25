import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, CheckCircle2, AlertCircle, Plus, Trash2, Award, Zap, TrendingUp, Download, Tag, FileText, Activity, HelpCircle, BarChart3, Filter, RotateCcw, Compass, Brain, AlertTriangle, Printer } from 'lucide-react';
import { CustomTimePicker } from './CustomTimePicker';

interface SleepEntry {
  id: string;
  date: string; // "YYYY-MM-DD"
  bedTime: string; // "23:00"
  lightsOutLatency: number; // minutes to fall asleep
  wakeTime: string; // "07:00"
  nightAwakeningsMinutes: number; // minutes awake at night
  totalBedHours: number; // e.g. 8.0
  actualSleepHours: number; // e.g. 7.25
  efficiency: number; // e.g. 90.6%
  feelScore: number; // 1 to 5 stars
  tags: string[]; // e.g. ["Cafeína tarde", "Pantallas"]
  notes: string;
}

const COMMON_SLEEP_TAGS = [
  '☕ Cafeína tarde',
  '📱 Pantallas en cama',
  '🍺 Alcohol',
  '🏋️ Ejercicio tarde',
  '🧘 Meditación',
  '📖 Lectura',
  '🌡️ Habitación calurosa',
  '📑 Estrés / Trabajo',
  '🍵 Infusión / Té'
];

export const SleepDiaryWidget: React.FC = () => {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bedTime, setBedTime] = useState<string>('23:00');
  const [latencyMins, setLatencyMins] = useState<number>(15);
  const [wakeTime, setWakeTime] = useState<string>('07:00');
  const [nightAwakenings, setNightAwakenings] = useState<number>(10);
  const [feelScore, setFeelScore] = useState<number>(4);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');

  // CBT-I Prescriber Modal/Card State
  const [showCbtiPrescription, setShowCbtiPrescription] = useState<boolean>(false);
  const [prescribedWakeTime, setPrescribedWakeTime] = useState<string>('07:00');

  // Load saved entries from localStorage
  const loadDefaultDemoEntries = (): SleepEntry[] => {
    const now = Date.now();
    return [
      {
        id: 'mock-1',
        date: new Date(now - 86400000 * 1).toISOString().split('T')[0],
        bedTime: '22:45',
        lightsOutLatency: 15,
        wakeTime: '06:45',
        nightAwakeningsMinutes: 10,
        totalBedHours: 8.0,
        actualSleepHours: 7.58,
        efficiency: 94.8,
        feelScore: 5,
        tags: ['🧘 Meditación', '📖 Lectura'],
        notes: 'Excelente descanso. Me desperté muy fresco.'
      },
      {
        id: 'mock-2',
        date: new Date(now - 86400000 * 2).toISOString().split('T')[0],
        bedTime: '23:30',
        lightsOutLatency: 30,
        wakeTime: '07:00',
        nightAwakeningsMinutes: 20,
        totalBedHours: 7.5,
        actualSleepHours: 6.67,
        efficiency: 88.9,
        feelScore: 4,
        tags: ['☕ Cafeína tarde'],
        notes: 'Cena algo tardía pero buena recuperación.'
      },
      {
        id: 'mock-3',
        date: new Date(now - 86400000 * 3).toISOString().split('T')[0],
        bedTime: '00:15',
        lightsOutLatency: 45,
        wakeTime: '07:30',
        nightAwakeningsMinutes: 30,
        totalBedHours: 7.25,
        actualSleepHours: 6.0,
        efficiency: 82.8,
        feelScore: 3,
        tags: ['📱 Pantallas en cama', '📑 Estrés / Trabajo'],
        notes: 'Tardé en dormirme por revisar el correo en el móvil.'
      },
      {
        id: 'mock-4',
        date: new Date(now - 86400000 * 4).toISOString().split('T')[0],
        bedTime: '23:00',
        lightsOutLatency: 10,
        wakeTime: '07:00',
        nightAwakeningsMinutes: 15,
        totalBedHours: 8.0,
        actualSleepHours: 7.58,
        efficiency: 94.8,
        feelScore: 5,
        tags: ['🍵 Infusión / Té'],
        notes: 'Dormí de un tirón.'
      }
    ];
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('calculadora_sueno_diario');
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        setEntries(loadDefaultDemoEntries());
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveEntries = (newEntries: SleepEntry[]) => {
    setEntries(newEntries);
    try {
      localStorage.setItem('calculadora_sueno_diario', JSON.stringify(newEntries));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetDemoData = () => {
    const demo = loadDefaultDemoEntries();
    saveEntries(demo);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Compute calculated metrics for current input form
  const calculateCurrentMetrics = () => {
    const [bH, bM] = bedTime.split(':').map(Number);
    const [wH, wM] = wakeTime.split(':').map(Number);

    let totalMinutesInBed = (wH * 60 + wM) - (bH * 60 + bM);
    if (totalMinutesInBed <= 0) {
      totalMinutesInBed += 24 * 60; // crossed midnight
    }

    const awakeTotal = latencyMins + nightAwakenings;
    const actualSleepMins = Math.max(0, totalMinutesInBed - awakeTotal);

    const totalBedHours = Number((totalMinutesInBed / 60).toFixed(2));
    const actualSleepHours = Number((actualSleepMins / 60).toFixed(2));
    const efficiency = totalMinutesInBed > 0 ? Number(((actualSleepMins / totalMinutesInBed) * 100).toFixed(1)) : 0;

    return { totalBedHours, actualSleepHours, efficiency };
  };

  const currentMetrics = calculateCurrentMetrics();

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: SleepEntry = {
      id: Date.now().toString(),
      date,
      bedTime,
      lightsOutLatency: latencyMins,
      wakeTime,
      nightAwakeningsMinutes: nightAwakenings,
      totalBedHours: currentMetrics.totalBedHours,
      actualSleepHours: currentMetrics.actualSleepHours,
      efficiency: currentMetrics.efficiency,
      feelScore,
      tags: selectedTags,
      notes
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setNotes('');
    setSelectedTags([]);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((item) => item.id !== id);
    saveEntries(updated);
  };

  const handleExportCSV = () => {
    if (entries.length === 0) return;
    const headers = 'Fecha,Hora Cama,Latencia (min),Hora Despertar,Despertares (min),Horas Cama,Sueño Real,Eficiencia (%),Sensacion,Factores,Notas\n';
    const rows = entries.map((e) => 
      `"${e.date}","${e.bedTime}",${e.lightsOutLatency},"${e.wakeTime}",${e.nightAwakeningsMinutes},${e.totalBedHours},${e.actualSleepHours},${e.efficiency},${e.feelScore},"${e.tags.join('; ')}","${e.notes.replace(/"/g, '""')}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Diario_de_Sueno_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    if (entries.length === 0) return;
    const jsonStr = JSON.stringify(entries, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Copia_Seguridad_Diario_Sueno_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          saveEntries(parsed);
          alert('¡Copia de seguridad restaurada con éxito!');
        } else {
          alert('El archivo cargado no tiene un formato válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handlePrintReport = () => {
    window.print();
  };

  // Aggregated Statistical Metrics
  const avgEfficiencyNum = entries.length > 0
    ? entries.reduce((acc, curr) => acc + curr.efficiency, 0) / entries.length
    : 0;

  const avgEfficiency = avgEfficiencyNum.toFixed(1);

  const avgActualSleepNum = entries.length > 0
    ? entries.reduce((acc, curr) => acc + curr.actualSleepHours, 0) / entries.length
    : 0;

  const avgActualSleep = avgActualSleepNum.toFixed(1);

  const avgLatency = entries.length > 0
    ? Math.round(entries.reduce((acc, curr) => acc + curr.lightsOutLatency, 0) / entries.length)
    : 0;

  // Habit Factor Correlation Analysis
  const getFactorImpactAnalysis = () => {
    if (entries.length === 0) return [];

    const statsMap: { [tag: string]: { count: number; totalEff: number } } = {};
    COMMON_SLEEP_TAGS.forEach(t => {
      statsMap[t] = { count: 0, totalEff: 0 };
    });

    entries.forEach(e => {
      e.tags.forEach(t => {
        if (!statsMap[t]) statsMap[t] = { count: 0, totalEff: 0 };
        statsMap[t].count += 1;
        statsMap[t].totalEff += e.efficiency;
      });
    });

    return Object.entries(statsMap)
      .filter(([_, data]) => data.count > 0)
      .map(([tag, data]) => {
        const avgTagEff = data.totalEff / data.count;
        const diff = avgTagEff - avgEfficiencyNum;
        return {
          tag,
          count: data.count,
          avgTagEff: avgTagEff.toFixed(1),
          diff: diff.toFixed(1),
          isPositive: diff >= 0
        };
      })
      .sort((a, b) => b.count - a.count);
  };

  const factorImpacts = getFactorImpactAnalysis();

  // Calculate CBT-I Prescribed Sleep Restriction Window
  const getCbtiPrescribedWindow = () => {
    // Clinical CBT-I rule: Time In Bed prescribed = Average actual sleep hours + 30 mins (min 6.0 hrs)
    const targetHours = Math.max(6.0, avgActualSleepNum + 0.5);
    const targetMinsTotal = Math.round(targetHours * 60);

    const [wH, wM] = prescribedWakeTime.split(':').map(Number);
    let bedMinsTotal = (wH * 60 + wM) - targetMinsTotal;
    if (bedMinsTotal < 0) bedMinsTotal += 24 * 60;

    const prescribedBedH = Math.floor(bedMinsTotal / 60) % 24;
    const prescribedBedM = bedMinsTotal % 60;
    const prescribedBedStr = `${prescribedBedH.toString().padStart(2, '0')}:${prescribedBedM.toString().padStart(2, '0')}`;

    return {
      targetHours: targetHours.toFixed(1),
      prescribedBedStr
    };
  };

  const cbtiPrescription = getCbtiPrescribedWindow();

  // CBT-I Clinical Interpretation
  const effVal = parseFloat(avgEfficiency);
  let cbtDiagnosis = {
    title: 'Eficiencia Óptima (>90%)',
    color: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-950/40',
    desc: 'Tu tiempo en cama está perfectamente consolidado con tu sueño real. Continúa con tus rutinas actuales.'
  };

  if (effVal >= 85 && effVal < 90) {
    cbtDiagnosis = {
      title: 'Eficiencia Buena (85% - 89%)',
      color: 'text-indigo-300',
      border: 'border-indigo-500/40',
      bg: 'bg-indigo-950/40',
      desc: 'Nivel saludable según los estándares clínicos TCC-I. Mantén horarios constantes para optimizar aún más.'
    };
  } else if (effVal < 85 && entries.length > 0) {
    cbtDiagnosis = {
      title: 'Eficiencia Subóptima (<85%)',
      color: 'text-amber-300',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/40',
      desc: 'Pasas demasiado tiempo despierto en cama. Los especialistas en sueño (TCC-I) recomiendan aplicar restricción del tiempo en cama.'
    };
  }

  return (
    <div id="diario-sueno" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Registro Clínico e Índice de Eficiencia TCC-I</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Diario de Sueño e Índice de Eficiencia
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Calcula la proporción exacta entre el tiempo en cama y el sueño real. Meta clínica: <strong className="text-emerald-400 font-bold">&gt;85% de Eficiencia</strong>.
          </p>
        </div>

        {/* Global Action Buttons & Stats Overview */}
        <div className="flex flex-wrap items-center gap-3">
          {entries.length > 0 && (
            <>
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Exportar datos en formato CSV para Excel/Sheets"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Descargar copia de seguridad en JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Backup JSON</span>
              </button>

              <button
                onClick={handlePrintReport}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Imprimir o guardar PDF del informe para tu médico"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Imprimir PDF</span>
              </button>
            </>
          )}

          <label className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer" title="Importar copia de seguridad previa">
            <Download className="w-3.5 h-3.5 rotate-180 text-indigo-400" />
            <span>Restaurar</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleResetDemoData}
            className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Restablecer datos de ejemplo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Demo Data</span>
          </button>

          <div className="bg-slate-950 border border-indigo-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3">
            <Award className="w-7 h-7 text-amber-300 shrink-0" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Promedio ({entries.length} noches)
              </div>
              <div className="text-xl font-black text-indigo-300">
                {avgEfficiency}% <span className="text-xs font-medium text-slate-400">({avgActualSleep}h sueño)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form for New Night Entry */}
      <form onSubmit={handleAddEntry} className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-indigo-400" />
          <span>Añadir Registro Nocturno</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="diary-date-input" className="block text-xs font-bold text-slate-300 mb-1 cursor-pointer">Fecha de la Noche</label>
            <input
              id="diary-date-input"
              aria-label="Fecha de la noche"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="diary-bedtime-hour" className="block text-xs font-bold text-slate-300 mb-1 cursor-pointer">Hora de Meterme a la Cama</label>
            <CustomTimePicker
              value={bedTime}
              onChange={(val) => setBedTime(val)}
              size="normal"
              id="diary-bedtime"
            />
          </div>

          <div>
            <label htmlFor="diary-latency-input" className="block text-xs font-bold text-slate-300 mb-1 cursor-pointer">Minutos para Dormirme (Latencia)</label>
            <input
              id="diary-latency-input"
              aria-label="Minutos para dormirme"
              type="number"
              min="0"
              max="180"
              value={latencyMins}
              onChange={(e) => setLatencyMins(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="diary-waketime-hour" className="block text-xs font-bold text-slate-300 mb-1 cursor-pointer">Hora de Salir de la Cama</label>
            <CustomTimePicker
              value={wakeTime}
              onChange={(val) => setWakeTime(val)}
              size="normal"
              id="diary-waketime"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label htmlFor="diary-awakenings-input" className="block text-xs font-bold text-slate-300 mb-1 cursor-pointer">Despertares Nocturnos (Minutos totales despierto)</label>
            <input
              id="diary-awakenings-input"
              aria-label="Minutos totales despierto en la noche"
              type="number"
              min="0"
              max="240"
              value={nightAwakenings}
              onChange={(e) => setNightAwakenings(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Sensación de Energía al Despertar (1-5)</label>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`Calificación de energía ${s} de 5`}
                  onClick={() => setFeelScore(s)}
                  className={`w-9 h-8 rounded-lg font-bold text-xs transition-colors ${
                    feelScore === s ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {s}★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="diary-notes-input" className="block text-xs font-bold text-slate-300 mb-1 cursor-pointer">Notas Adicionales</label>
            <input
              id="diary-notes-input"
              aria-label="Notas adicionales de la noche"
              type="text"
              placeholder="Ej. Cena ligera, sonido blanco activo"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Sleep Factors Tag Chips Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            <span>Factores y Hábitos de la Noche (Haz clic para seleccionar):</span>
          </label>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {COMMON_SLEEP_TAGS.map((t) => {
              const isSel = selectedTags.includes(t);
              return (
                <button
                  type="button"
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-semibold border transition-all ${
                    isSel
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Tiempo en Cama</span>
              <span className="text-lg font-bold text-white">{currentMetrics.totalBedHours} hrs</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sueño Real Efectivo</span>
              <span className="text-lg font-bold text-indigo-300">{currentMetrics.actualSleepHours} hrs</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Eficiencia Calculada</span>
              <span className={`text-xl font-black ${currentMetrics.efficiency >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {currentMetrics.efficiency}%
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all shrink-0"
          >
            Guardar en mi Diario
          </button>
        </div>
      </form>

      {/* Visual Efficiency Trend Chart & Clinical Interpretation */}
      {entries.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart Box */}
          <div className="lg:col-span-2 bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span>Tendencia de Eficiencia del Sueño</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Línea Base Clínica: 85%
              </span>
            </div>

            {/* Visual Bar Graph */}
            <div className="h-36 flex items-end justify-between gap-2 pt-4 px-2 border-b border-slate-800">
              {entries.slice(0, 10).reverse().map((item) => (
                <div key={item.id} className="flex-1 flex flex-col items-center gap-1 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-slate-900 text-white text-[10px] p-1.5 rounded border border-slate-700 z-10 whitespace-nowrap shadow-xl">
                    <span>{item.date}</span>
                    <span className="font-bold text-amber-300">{item.efficiency}% ({item.actualSleepHours}h)</span>
                  </div>

                  <div className="w-full bg-slate-800 h-28 rounded-t-lg flex items-end overflow-hidden">
                    <div
                      style={{ height: `${item.efficiency}%` }}
                      className={`w-full transition-all rounded-t-lg ${
                        item.efficiency >= 85 ? 'bg-gradient-to-t from-indigo-600 to-emerald-400' : 'bg-gradient-to-t from-amber-700 to-amber-400'
                      }`}
                    />
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono truncate max-w-[40px]">{item.date.substring(5)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Promedio de Latencia para dormirse: <strong className="text-white">{avgLatency} min</strong></span>
              <span>Promedio de Sueño Real: <strong className="text-indigo-300">{avgActualSleep} horas</strong></span>
            </div>
          </div>

          {/* CBT-I Clinical Diagnosis Card */}
          <div className={`${cbtDiagnosis.bg} border ${cbtDiagnosis.border} p-5 rounded-2xl flex flex-col justify-between space-y-3`}>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-amber-300" />
                <span>Diagnóstico TCC-I</span>
              </div>
              <h4 className={`text-base font-black ${cbtDiagnosis.color}`}>
                {cbtDiagnosis.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {cbtDiagnosis.desc}
              </p>
            </div>

            <button
              onClick={() => setShowCbtiPrescription(!showCbtiPrescription)}
              className="w-full px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Brain className="w-4 h-4 text-amber-300" />
              <span>{showCbtiPrescription ? 'Ocultar Prescripción' : 'Calcular Ventana de Restricción TCC-I'}</span>
            </button>
          </div>
        </div>
      )}

      {/* CBT-I Prescribed Sleep Window Restriction Tool */}
      {showCbtiPrescription && (
        <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-2xl p-5 space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-900/60 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Prescripción TCC-I de Restricción del Tiempo en Cama</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                La técnica TCC-I más efectiva para consolidar el sueño: limita el tiempo en cama a tu capacidad real de dormir.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">Hora objetivo de despertar:</span>
              <CustomTimePicker
                value={prescribedWakeTime}
                onChange={(val) => setPrescribedWakeTime(val)}
                size="small"
                id="cbti-wake-time"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">Sueño Real Promedio</span>
              <span className="text-lg font-black text-white">{avgActualSleep} horas</span>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">Tiempo en Cama Prescrito</span>
              <span className="text-lg font-black text-indigo-300">{cbtiPrescription.targetHours} horas max</span>
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-xl border border-amber-500/40">
              <span className="text-amber-300 block text-[10px] uppercase font-bold mb-0.5">Hora Exacta de Acostarse</span>
              <span className="text-xl font-black text-amber-300">A las {cbtiPrescription.prescribedBedStr}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            ⚠️ <strong>Instrucciones clínicas:</strong> No te acuestes antes de las <strong>{cbtiPrescription.prescribedBedStr}</strong> aunque tengas sueño. Cuando tu eficiencia supere el 90% durante 5 noches seguidas, adelanta la hora de acostarte 15 minutos.
          </p>
        </div>
      )}

      {/* Habit Factor Impact Analysis (Dynamic Correlation) */}
      {factorImpacts.length > 0 && (
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Análisis de Impacto de Hábitos en Tu Eficiencia</span>
          </h3>
          <p className="text-xs text-slate-400">
            Correlación directa basada en las {entries.length} noches registradas en tu diario:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs pt-1">
            {factorImpacts.map((item) => (
              <div key={item.tag} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">{item.tag}</span>
                  <span className="text-[10px] text-slate-400">{item.count} noches registradas</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-white block">{item.avgTagEff}%</span>
                  <span className={`text-[10px] font-bold ${item.isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {item.isPositive ? `+${item.diff}%` : `${item.diff}%`} vs promedio
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Log List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span>Historial de Registros de Sueño</span>
          <span className="text-xs text-slate-400 font-normal">{entries.length} días guardados</span>
        </h3>

        {entries.length === 0 ? (
          <div className="text-center py-8 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No tienes registros aún. Completa el formulario superior para añadir tu primera noche.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                    entry.efficiency >= 85 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {entry.efficiency}%
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{entry.date}</span>
                      <span className="text-[10px] text-amber-300 bg-amber-950 px-2 py-0.2 rounded font-bold">
                        {entry.feelScore}★ Energía
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 flex items-center gap-3 flex-wrap">
                      <span>Cama: {entry.bedTime} → {entry.wakeTime} ({entry.totalBedHours}h)</span>
                      <span className="text-indigo-300 font-semibold">Sueño Real: {entry.actualSleepHours}h</span>
                      <span className="text-slate-500">Latencia: {entry.lightsOutLatency}m</span>
                    </div>

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {entry.tags.map((tg) => (
                          <span key={tg} className="text-[10px] bg-slate-900 border border-slate-800 text-indigo-300 px-2 py-0.5 rounded-md">
                            {tg}
                          </span>
                        ))}
                      </div>
                    )}

                    {entry.notes && (
                      <p className="text-[11px] text-slate-400 italic">"{entry.notes}"</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="text-xs text-slate-500 hover:text-rose-400 p-2 rounded-lg transition-colors self-end sm:self-center"
                  title="Eliminar registro"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
