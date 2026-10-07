import React, { useState } from 'react';
import { Smartphone, Star, CheckCircle2, XCircle, Award, ExternalLink, ShieldAlert, Sparkles, Sliders, ThumbsUp, Check, ShieldCheck, BatteryCharging, Lock, Zap, HelpCircle } from 'lucide-react';
import { APP_REVIEWS } from '../data/sleepData';

interface VoteState {
  [appId: string]: number;
}

export const AppReviewsView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [userVotes, setUserVotes] = useState<{ [appId: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('app_reviews_user_votes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [voteCounts, setVoteCounts] = useState<VoteState>({
    'sleep-cycle': 0,
    'adidas-runtastic': 0,
    'pillow': 0,
    'calm': 0
  });

  const handleVote = (appId: string) => {
    const isVoted = !!userVotes[appId];
    const newVotes = { ...userVotes, [appId]: !isVoted };
    setUserVotes(newVotes);

    setVoteCounts((prev) => ({
      ...prev,
      [appId]: prev[appId] + (isVoted ? -1 : 1)
    }));

    try {
      localStorage.setItem('app_reviews_user_votes', JSON.stringify(newVotes));
    } catch (e) {}
  };

  const filteredApps = APP_REVIEWS.filter((app) => {
    if (selectedFilter === 'ios') return app.platforms.includes('iOS') || app.platforms.includes('watchOS');
    if (selectedFilter === 'android') return app.platforms.includes('Android');
    if (selectedFilter === 'free') return app.price.toLowerCase().includes('gratis') || app.price.toLowerCase().includes('freemium');
    if (selectedFilter === 'sport') return app.hasAdidasRuntasticRelation;
    return true;
  });

  return (
    <div id="app-calculadora-de-sueno" className="space-y-10 py-6">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
          <Smartphone className="w-3.5 h-3.5 text-amber-300" />
          <span>Reseñas de Apps y Comparativa 2026</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Las Mejores Opciones de Calculadora de Sueño App
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Comparamos tipos de aplicaciones y herramientas para registrar o planificar el sueño, incluyendo la historia de <strong className="text-white font-semibold">Runtastic Sleep Better</strong>. Las puntuaciones mostradas son una valoración editorial interna, no promedios de App Store o Google Play.
        </p>
      </div>

      {/* Special Box: Adidas Runtastic History */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-300 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Historia de la Calculadora de Sueño Adidas / Runtastic
          </h2>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          Lanzada inicialmente como <strong>Runtastic Sleep Better</strong> y posteriormente integrada bajo la marca <strong>Adidas Runtastic</strong>, esta aplicación fue pionera en permitir a los deportistas calcular la eficiencia de sus ciclos de sueño según el volumen de entrenamiento diario, el consumo de café y los niveles de estrés.
        </p>

        <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>¿Sigue funcionando la calculadora de sueño Runtastic?</span>
          </div>
          <div>
            Aunque la aplicación original se ha ido descontinuando en favor de la suite unificada de salud de Adidas, sus principios científicos siguen estando vivos en nuestra herramienta web <strong>xn--calculadoradesueo-uxb.org</strong>, permitiéndote calcular ciclos de forma 100% gratuita y sin ocupar espacio en tu teléfono.
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <span className="text-xs text-slate-400 font-bold mr-2 flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          Filtrar por:
        </span>
        {[
          { id: 'all', label: 'Todas las Apps' },
          { id: 'ios', label: 'iOS / iPhone' },
          { id: 'android', label: 'Android' },
          { id: 'free', label: 'Gratis / Freemium' },
          { id: 'sport', label: 'Deporte & Runtastic' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedFilter === f.id
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Apps Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.map((app) => {
          const isVoted = !!userVotes[app.id];
          const count = voteCounts[app.id] || 0;

          return (
            <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-colors">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    {app.badge && (
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/80 mb-1">
                        {app.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white">{app.name}</h3>
                  </div>

                  <div
                    className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl text-amber-300 font-bold text-sm shrink-0"
                    title="Valoración editorial interna, no puntuación de una tienda de aplicaciones"
                  >
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>{app.score}/5 editorial</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {app.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="text-xs font-semibold text-slate-200">Pros principales:</div>
                  <ul className="space-y-1">
                    {app.pros.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-xs font-semibold text-slate-200">A tener en cuenta:</div>
                  <ul className="space-y-1">
                    {app.cons.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-900">
                    {app.price}
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    {app.platforms.join(', ')}
                  </span>
                </div>

                {/* User Community Vote Button */}
                <button
                  onClick={() => handleVote(app.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                    isVoted
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                      : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-slate-950' : ''}`} />
                  <span>{isVoted ? '¡Votado!' : 'Recomendar'} ({count})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>Tabla Comparativa de Funciones Clave</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Compara qué ofrece cada aplicación móvil frente a nuestra herramienta web gratuita:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-3 px-3">Aplicación / Herramienta</th>
                <th className="py-3 px-3">Alarma Fase Ligera</th>
                <th className="py-3 px-3">Grabar Ronquidos</th>
                <th className="py-3 px-3">Sin Instalación / Consumo Batería</th>
                <th className="py-3 px-3">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="bg-indigo-950/40 font-bold border-l-4 border-l-amber-400">
                <td className="py-3 px-3 text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>xn--calculadoradesueo-uxb.org (Web)</span>
                </td>
                <td className="py-3 px-3 text-emerald-400 font-bold">✓ Temporizador Vivo</td>
                <td className="py-3 px-3 text-slate-500">✗ No requiere micro</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">✓ 100% Cero batería extra</td>
                <td className="py-3 px-3 text-amber-300 font-black">100% Gratis Siempre</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Sleep Cycle</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">✓ Sí (Ventana 30m)</td>
                <td className="py-3 px-3 text-emerald-400">✓ Sí</td>
                <td className="py-3 px-3 text-amber-400">⚡ Consume Batería</td>
                <td className="py-3 px-3">Freemium (~39€/año)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Pillow Sleep Tracker</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">✓ Sí</td>
                <td className="py-3 px-3 text-emerald-400">✓ Sí</td>
                <td className="py-3 px-3 text-amber-400">⚡ Consume Batería</td>
                <td className="py-3 px-3">Freemium (~29€/año)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Adidas / Runtastic Sleep Better</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">✓ Histórica</td>
                <td className="py-3 px-3 text-slate-500">✗ Limitado</td>
                <td className="py-3 px-3 text-rose-400">✗ Descontinuada</td>
                <td className="py-3 px-3">Legacy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational Guide: 4 Criteria for Selecting a Sleep App */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>4 Criterios para Elegir tu Calculadora de Sueño Ideal</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-sm">1. Privacidad de Datos</h3>
            <p className="text-slate-400 leading-relaxed">
              Verifica si la app procesa el audio de tu micrófono de forma local en tu dispositivo o si sube grabaciones de voz a servidores de terceros.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <BatteryCharging className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">2. Consumo de Batería</h3>
            <p className="text-slate-400 leading-relaxed">
              Las apps nativas que graban audio toda la noche consumen entre un 15% y 30% de batería. La calculadora web consume 0% de batería extra.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <Smartphone className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-sm">3. Compatibilidad Wearables</h3>
            <p className="text-slate-400 leading-relaxed">
              Si usas Apple Watch o Fitbit, busca apps que lean tu frecuencia cardíaca (VFC) para mayor precisión en la fase REM.
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">4. Validez Científica</h3>
            <p className="text-slate-400 leading-relaxed">
              Asegúrate de que los cálculos utilicen ciclos estándar de 90 minutos y recomendaciones de la National Sleep Foundation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
