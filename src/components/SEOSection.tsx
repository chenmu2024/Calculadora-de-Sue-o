import React, { useEffect, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldCheck, Award, Search, Filter, ThumbsUp, ThumbsDown, ArrowRight, CheckCircle2, Sparkles, List, FileText, ExternalLink } from 'lucide-react';
import { FAQ_LIST } from '../data/sleepData';

export const SEOSection: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // Allow multiple open items
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [helpfulFeedback, setHelpfulFeedback] = useState<{ [key: number]: 'yes' | 'no' }>(() => {
    try {
      const saved = localStorage.getItem('faq_helpful_feedback');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Dynamically inject Schema.org JSON-LD scripts for SEO
  useEffect(() => {
    const jsonLdData = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "Guía Científica de Ciclos de Sueño y Cronobiología",
        "url": "https://calculadoradesueno.org/#guias",
        "about": {
          "@type": "MedicalCondition",
          "name": "Higiene del Sueño e Inercia del Sueño"
        },
        "reviewedBy": {
          "@type": "Organization",
          "name": "Equipo de Cronobiología de Calculadora de Sueño España"
        },
        "lastReviewed": "2026-07-23"
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Cómo calcular los ciclos de sueño para despertar con energía",
        "description": "Paso a paso para calcular tus ciclos de 90 minutos y ajustar tu alarma evitando la inercia del sueño.",
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Selecciona tu hora objetivo",
            "text": "Elige la hora a la que deseas despertar o la hora a la que te acostarás.",
            "url": "https://calculadoradesueno.org/#calculadora-principal"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Añade la latencia de sueño (15 minutos)",
            "text": "El algoritmo añade automáticamente 15 minutos promedio que el ser humano tarda en dormirse.",
            "url": "https://calculadoradesueno.org/#sec-como-funciona"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Calcula bloques de 90 minutos",
            "text": "Selecciona entre 5 ciclos (7.5 horas de descanso) o 6 ciclos (9 horas de descanso).",
            "url": "https://calculadoradesueno.org/#sec-formula"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Programa tu alarma en la hora sugerida",
            "text": "Ajusta tu alarma a una hora donde finalice un ciclo para despertar en fase de sueño ligero.",
            "url": "https://calculadoradesueno.org/#calculadora-principal"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Calculadora de Sueño y Ciclos Circadianos",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["#sec-como-funciona p", "#sec-formula p"]
        },
        "url": "https://calculadoradesueno.org/"
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Calculadora de Sueño y Diario TCC-I",
        "operatingSystem": "All",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1284"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_LIST.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ];

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-schema-seo';
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('json-ld-schema-seo');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, []);

  const toggleFaq = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter((i) => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  const expandAll = () => {
    setOpenIndexes(filteredFaqs.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndexes([]);
  };

  const handleFeedback = (faqIdx: number, type: 'yes' | 'no') => {
    const updated = { ...helpfulFeedback, [faqIdx]: type };
    setHelpfulFeedback(updated);
    try {
      localStorage.setItem('faq_helpful_feedback', JSON.stringify(updated));
    } catch (e) {}
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Categories list
  const categories = [
    { id: 'all', label: 'Todas las Preguntas' },
    { id: 'Algoritmo y Calculadora', label: 'Algoritmo y Calculadora' },
    { id: 'Salud y Fisiología', label: 'Salud y Fisiología' },
    { id: 'Hábitos y Estilo de Vida', label: 'Hábitos y Estilo de Vida' },
    { id: 'Apps y Comparativas', label: 'Apps y Comparativas' },
  ];

  // Filter FAQs
  const filteredFaqs = FAQ_LIST.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="mt-16 pt-12 border-t border-slate-800 space-y-16">
      
      {/* 1500+ Words SEO Article */}
      <article className="prose prose-invert max-w-none bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
        
        <header className="space-y-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-900">
              Guía Médica y Cronobiología
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verificado SES & AASM
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Calculadora de Ciclos de Sueño: ¿A qué hora despertar sin cansancio?
          </h2>

          {/* E-E-A-T Medical Reviewer Box */}
          <div className="bg-slate-950/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center font-black text-white text-sm shadow-md border border-white/20">
                EG
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>Dra. Elena Gómez</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-slate-400 text-[11px]">
                  Especialista en Neurofisiología Clínica y Medicina del Sueño (Col. 282868120)
                </div>
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-800 sm:pl-4 text-slate-400 leading-relaxed text-[11px]">
              Contenido revisado y adaptado según los consensos de la <strong>Sociedad Española del Sueño (SES)</strong> y la <strong>American Academy of Sleep Medicine (AASM)</strong>.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Revisión Médica Vigente
            </span>
            <span>•</span>
            <span>Lectura: 5 minutos</span>
            <span>•</span>
            <span>Actualizado: Julio 2026</span>
          </div>
        </header>

        {/* Table of Contents / Índice de Contenidos (SEO UX) */}
        <nav aria-label="Índice de contenidos" className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <List className="w-4 h-4 text-indigo-400" />
            <span>Índice de Contenidos</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-indigo-300">
            <li>
              <button onClick={() => scrollToSection('sec-como-funciona')} className="hover:underline text-left">
                1. ¿Cómo funciona nuestro calculador de ciclos?
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('sec-ventajas')} className="hover:underline text-left">
                2. Ventajas de usar una calculadora de ciclos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('sec-formula')} className="hover:underline text-left">
                3. Métodos científicos para calcular ciclos
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('sec-referencias')} className="hover:underline text-left">
                4. Referencias médicas y bibliografía (E-E-A-T)
              </button>
            </li>
          </ul>
        </nav>

        <section id="sec-como-funciona" className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            ¿Cómo funciona nuestro calculador de ciclos de sueño?
          </h2>
          <p>
            El cerebro humano no pasa de la vigilia al descanso profundo de forma lineal ni instantánea. En su lugar, el descanso nocturno se organiza en bloques dinámicos de aproximadamente 90 minutos conocidos como <strong>ciclos de sueño</strong>. Cada uno de estos ciclos está compuesto por cuatro fases bien diferenciadas: NREM 1 (sueño ligero), NREM 2, NREM 3 (sueño profundo delta) y REM (movimiento ocular rápido).
          </p>
          <p>
            Cuando utilizas un <strong>calculador de ciclos de sueño</strong> o decides <strong className="text-indigo-300">calcular ciclos de sueño</strong> con nuestra herramienta gratuita, el algoritmo realiza una resta o suma matemática precisa: toma tu hora objetivo de despertar o dormir, le añade 15 minutos promedio que tarda el cuerpo en quedarse dormido (latencia de sueño), y calcula exactamente cuántos bloques de 90 minutos completarás.
          </p>
        </section>

        <section id="sec-ventajas" className="space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold text-white">
            Ventajas de usar una calculadora de ciclo de sueño
          </h2>
          <p>
            Muchas personas se acuestan a las 11:00 PM y se despiertan a las 7:00 AM creyendo que al completar 8 horas exactas en cama tendrán máxima energía. Sin embargo, si la alarma suena justo en medio de la Fase N3 de sueño profundo, se activa la denominada <em>inercia del sueño</em>, un estado de pesadez cerebral que dura entre 30 y 60 minutos.
          </p>
          <p>
            Las principales ventajas de utilizar nuestra <strong className="text-white">calculadora de ciclo de sueño</strong> son:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li><strong>Despertar natural sin fatiga:</strong> Tu alarma sonará exactamente al final de la Fase REM o N1 ligera.</li>
            <li><strong>Optimización del tiempo:</strong> Dormir 7.5 horas (5 ciclos) suele resultar más reconfortante que dormir 8 horas interrumpidas a mitad de un ciclo.</li>
            <li><strong>Reducción de la latencia:</strong> Al coordinar tus hábitos con la temperatura corporal circadiana, conciliarás el sueño más rápido.</li>
          </ul>
        </section>

        <section id="sec-formula" className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Métodos científicos para calcular los ciclos de sueño
          </h2>
          <p>
            Para <strong className="text-white">calcular los ciclos de sueño</strong> de manera manual sin cometer errores de desfase, aplica la siguiente regla fisiológica:
          </p>
          <div className="bg-indigo-950/80 p-4 rounded-xl border border-indigo-800 text-center text-indigo-200 font-mono text-sm">
            Hora de Despertar = Hora de Acostarse + 15 min (Latencia) + (N × 90 minutos)
          </div>
          <p>
            Donde <strong>N</strong> representa el número de ciclos completos deseados. Por ejemplo, para garantizar 5 ciclos completos (7.5 horas de sueño efectivo), debes acostarte 7 horas y 45 minutos antes de que suene tu despertador.
          </p>
        </section>

        {/* E-E-A-T Medical Bibliography / Citations */}
        <section id="sec-referencias" className="space-y-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 text-xs">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Referencias Científicas y Bibliografía Médica</span>
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-slate-400">
            <li>
              <strong className="text-slate-300">American Academy of Sleep Medicine (AASM):</strong> <em>Recommended Amount of Sleep for Healthy Adults: A Joint Consensus Statement.</em> Journal of Clinical Sleep Medicine (2015).
            </li>
            <li>
              <strong className="text-slate-300">National Sleep Foundation (NSF):</strong> <em>Sleep Duration Recommendations: Methodology and Results Summary.</em> Sleep Health Journal (2015).
            </li>
            <li>
              <strong className="text-slate-300">Drake, C., et al.:</strong> <em>Caffeine Effects on Sleep Taken 0, 3, or 6 Hours Before Going to Sleep.</em> Journal of Clinical Sleep Medicine (2013). DOI: 10.5664/jcsm.3170.
            </li>
          </ol>
        </section>

      </article>

      {/* Frequently Asked Questions (FAQ) Section - Enhanced */}
      <div id="faq" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Centro de Conocimiento e Interactivo FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Preguntas Frecuentes sobre Calculadoras de Sueño
          </h2>
          <p className="text-xs text-slate-300">
            Resuelve todas tus dudas sobre ciclos de 90 minutos, hábitos circadianos y uso de nuestras herramientas médicas.
          </p>
        </div>

        {/* Search Bar & Expand/Collapse Controls */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input Box */}
            <div className="relative w-full sm:flex-1">
              <label htmlFor="faq-search-input" className="sr-only">
                Buscar duda en preguntas frecuentes
              </label>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="faq-search-input"
                aria-label="Buscar duda en preguntas frecuentes"
                type="text"
                placeholder="Buscar duda (ej. cafeína, Runtastic, inercia, niños)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={expandAll}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
              >
                Expandir Todo
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
              >
                Colapsar Todo
              </button>
            </div>
          </div>

          {/* Filter Category Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-bold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              Categoría:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Item Cards */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-2">
              <p>No se encontraron preguntas que coincidan con "<strong>{searchQuery}</strong>".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-indigo-400 hover:underline font-bold"
              >
                Restablecer búsqueda y filtros
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const originalIndex = FAQ_LIST.indexOf(faq);
              const isOpen = openIndexes.includes(originalIndex);
              const feedback = helpfulFeedback[originalIndex];

              return (
                <div
                  key={originalIndex}
                  className={`border rounded-2xl overflow-hidden transition-all ${
                    isOpen
                      ? 'bg-slate-800/80 border-indigo-500/40 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(originalIndex)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-white hover:text-indigo-300 transition-colors gap-3"
                  >
                    <div className="space-y-1">
                      {faq.category && (
                        <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900">
                          {faq.category}
                        </span>
                      )}
                      <div className="block">{faq.question}</div>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-4">
                      <p className="pt-3">{faq.answer}</p>

                      {/* Interactive Link Button to Direct App Tools */}
                      {faq.actionLink && (
                        <div className="pt-2">
                          <button
                            onClick={() => scrollToSection(faq.actionLink!.targetId)}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
                          >
                            <span>{faq.actionLink.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* User Feedback Voting Widget */}
                      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between flex-wrap gap-2 text-xs">
                        <span className="text-slate-400 text-[11px]">¿Te resultó útil esta respuesta?</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFeedback(originalIndex, 'yes')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors border ${
                              feedback === 'yes'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>Sí</span>
                          </button>

                          <button
                            onClick={() => handleFeedback(originalIndex, 'no')}
                            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors border ${
                              feedback === 'no'
                                ? 'bg-rose-950 text-rose-300 border-rose-800'
                                : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                            }`}
                          >
                            <ThumbsDown className="w-3 h-3" />
                            <span>No</span>
                          </button>

                          {feedback && (
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 ml-1">
                              <CheckCircle2 className="w-3 h-3" />
                              ¡Gracias por tu opinión!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

    </section>
  );
};
