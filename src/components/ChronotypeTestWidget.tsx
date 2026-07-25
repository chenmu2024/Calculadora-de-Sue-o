import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, RotateCcw, Clock, Sun, Moon, Feather, AlertCircle, Share2 } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: 'alondra' | 'buho' | 'colibri'; // Morning Lark, Night Owl, Hummingbird/Intermediate
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Si tuvieras el día completamente libre de compromisos, ¿a qué hora preferirías despertarte de forma natural?',
    options: [
      { text: 'Entre las 05:00 y las 07:00 de la mañana (fresco y despejado)', score: 'alondra' },
      { text: 'Entre las 07:30 y las 09:30 de la mañana', score: 'colibri' },
      { text: 'Pasadas las 10:00 de la mañana o al mediodía', score: 'buho' }
    ]
  },
  {
    id: 2,
    question: '¿En qué momento del día sientes que tu pico de energía y concentración intelectual es máximo?',
    options: [
      { text: 'Durante las primeras horas de la mañana (8:00 - 11:00)', score: 'alondra' },
      { text: 'A mitad de la tarde (14:00 - 17:00)', score: 'colibri' },
      { text: 'Por la noche, a partir de las 20:00 o la madrugada', score: 'buho' }
    ]
  },
  {
    id: 3,
    question: '¿Cómo te sientes durante la primera media hora después de despertarte?',
    options: [
      { text: 'Totalmente despierto y listo para tomar un desayuno fuerte', score: 'alondra' },
      { text: 'Ligeramente somnoliento, pero activo tras lavarme la cara o tomar agua', score: 'colibri' },
      { text: 'Aturdido, necesito café urgente y al menos 1 hora para ser funcional', score: 'buho' }
    ]
  },
  {
    id: 4,
    question: 'Si tienes que estudiar o preparar un proyecto importante, ¿cuándo prefieres hacerlo?',
    options: [
      { text: 'Muy temprano por la mañana, antes de que el mundo se despierte', score: 'alondra' },
      { text: 'En bloques continuos durante la jornada laboral habitual', score: 'colibri' },
      { text: 'De noche, cuando hay silencio absoluto y sin distracciones', score: 'buho' }
    ]
  }
];

export const ChronotypeTestWidget: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, 'alondra' | 'buho' | 'colibri'>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, score: 'alondra' | 'buho' | 'colibri') => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const isComplete = Object.keys(answers).length === QUESTIONS.length;

  const calculateChronotype = () => {
    const counts = { alondra: 0, buho: 0, colibri: 0 };
    Object.values(answers).forEach((score) => {
      if (score === 'alondra' || score === 'buho' || score === 'colibri') {
        counts[score]++;
      }
    });

    if (counts.alondra >= 2) return 'alondra';
    if (counts.buho >= 2) return 'buho';
    return 'colibri';
  };

  const resultType = showResult ? calculateChronotype() : null;

  const resetTest = () => {
    setAnswers({});
    setShowResult(false);
  };

  const handleShareChronotype = async () => {
    const names = {
      alondra: 'Alondra Matutino 🌅',
      buho: 'Búho Nocturno 🦉',
      colibri: 'Colibrí Intermedio 🕊️'
    };
    const cName = resultType ? names[resultType] : 'Colibrí';
    const text = `¡Descubrí mi cronotipo circadiano en calculadoradesueño.org! Mi resultado: ${cName}. Descubre tu mejor horario de sueño y productividad gratis.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Test de Cronotipo de Sueño',
          text,
          url: 'https://calculadoradesueño.org/#test-cronotipo'
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div id="test-cronotipo" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Test de Biología Circadiana</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Descubre tu Cronotipo de Sueño (Alondra, Búho o Colibrí)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Conocer tu ritmo circadiano genético te permite fijar tus horarios idóneos de descanso y máxima productividad mental.
          </p>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-black shrink-0">
                  {q.id}
                </span>
                <span>{q.question}</span>
              </div>

              <div className="grid grid-cols-1 gap-2 pl-8">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(q.id, opt.score)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-950 border-indigo-500 text-white font-semibold shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              disabled={!isComplete}
              onClick={() => setShowResult(true)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                isComplete
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Ver mi Cronotipo e Horario Ideal</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-2 border-indigo-500/40 p-6 sm:p-8 rounded-2xl space-y-6">
          {resultType === 'alondra' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Sun className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                    Cronotipo Matutino
                  </span>
                  <h3 className="text-2xl font-black text-white">Eres un Cronotipo Alondra (Alondra Matutina)</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tu melatonina se libera temprano por la tarde. Funcionas con máxima lucidez desde el amanecer y tu temperatura corporal desciende temprano por la noche.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Hora Ideal de Acostarse</span>
                  <span className="text-lg font-black text-amber-300">21:30 - 22:30</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Hora Ideal de Despertar</span>
                  <span className="text-lg font-black text-emerald-400">05:30 - 06:30</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Pico de Productividad</span>
                  <span className="text-lg font-black text-indigo-300">08:00 - 11:30</span>
                </div>
              </div>
            </div>
          )}

          {resultType === 'buho' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
                  <Moon className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                    Cronotipo Nocturno
                  </span>
                  <h3 className="text-2xl font-black text-white">Eres un Cronotipo Búho (Búho Nocturno)</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tu melatonina se segrega horas más tarde de lo habitual. Tu cerebro alcanza el máximo pico creativo y analítico por la tarde-noche.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Hora Ideal de Acostarse</span>
                  <span className="text-lg font-black text-indigo-300">00:30 - 01:30</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Hora Ideal de Despertar</span>
                  <span className="text-lg font-black text-amber-300">08:30 - 09:30</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Pico de Productividad</span>
                  <span className="text-lg font-black text-emerald-400">18:00 - 22:30</span>
                </div>
              </div>
            </div>
          )}

          {resultType === 'colibri' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0">
                  <Feather className="w-8 h-8 text-violet-300" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 bg-violet-950 px-2.5 py-0.5 rounded border border-violet-800">
                    Cronotipo Intermedio
                  </span>
                  <h3 className="text-2xl font-black text-white">Eres un Cronotipo Colibrí (Ritmo Estándar)</h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Representas al 60% de la población. Te adaptas con facilidad a los horarios sociales y de trabajo habituales de 8 horas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Hora Ideal de Acostarse</span>
                  <span className="text-lg font-black text-indigo-300">23:00 - 23:30</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Hora Ideal de Despertar</span>
                  <span className="text-lg font-black text-emerald-400">07:00 - 07:30</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Pico de Productividad</span>
                  <span className="text-lg font-black text-amber-300">10:00 - 13:00</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div>
              {copiedNotice && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-800 animate-fadeIn">
                  ✓ Resultado de Cronotipo copiado al portapapeles
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareChronotype}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all"
              >
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>Compartir Mi Cronotipo</span>
              </button>

              <button
                onClick={resetTest}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repetir Test</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
