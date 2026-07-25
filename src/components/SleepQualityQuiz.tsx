import React, { useState } from 'react';
import { Activity, CheckCircle2, HelpCircle, RotateCcw, Sparkles, Brain, Moon, ShieldAlert } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; score: number; tip: string }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Cuánto tardas habitualmente en quedarte dormido desde que apagas la luz?',
    options: [
      { label: 'Menos de 15 minutos', score: 3, tip: '¡Excelente latencia de sueño!' },
      { label: 'Entre 15 y 30 minutos', score: 2, tip: 'Latencia normal en el rango óptimo.' },
      { label: 'Entre 30 y 60 minutos', score: 1, tip: 'Se recomienda usar Sonido Marrón o Verde y apagar pantallas 1h antes.' },
      { label: 'Más de 1 hora (Insomnio inicial)', score: 0, tip: 'Sugerimos ajustar la latencia a 30m en la calculadora y probar Ruido de Lluvia o Binaural Delta.' },
    ],
  },
  {
    id: 2,
    question: '¿Con qué frecuencia te despiertas a mitad de la noche?',
    options: [
      { label: 'Rara vez / Duermo del tirón', score: 3, tip: 'Gran continuidad de fases profundas N3.' },
      { label: '1 vez por noche y vuelvo a dormir rápido', score: 2, tip: 'Micro-despertar normal sin fragmentación grave.' },
      { label: '2 a 3 veces por noche', score: 1, tip: 'Revisa la temperatura del dormitorio (ideal 18°C-20°C).' },
      { label: 'Múltiples veces o me cuesta volver a dormir', score: 0, tip: 'Evita cenas pesadas y alcohol 3h antes de acostarte.' },
    ],
  },
  {
    id: 3,
    question: '¿Cómo te sientes al despertar por la mañana?',
    options: [
      { label: 'Con energía y despejado en pocos minutos', score: 3, tip: 'Sincronización perfecta con el fin de un ciclo ultradiano.' },
      { label: 'Un poco somnoliento pero se pasa rápido', score: 2, tip: 'Inercia de sueño leve habitual.' },
      { label: 'Agotado e inercia de sueño pesada toda la mañana', score: 1, tip: 'Posiblemente estás despertando a mitad de un ciclo profundo (Fase N3).' },
      { label: 'Totalmente fatigado aun durmiendo 8 horas', score: 0, tip: 'Te recomendamos calcular tus 5 o 6 ciclos exactos con nuestra calculadora.' },
    ],
  },
];

export const SleepQualityQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = QUIZ_QUESTIONS.length * 3;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  const getDiagnosis = () => {
    if (scorePercentage >= 85) {
      return {
        title: '🟢 Higiene de Sueño Óptima',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-500/50',
        description: 'Tus hábitos de sueño y sincronización circadiana son excelentes. Sigue manteniendo tus horarios regulares.',
      };
    } else if (scorePercentage >= 55) {
      return {
        title: '🟡 Calidad Aceptable con Margen de Mejora',
        color: 'text-amber-300',
        bg: 'bg-amber-950/40 border-amber-500/50',
        description: 'Tienes un patrón razonable, pero experimentas inercia de sueño o ligeros micro-despertares. Te recomendamos programar tus ciclos exactos en la calculadora.',
      };
    } else {
      return {
        title: '🔴 Inercia o Fragmentación del Sueño Detectada',
        color: 'text-rose-400',
        bg: 'bg-rose-950/40 border-rose-500/50',
        description: 'Muestras signos de descoordinación circadiana o inercia de sueño. Aplica la Regla 10-3-2-1-0 y escucha Sonidos Blancos/Marrón al acostarte.',
      };
    }
  };

  const diagnosis = getDiagnosis();

  return (
    <div id="test-diagnostico-suno" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 my-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            <span>Evaluación Rápida de 30 Segundos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Test Express de Calidad de Sueño y Ritmo Circadiano
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Responde 3 preguntas sencillas para obtener un diagnóstico personalizado de tu descanso nocturno.
          </p>
        </div>

        {!isCompleted && (
          <div className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            Pregunta {currentStep + 1} de {QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>{QUIZ_QUESTIONS[currentStep].question}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500 hover:bg-slate-800 text-left transition-all text-xs sm:text-sm font-medium text-slate-200 hover:text-white flex flex-col justify-between group"
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-300 mt-2 font-normal">
                    {opt.tip}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`p-6 rounded-2xl border ${diagnosis.bg} space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-300" />
              <h3 className={`text-xl font-extrabold ${diagnosis.color}`}>{diagnosis.title}</h3>
            </div>
            <div className="text-2xl font-black text-amber-300">
              {scorePercentage}%
            </div>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed">
            {diagnosis.description}
          </p>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-indigo-300 block">💡 Recomendaciones Personalizadas:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Ajusta la calculadora para dormir exactamente <strong>5 o 6 ciclos completos (7.5h o 9h)</strong>.</li>
              <li>Mantén una latencia inicial realista de <strong>15 a 25 minutos</strong> en el temporizador.</li>
              <li>Aplica los sonidos relajantes de lluvia o ruido marrón al acostarte.</li>
            </ul>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Diagnóstico</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
