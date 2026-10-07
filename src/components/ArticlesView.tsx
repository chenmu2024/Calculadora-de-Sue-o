import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, ArrowLeft, Share2, Tag, ChevronRight, Check, Play, Pause, RotateCcw, Volume2, Sparkles, Video, ShieldCheck, User, Search, MessageCircle, ExternalLink } from 'lucide-react';
import { ARTICLES } from '../data/sleepData';
import { Article } from '../types';
import { SEO_BY_TAB, SITE_NAME, SITE_URL } from '../config/siteConfig';

const getArticleSlugFromPath = (): string | null => {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const ArticlesView: React.FC = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(getArticleSlugFromPath);
  const [shareCopied, setShareCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Video tutorial state (60s presentation)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0 to 60 seconds

  const selectedArticle = ARTICLES.find((a) => a.slug === selectedSlug);

  // Keep article URLs, metadata and structured data aligned with the visible article.
  useEffect(() => {
    const syncFromUrl = () => setSelectedSlug(getArticleSlugFromPath());
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]');

    if (!selectedArticle) {
      const blogSeo = SEO_BY_TAB.blog;
      const blogUrl = `${SITE_URL}/blog`;
      document.title = blogSeo.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', blogSeo.desc);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', blogUrl);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', blogSeo.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', blogSeo.desc);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', blogUrl);
      robots?.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      return;
    }

    const canonicalUrl = `${SITE_URL}/blog/${selectedArticle.slug}`;
    robots?.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    document.title = selectedArticle.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', selectedArticle.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', selectedArticle.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', selectedArticle.metaDescription);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);

    document.getElementById('prerender-jsonld')?.remove();
    document.getElementById('article-json-ld')?.remove();

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: selectedArticle.h1,
      description: selectedArticle.metaDescription,
      mainEntityOfPage: canonicalUrl,
      inLanguage: 'es',
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/android-chrome-512x512.png`
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-json-ld';
    script.text = JSON.stringify(articleSchema);
    document.head.appendChild(script);

    return () => {
      document.getElementById('article-json-ld')?.remove();
    };
  }, [selectedArticle]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 60) {
            setIsVideoPlaying(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoPlaying]);

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedArticle ? selectedArticle.title : 'Calculadora de Sueño - Guías',
          text: selectedArticle ? selectedArticle.summary : 'Aprende a calcular tus ciclos de sueño y optimizar tu descanso.',
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Rich Markdown parsing function for SEO-optimized articles
  const renderMarkdownContent = (content: string) => {
    const parseInline = (text: string) => {
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      // Regex for links [label](url), bold **text**, and code `code`
      const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }

        if (match[1] && match[2]) {
          const label = match[1];
          const url = match[2];
          const isInternal = url.includes('xn--calculadoradesueo-uxb.org') || url.includes('calculadoradesueño.org') || url.startsWith('#') || url.startsWith('/');
          parts.push(
            <a
              key={match.index}
              href={url}
              target={isInternal ? '_self' : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className="text-indigo-400 hover:text-indigo-300 underline font-semibold decoration-indigo-500/50 hover:decoration-indigo-300 transition-colors"
            >
              {label}
            </a>
          );
        } else if (match[3]) {
          parts.push(
            <strong key={match.index} className="font-bold text-white">
              {match[3]}
            </strong>
          );
        } else if (match[4]) {
          parts.push(
            <code key={match.index} className="bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-800">
              {match[4]}
            </code>
          );
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      return parts;
    };

    const blocks = content.split('\n\n');

    return blocks.map((block, idx) => {
      const trimmed = block.trim();

      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-white pt-6 pb-2 border-b border-slate-800 flex items-center gap-2">
            {parseInline(trimmed.replace('## ', ''))}
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-indigo-200 pt-5 pb-1">
            {parseInline(trimmed.replace('### ', ''))}
          </h3>
        );
      }

      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-lg font-bold text-amber-300 pt-3 pb-1">
            {parseInline(trimmed.replace('#### ', ''))}
          </h4>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-4 p-4 rounded-2xl bg-indigo-950/40 border-l-4 border-indigo-500 text-indigo-200 italic space-y-1">
            {parseInline(trimmed.replace(/^>\s*/gm, ''))}
          </blockquote>
        );
      }

      if (trimmed.startsWith('|')) {
        const lines = trimmed.split('\n').filter(l => l.trim().startsWith('|'));
        if (lines.length >= 2) {
          const headers = lines[0].split('|').map(c => c.trim()).filter(Boolean);
          const rows = lines.slice(2).map(row => row.split('|').map(c => c.trim()).filter(Boolean));

          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-lg">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-indigo-300 font-bold">
                    {headers.map((h, hidx) => (
                      <th key={hidx} className="p-3 sm:p-4">{parseInline(h)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {rows.map((row, ridx) => (
                    <tr key={ridx} className="hover:bg-slate-900/50 transition-colors">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="p-3 sm:p-4 text-slate-300">{parseInline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
        const items = trimmed.split('\n');
        const isNumbered = /^\d+\./.test(trimmed);
        return (
          <div key={idx} className="my-4 p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
            {items.map((item, iidx) => {
              const cleanText = item.replace(/^[\*\-\d\.]+\s*/, '');
              return (
                <div key={iidx} className="flex items-start gap-2.5 text-slate-300">
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">
                    {isNumbered ? `${iidx + 1}.` : '•'}
                  </span>
                  <div className="leading-relaxed">{parseInline(cleanText)}</div>
                </div>
              );
            })}
          </div>
        );
      }

      if (trimmed === '---') {
        return <hr key={idx} className="my-6 border-slate-800" />;
      }

      return (
        <p key={idx} className="leading-relaxed my-3">
          {parseInline(trimmed)}
        </p>
      );
    });
  };

  if (selectedArticle) {
    const isCycleArticle = selectedArticle.slug === 'como-calcular-mi-ciclo-de-sueno';

    return (
      <article className="max-w-4xl mx-auto py-8 space-y-8">
        <button
          onClick={() => {
            setSelectedSlug(null);
            window.history.pushState(null, '', '/blog');
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todas las Guías</span>
        </button>

        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-indigo-400 font-semibold flex-wrap">
            <span className="bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
              {selectedArticle.category}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {selectedArticle.date}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.readTime}
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Fuentes revisadas
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {selectedArticle.h1}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <User className="w-4 h-4 text-indigo-400" />
            <span>Publicado por: <strong className="text-slate-200">Equipo editorial de Calculadora de Sueño</strong></span>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-slate-300">
            <div className="p-2 bg-emerald-950 rounded-xl border border-emerald-800 text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Transparencia editorial</div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Contenido divulgativo basado en las fuentes enlazadas. No constituye diagnóstico, tratamiento ni asesoramiento médico individual.
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed border-l-4 border-indigo-500 pl-4 py-1 italic bg-slate-900/40 rounded-r-xl">
            {selectedArticle.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={handleShareNative}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl transition-colors shadow-md shadow-indigo-600/20"
            >
              {shareCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{shareCopied ? '¡Copiado!' : 'Compartir Guía'}</span>
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Mira esta guía sobre ${selectedArticle.title}: ${window.location.href}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${selectedArticle.title} - Vía @calculadorasueno`)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>X / Twitter</span>
            </a>
          </div>
        </header>

        {/* 60-Second Video Interactive Module (SERP Featured Video) */}
        {isCycleArticle && (
          <div className="bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-300" />
                <h2 className="text-lg font-black text-white">
                  Tutorial interactivo (60s): Cómo estimar un horario de sueño
                </h2>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                Guía interactiva
              </span>
            </div>

            {/* Simulated Player Screen */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] text-center space-y-4">
              <div className="absolute top-3 left-3 text-[10px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                00:{videoProgress.toString().padStart(2, '0')} / 01:00
              </div>

              <div className="w-16 h-16 rounded-full bg-indigo-600/30 border-2 border-indigo-500 flex items-center justify-center text-amber-300 shadow-xl shadow-indigo-600/30">
                {videoProgress < 15 && <Sparkles className="w-8 h-8" />}
                {videoProgress >= 15 && videoProgress < 30 && <Clock className="w-8 h-8" />}
                {videoProgress >= 30 && videoProgress < 45 && <Volume2 className="w-8 h-8" />}
                {videoProgress >= 45 && <Check className="w-8 h-8 text-emerald-400" />}
              </div>

              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">
                  {videoProgress < 15 && 'Paso 1: Entendiendo la Regla de los 90 Minutos'}
                  {videoProgress >= 15 && videoProgress < 30 && 'Paso 2: Sumar 15 Minutos de Latencia'}
                  {videoProgress >= 30 && videoProgress < 45 && 'Paso 3: Multiplicar por 5 o 6 Ciclos'}
                  {videoProgress >= 45 && 'Paso 4: Fijar Alarma y Despertar Renovado'}
                </div>
                <p className="text-sm font-semibold text-white max-w-lg mx-auto">
                  {videoProgress < 15 && 'Cada ciclo de sueño dura aproximadamente 90 minutos alternando fases NREM y REM.'}
                  {videoProgress >= 15 && videoProgress < 30 && 'El ser humano tarda un promedio de 15 minutos en dormirse desde que apaga las luces.'}
                  {videoProgress >= 30 && videoProgress < 45 && '5 ciclos = 7.5 horas de sueño. 6 ciclos = 9 horas de sueño. Suma 15 min al resultado.'}
                  {videoProgress >= 45 && '¡Listo! Pon tu alarma a una hora exacta que termine al finalizar un ciclo completo.'}
                </p>
              </div>

              {/* Progress Slider */}
              <div className="w-full max-w-md bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full transition-all duration-300"
                  style={{ width: `${(videoProgress / 60) * 100}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
                >
                  {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isVideoPlaying ? 'Pausar guía' : 'Iniciar guía (60s)'}</span>
                </button>
                <button
                  onClick={() => {
                    setVideoProgress(0);
                    setIsVideoPlaying(true);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Body formatted with rich styling */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          {renderMarkdownContent(selectedArticle.contentMarkdown)}
          
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-bold text-lg mb-1">¿Listo para optimizar tu descanso?</h4>
              <p className="text-slate-400 text-sm">Utiliza nuestra herramienta gratuita para calcular tus ciclos exactos.</p>
            </div>
            <button
              onClick={() => {
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="whitespace-nowrap px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              Calcula tu ciclo de sueño
            </button>
          </div>
        </div>

        {/* Tag Keywords Footer */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-slate-400 font-semibold">Palabras clave:</span>
          {selectedArticle.targetKeywords.map((kw, idx) => (
            <span key={idx} className="text-xs text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-900">
              {kw}
            </span>
          ))}
        </div>
      </article>
    );
  }

  const categories = ['Todas', 'Ciencia del Sueño', 'Insomnio & TCC-I', 'Hábitos & Cafeína', 'Fisiología', 'Tecnología e Innovación'];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'Todas' || art.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = searchQuery.trim() === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.targetKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-guias" className="space-y-8 py-6">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Guías Científicas de Salud del Sueño</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Artículos y Métodos para Optimizar tus Ciclos de Sueño
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          Aprende a <strong className="text-white font-semibold">calcular mi ciclo de sueño</strong>, entender la neurofisiología del descanso y evitar la inercia del sueño.
        </p>

        {/* Real-Time Keyword Search Bar */}
        <div className="pt-2 max-w-xl mx-auto">
          <div className="relative">
            <label htmlFor="article-search-input" className="sr-only">
              Buscar artículos
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="article-search-input"
              aria-label="Buscar artículos"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar temas: 'insomnio', 'cafeína', 'melatonina', '90 minutos'..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 space-y-2">
          <Search className="w-8 h-8 text-indigo-400 mx-auto" />
          <div className="font-bold text-white text-sm">No se encontraron artículos para tu búsqueda.</div>
          <p className="text-xs">Intenta con términos como "insomnio", "cafeína", "ciclos" o borra el filtro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.slug}
              onClick={() => {
                setSelectedSlug(art.slug);
                window.history.pushState(null, '', `/blog/${art.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between cursor-pointer hover:border-indigo-500/50 hover:bg-slate-850 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="text-indigo-400 font-bold bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-900">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-3">
                  {art.title}
                </h2>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-400 font-bold group-hover:text-indigo-200">
                <span>Leer artículo completo</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
