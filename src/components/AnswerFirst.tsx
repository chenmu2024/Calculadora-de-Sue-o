import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

interface AnswerFirstProps {
  title: string;
  answer: string;
  facts?: string[];
  sources?: Array<{ label: string; href: string }>;
}

export const AnswerFirst: React.FC<AnswerFirstProps> = ({ title, answer, facts = [], sources = [] }) => (
  <section
    aria-labelledby="answer-first-title"
    className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 sm:p-7 shadow-xl"
  >
    <div className="flex items-start gap-3">
      <div className="mt-0.5 p-2 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-300 shrink-0">
        <Info className="w-5 h-5" />
      </div>
      <div className="space-y-3 min-w-0">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 mb-1">
            Respuesta directa
          </div>
          <h2 id="answer-first-title" className="text-lg sm:text-xl font-extrabold text-white">
            {title}
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          {answer}
        </p>

        {facts.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
            {facts.map((fact) => (
              <li key={fact} className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2.5">
                {fact}
              </li>
            ))}
          </ul>
        )}

        {sources.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Fuentes:</span>
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 hover:underline"
              >
                {source.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);
