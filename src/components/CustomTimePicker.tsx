import React from 'react';
import { Clock } from 'lucide-react';

interface CustomTimePickerProps {
  value: string; // Format "HH:mm", e.g., "07:00"
  onChange: (newValue: string) => void;
  id?: string;
  size?: 'normal' | 'large';
  className?: string;
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value,
  onChange,
  id,
  size = 'large',
  className = ''
}) => {
  // Extract hours and minutes from "HH:mm"
  const [currentHour, currentMinute] = (value && value.includes(':'))
    ? value.split(':')
    : ['07', '00'];

  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i.toString().padStart(2, '0');
    // Format label for clarity: e.g. "06:00 (6:00 AM)"
    const period = i < 12 ? 'AM' : 'PM';
    const h12 = i % 12 === 0 ? 12 : i % 12;
    return { value: h, label: `${h}:00 (${h12} ${period})` };
  });

  const minutes = Array.from({ length: 60 }, (_, i) => {
    const m = i.toString().padStart(2, '0');
    return { value: m, label: m };
  });

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newH = e.target.value;
    onChange(`${newH}:${currentMinute || '00'}`);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newM = e.target.value;
    onChange(`${currentHour || '07'}:${newM}`);
  };

  const addMinutesToCurrentTime = (deltaMinutes: number) => {
    const h = parseInt(currentHour || '7', 10);
    const m = parseInt(currentMinute || '0', 10);
    let totalMinutes = h * 60 + m + deltaMinutes;
    // Normalize to 0..1439
    totalMinutes = ((totalMinutes % 1440) + 1440) % 1440;
    const newH = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
    const newM = (totalMinutes % 60).toString().padStart(2, '0');
    onChange(`${newH}:${newM}`);
  };

  if (size === 'normal') {
    return (
      <div className={`flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <select
          id={id ? `${id}-hour` : undefined}
          aria-label="Seleccionar hora"
          value={currentHour}
          onChange={handleHourChange}
          className="bg-transparent text-xs font-bold text-indigo-300 focus:outline-none cursor-pointer text-center"
        >
          {hours.map((h) => (
            <option key={h.value} value={h.value} className="bg-slate-900 text-white">
              {h.value}
            </option>
          ))}
        </select>
        <span className="text-xs font-bold text-slate-400">:</span>
        <select
          id={id ? `${id}-minute` : undefined}
          aria-label="Seleccionar minuto"
          value={currentMinute}
          onChange={handleMinuteChange}
          className="bg-transparent text-xs font-bold text-indigo-300 focus:outline-none cursor-pointer text-center"
        >
          {minutes.map((m) => (
            <option key={m.value} value={m.value} className="bg-slate-900 text-white">
              {m.value}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const hourId = id ? `${id}-hour` : 'time-picker-hour';
  const minuteId = id ? `${id}-minute` : 'time-picker-minute';

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-3 sm:p-4 shadow-inner ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-6 h-6 text-indigo-400 shrink-0 hidden sm:block" />
        
        {/* Hours Selector */}
        <div className="flex flex-col items-center">
          <label htmlFor={hourId} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 cursor-pointer">
            Hora
          </label>
          <select
            id={hourId}
            aria-label="Seleccionar hora"
            value={currentHour}
            onChange={handleHourChange}
            className="bg-slate-950 border border-indigo-500/30 rounded-xl px-3 py-2 text-xl sm:text-2xl font-black text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-center shadow-md min-w-[90px]"
          >
            {hours.map((h) => (
              <option key={h.value} value={h.value} className="bg-slate-900 text-white text-sm">
                {h.label}
              </option>
            ))}
          </select>
        </div>

        <span className="text-2xl sm:text-3xl font-black text-indigo-400 pt-4 animate-pulse">:</span>

        {/* Minutes Selector */}
        <div className="flex flex-col items-center">
          <label htmlFor={minuteId} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 cursor-pointer">
            Minuto
          </label>
          <select
            id={minuteId}
            aria-label="Seleccionar minuto"
            value={currentMinute}
            onChange={handleMinuteChange}
            className="bg-slate-950 border border-indigo-500/30 rounded-xl px-3 py-2 text-xl sm:text-2xl font-black text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-center shadow-md min-w-[75px]"
          >
            {minutes.map((m) => (
              <option key={m.value} value={m.value} className="bg-slate-900 text-white text-sm">
                {m.value} min
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stepper Quick Buttons */}
      <div className="flex items-center gap-1.5 pt-1 sm:pt-4 sm:ml-2 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-3 w-full sm:w-auto justify-center">
        <button
          type="button"
          aria-label="Restar 30 minutos a la hora actual"
          onClick={() => addMinutesToCurrentTime(-30)}
          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700/80 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          title="Restar 30 minutos"
        >
          -30m
        </button>
        <button
          type="button"
          aria-label="Restar 15 minutos a la hora actual"
          onClick={() => addMinutesToCurrentTime(-15)}
          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold transition-colors border border-indigo-900/60 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          title="Restar 15 minutos"
        >
          -15m
        </button>
        <button
          type="button"
          aria-label="Sumar 15 minutos a la hora actual"
          onClick={() => addMinutesToCurrentTime(15)}
          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold transition-colors border border-indigo-900/60 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          title="Sumar 15 minutos"
        >
          +15m
        </button>
        <button
          type="button"
          aria-label="Sumar 30 minutos a la hora actual"
          onClick={() => addMinutesToCurrentTime(30)}
          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors border border-slate-700/80 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          title="Sumar 30 minutos"
        >
          +30m
        </button>
      </div>
    </div>
  );
};
