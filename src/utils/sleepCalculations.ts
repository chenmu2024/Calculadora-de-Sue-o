import { SleepCycleResult } from '../types';

export function calculateSleepTimes(
  mode: 'wake_time' | 'bed_time' | 'sleep_now',
  inputTime: string, // "07:00" in 24h format or current time
  latencyMinutes: number = 15,
  cycleLengthMinutes: number = 90
): SleepCycleResult[] {
  let baseDate = new Date();
  
  if (mode === 'wake_time' || mode === 'bed_time') {
    const [hoursStr, minsStr] = inputTime.split(':');
    const hours = parseInt(hoursStr, 10);
    const mins = parseInt(minsStr, 10);
    baseDate.setHours(hours, mins, 0, 0);
  } else {
    // sleep_now: use current time
    baseDate = new Date();
  }

  const results: SleepCycleResult[] = [];
  const cycleCountList = [6, 5, 4, 3, 2]; // Ordered by ideal to minimum

  cycleCountList.forEach((cycles) => {
    const targetDate = new Date(baseDate.getTime());
    const sleepDurationMins = cycles * cycleLengthMinutes;
    const totalWithLatencyMins = sleepDurationMins + latencyMinutes;

    if (mode === 'wake_time') {
      // Subtract sleep duration + latency to get bedtime
      targetDate.setMinutes(targetDate.getMinutes() - totalWithLatencyMins);
    } else {
      // bed_time or sleep_now: Add latency + sleep duration to get wake time
      targetDate.setMinutes(targetDate.getMinutes() + totalWithLatencyMins);
    }

    const hours24 = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    const time24 = `${hours24}:${minutes}`;

    // Format 12h time string with AM/PM
    const time12 = targetDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toUpperCase();

    const hoursTotal = Math.round((sleepDurationMins / 60) * 10) / 10;
    const hNum = Math.floor(sleepDurationMins / 60);
    const mNum = sleepDurationMins % 60;
    const hoursFormatted = `${hNum}h ${mNum.toString().padStart(2, '0')}m`;

    let qualityTag: SleepCycleResult['qualityTag'] = 'good';
    let badgeText = `${cycles} Ciclos (${hoursTotal}h)`;
    let description = '';
    let vitalityScore = 80;

    if (cycles === 6) {
      qualityTag = 'recommended';
      vitalityScore = 100;
      badgeText = `6 Ciclos (${hoursTotal}h - Máximo Descanso)`;
      description = 'Ideal para jóvenes, deportistas y personas que recuperan sueño o realizan gran esfuerzo físico.';
    } else if (cycles === 5) {
      qualityTag = 'optimal';
      vitalityScore = 95;
      badgeText = `5 Ciclos (${hoursTotal}h - ¡Recomendado Óptimo!)`;
      description = 'El estándar de oro para el 90% de los adultos sanos. Te despertarás revitalizado sin inercia de sueño.';
    } else if (cycles === 4) {
      qualityTag = 'good';
      vitalityScore = 75;
      badgeText = `4 Ciclos (${hoursTotal}h - Mínimo Aceptable)`;
      description = 'Adecuado para días de ritmo acelerado. No se recomienda mantener menos de 5 ciclos de forma prolongada.';
    } else if (cycles === 3) {
      qualityTag = 'minimum';
      vitalityScore = 50;
      badgeText = `3 Ciclos (${hoursTotal}h - Ligero)`;
      description = 'Solo para emergencias u horarios reducidos. Experimentarás cansancio vespertino.';
    } else {
      qualityTag = 'short';
      vitalityScore = 30;
      badgeText = `2 Ciclos (${hoursTotal}h - Insuficiente)`;
      description = 'Corta duración. Posible déficit acumulado e inercia de sueño.';
    }

    results.push({
      time: time12,
      time24,
      cycles,
      cycleLengthMinutes,
      vitalityScore,
      totalMinutes: totalWithLatencyMins,
      hours: hoursTotal,
      hoursFormatted,
      qualityTag,
      badgeText,
      description
    });
  });

  return results;
}

// Generate Google Calendar Web Link
export function getGoogleCalendarUrl(
  title: string,
  timeStr24: string,
  description: string
): string {
  const now = new Date();
  const [h, m] = timeStr24.split(':').map((v) => parseInt(v, 10));
  const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);

  if (eventDate < now) {
    eventDate.setDate(eventDate.getDate() + 1);
  }

  const endDate = new Date(eventDate.getTime() + 15 * 60000);

  const formatGCalDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const datesStr = `${formatGCalDate(eventDate)}/${formatGCalDate(endDate)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    dates: datesStr
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// Generate ICAL file content for alarm / calendar reminder
export function downloadCalendarEvent(
  title: string,
  timeStr24: string,
  description: string
) {
  const now = new Date();
  const [h, m] = timeStr24.split(':').map((v) => parseInt(v, 10));
  const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);

  // If time is earlier today, set for tomorrow
  if (eventDate < now) {
    eventDate.setDate(eventDate.getDate() + 1);
  }

  const formatDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const startIso = formatDate(eventDate);
  const endDate = new Date(eventDate.getTime() + 15 * 60000); // 15 mins
  const endIso = formatDate(endDate);

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CalculadoraDeSueno//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
DTSTART:${startIso}
DTEND:${endIso}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT10M
ACTION:DISPLAY
DESCRIPTION:Recordatorio de Ciclo de Sueño
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'recordatorio-sueno.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
