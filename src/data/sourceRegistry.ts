export interface EditorialSource {
  id: string;
  name: string;
  organization: string;
  url: string;
  supports: string;
  checkedDate: string;
}

export const EDITORIAL_SOURCES: EditorialSource[] = [
  {
    id: 'nhlbi-stages',
    name: 'Cómo funciona el sueño: fases y etapas',
    organization: 'National Heart, Lung, and Blood Institute (NIH)',
    url: 'https://www.nhlbi.nih.gov/es/salud/sueno/estadios-del-sueno',
    supports: 'Los ciclos de sueño se reinician aproximadamente cada 80 a 100 minutos y suelen repetirse de 4 a 6 veces por noche.',
    checkedDate: '2026-10-07'
  },
  {
    id: 'aasm-adult-duration',
    name: 'Recommended Amount of Sleep for a Healthy Adult',
    organization: 'American Academy of Sleep Medicine / Sleep Research Society',
    url: 'https://aasm.org/resources/pdf/adultsleepdurationconsensus.pdf',
    supports: 'Los adultos deberían dormir 7 o más horas por noche de forma regular; la necesidad individual puede variar.',
    checkedDate: '2026-10-07'
  },
  {
    id: 'aasm-child-duration',
    name: 'Child Sleep Duration Health Advisory',
    organization: 'American Academy of Sleep Medicine',
    url: 'https://aasm.org/advocacy/position-statements/child-sleep-duration-health-advisory/',
    supports: 'Rangos de sueño por edad: 4-12 meses 12-16 h; 1-2 años 11-14 h; 3-5 años 10-13 h; 6-12 años 9-12 h; adolescentes 8-10 h.',
    checkedDate: '2026-10-07'
  },
  {
    id: 'nhlbi-circadian',
    name: 'How Sleep Works: Your Sleep/Wake Cycle',
    organization: 'National Heart, Lung, and Blood Institute (NIH)',
    url: 'https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle',
    supports: 'El ritmo circadiano, la luz, la oscuridad, los horarios y la presión homeostática participan en el sueño y la vigilia.',
    checkedDate: '2026-10-07'
  }
];

export const getEditorialSource = (id: string) =>
  EDITORIAL_SOURCES.find((source) => source.id === id);
