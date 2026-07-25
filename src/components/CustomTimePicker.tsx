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

  if (size === 'normal') {
    return (
      <div className={`flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-xl px-2 py-1.5 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <select
          id={id ? `${id}-hour` : undefined}
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

  return (
    <div className={`flex items-center justify-center gap-2 bg-slate-900 border-2 border-indigo-500/40 rounded-2xl p-3 shadow-inner ${className}`}>
      <Clock className="w-6 h-6 text-indigo-400 shrink-0 hidden sm:block" />
      
      {/* Hours Selector */}
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hora</span>
        <select
          id={id ? `${id}-hour` : 'time-picker-hour'}
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
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Minuto</span>
        <select
          id={id ? `${id}-minute` : 'time-picker-minute'}
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
  );
};
