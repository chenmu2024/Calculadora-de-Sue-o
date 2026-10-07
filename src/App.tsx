import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SleepCalculatorWidget } from './components/SleepCalculatorWidget';
import { SleepCycleVisualizer } from './components/SleepCycleVisualizer';
import { SleepDebtCalculator } from './components/SleepDebtCalculator';
const SoundPlayerWidget = lazy(() => import('./components/SoundPlayerWidget').then(m => ({ default: m.SoundPlayerWidget })));
const AgeCalculatorView = lazy(() => import('./components/AgeCalculatorView').then(m => ({ default: m.AgeCalculatorView })));
const AppReviewsView = lazy(() => import('./components/AppReviewsView').then(m => ({ default: m.AppReviewsView })));
const ArticlesView = lazy(() => import('./components/ArticlesView').then(m => ({ default: m.ArticlesView })));
import { SEOSection } from './components/SEOSection';
import { Footer } from './components/Footer';
const NapCalculatorWidget = lazy(() => import('./components/NapCalculatorWidget').then(m => ({ default: m.NapCalculatorWidget })));
const SleepDiaryWidget = lazy(() => import('./components/SleepDiaryWidget').then(m => ({ default: m.SleepDiaryWidget })));
import { SleepHygieneChecklist } from './components/SleepHygieneChecklist';
import { ChronotypeTestWidget } from './components/ChronotypeTestWidget';
import { CaffeineCalculatorWidget } from './components/CaffeineCalculatorWidget';
import { SleepQualityQuiz } from './components/SleepQualityQuiz';
import { MorningCheckinWidget } from './components/MorningCheckinWidget';
import { SleepEnvironmentWidget } from './components/SleepEnvironmentWidget';
import { SleepCountdownTimer } from './components/SleepCountdownTimer';
import { SleepSummaryReportModal } from './components/SleepSummaryReportModal';
import { PwaOfflineBanner } from './components/PwaOfflineBanner';
import { FloatingQuickNav } from './components/FloatingQuickNav';
const AboutUsView = lazy(() => import('./components/AboutUsView').then(m => ({ default: m.AboutUsView })));
const MethodologyView = lazy(() => import('./components/MethodologyView').then(m => ({ default: m.MethodologyView })));
const ContactView = lazy(() => import('./components/ContactView').then(m => ({ default: m.ContactView })));
const PrivacyPolicyView = lazy(() => import('./components/PrivacyPolicyView').then(m => ({ default: m.PrivacyPolicyView })));
const TermsView = lazy(() => import('./components/TermsView').then(m => ({ default: m.TermsView })));
const NotFoundView = lazy(() => import('./components/NotFoundView').then(m => ({ default: m.NotFoundView })));

import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AdBannerSlot } from './components/AdBannerSlot';
import { SleepCycleResult } from './types';
import { SEO_BY_TAB, SITE_URL, SiteTab } from './config/siteConfig';

const getTabFromUrl = (): string => {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const hash = window.location.hash.replace('#', '');

  let tab = 'home';

  // Legacy Hash Migration
  if (hash === 'calculadora-horas-de-sueno') tab = 'age-calculator';
  else if (hash === 'app-calculadora-de-sueno') tab = 'app-reviews';
  else if (hash === 'siestas' || hash === 'calculadora-siestas') tab = 'nap';
  else if (hash === 'diario-sueno' || hash === 'diario') tab = 'diary';
  else if (hash === 'blog' || hash.includes('como-calcular') || hash.includes('insomnio')) tab = 'blog';
  else if (hash === 'sonidos' || hash === 'ruido-blanco') tab = 'sounds';
  else if (hash === 'sobre-nosotros' || hash === 'about') tab = 'about';
  else if (hash === 'metodologia' || hash === 'methodology') tab = 'methodology';
  else if (hash === 'contacto' || hash === 'contact') tab = 'contact';
  else if (hash === 'politica-privacidad' || hash === 'privacy') tab = 'privacy';
  else if (hash === 'terminos-de-uso' || hash === 'terms') tab = 'terms';
  // If it's a structural hash like #faq or #calculadora-cafeina, keep tab as is based on path

  // Clean Pathname Match
  if (pathname === '/calculadora-horas-de-sueno') tab = 'age-calculator';
  else if (pathname === '/app-calculadora-de-sueno') tab = 'app-reviews';
  else if (pathname === '/siestas') tab = 'nap';
  else if (pathname === '/diario-sueno') tab = 'diary';
  else if (pathname === '/blog' || pathname.startsWith('/blog/')) tab = 'blog';
  else if (pathname === '/sonidos') tab = 'sounds';
  else if (pathname === '/sobre-nosotros') tab = 'about';
  else if (pathname === '/metodologia') tab = 'methodology';
  else if (pathname === '/contacto') tab = 'contact';
  else if (pathname === '/politica-privacidad') tab = 'privacy';
  else if (pathname === '/terminos-de-uso') tab = 'terms';
  else if (pathname === '/' || pathname === '/calculadora') {
    tab = 'home';
    try {
      const stored = localStorage.getItem('calc_lastTab');
      if (stored && ['home', 'age-calculator', 'nap', 'diary', 'blog', 'sounds', 'app-reviews'].includes(stored)) {
         tab = stored;
      }
    } catch(e) {}
  } else {
    // 404 Route
    tab = '404';
  }

  return tab;
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(getTabFromUrl);
  const [selectedResult, setSelectedResult] = useState<SleepCycleResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Sync with popstate & hashchange
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentTab(getTabFromUrl());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Save current tab to local storage whenever it changes (only main tabs)
  useEffect(() => {
    if (['home', 'age-calculator', 'nap', 'diary', 'blog', 'sounds', 'app-reviews'].includes(currentTab)) {
      try {
        localStorage.setItem('calc_lastTab', currentTab);
      } catch (e) {}
    }
  }, [currentTab]);

  // Dynamic metadata for client-side navigation. Article routes manage their own metadata.
  useEffect(() => {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const isArticleRoute = currentTab === 'blog' && pathname.startsWith('/blog/');

    // Article metadata is rendered statically at build time and updated by ArticlesView on client navigation.
    if (isArticleRoute) return;

    const robots = document.querySelector('meta[name="robots"]');
    if (currentTab === '404') {
      document.title = 'Página no encontrada | Calculadora de Sueño';
      robots?.setAttribute('content', 'noindex, follow');
      return;
    }

    robots?.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    const currentSeo = SEO_BY_TAB[currentTab as SiteTab] || SEO_BY_TAB.home;
    document.title = currentSeo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.desc);

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', currentSeo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', currentSeo.desc);

    const targetUrl = `${SITE_URL}${currentSeo.path === '/' ? '/' : currentSeo.path}`;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', targetUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', targetUrl);

    document.querySelector('link[rel="alternate"][hreflang="es"]')?.setAttribute('href', targetUrl);
    document.querySelector('link[rel="alternate"][hreflang="x-default"]')?.setAttribute('href', targetUrl);

    if (window.location.pathname !== currentSeo.path) {
      window.history.pushState(null, '', currentSeo.path);
    }

    if (!window.location.hash) window.scrollTo(0, 0);

    const dynamicSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: `${SITE_URL}/`
            },
            ...(currentTab !== 'home'
              ? [{
                  '@type': 'ListItem',
                  position: 2,
                  name: currentSeo.h1,
                  item: targetUrl
                }]
              : [])
          ]
        },
        {
          '@type': 'WebPage',
          '@id': targetUrl,
          url: targetUrl,
          name: currentSeo.title,
          description: currentSeo.desc,
          inLanguage: 'es',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Calculadora de Sueño',
            url: `${SITE_URL}/`
          },
          publisher: {
            '@type': 'Organization',
            name: 'Calculadora de Sueño',
            url: `${SITE_URL}/`
          }
        }
      ]
    };

    let scriptTag = document.getElementById('json-ld-app-dynamic') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-app-dynamic';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(dynamicSchema);
  }, [currentTab]);

  const handleSelectResultForVisualizer = (res: SleepCycleResult) => {
    setSelectedResult(res);
    const element = document.getElementById('visualizador-ciclos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickNavigate = (tab: string, elementId?: string) => {
    setCurrentTab(tab);
    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100'} font-sans selection:bg-indigo-500 selection:text-white`}>
      {/* PWA / Offline Notification Banner */}
      <PwaOfflineBanner />

      {/* Header Bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'caffeine') {
            setCurrentTab('home');
            setTimeout(() => {
              const el = document.getElementById('calculadora-cafeina');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else if (tab === 'cronotipo') {
            setCurrentTab('home');
            setTimeout(() => {
              const el = document.getElementById('test-cronotipo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else if (tab === 'faq') {
            setCurrentTab('home');
            setTimeout(() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Dynamic Breadcrumbs Navigation */}
        <Breadcrumbs currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <Suspense fallback={<div className="flex justify-center items-center py-32"><div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500/20 border-t-indigo-500"></div></div>}>
        {/* Tab 1: Home (Calculadora de Sueño Principal) */}
        {currentTab === 'home' && (
          <div className="space-y-12">
            {/* Quick Tools Navigation Anchor Bar */}
            <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 shadow-xl overflow-x-auto flex items-center gap-2 scrollbar-none sticky top-2 z-30">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2 shrink-0">
                Herramientas:
              </span>
              <button
                onClick={() => document.getElementById('calculadora-principal')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                ⏰ Calculadora Sueño
              </button>
              <button
                onClick={() => document.getElementById('checkin-matutino')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                🌅 Check-in Matutino
              </button>
              <button
                onClick={() => document.getElementById('evaluador-dormitorio')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                🛡️ Entorno Dormitorio
              </button>
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-extrabold border border-amber-300/40 text-xs whitespace-nowrap shadow-md transition-all"
              >
                📋 Generar Informe PDF
              </button>
              <button
                onClick={() => document.getElementById('calculadora-siestas')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                ⚡ Siestas & Power Naps
              </button>
              <button
                onClick={() => document.getElementById('visualizador-ciclos')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                📊 Fases de Sueño
              </button>
              <button
                onClick={() => document.getElementById('deuda-sueno')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                📉 Deuda de Sueño
              </button>
              <button
                onClick={() => document.getElementById('calculadora-cafeina')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-amber-700/20 hover:bg-amber-700/30 text-amber-200 border border-amber-600/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                ☕ Impacto Cafeína
              </button>
              <button
                onClick={() => document.getElementById('test-diagnostico-suno')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                🩺 Test Calidad Sueño
              </button>
              <button
                onClick={() => document.getElementById('test-cronotipo')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 border border-violet-400/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                🦁 Test Cronotipo
              </button>
              <button
                onClick={() => document.getElementById('higiene-sueno')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                📋 Higiene de Sueño
              </button>
              <button
                onClick={() => document.getElementById('reproductor-sonidos')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                🔊 Ruido Blanco
              </button>
              <button
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold whitespace-nowrap transition-colors"
              >
                📖 Preguntas Frecuentes
              </button>
            </div>

            <SleepCalculatorWidget
              onSelectResultForVisualizer={handleSelectResultForVisualizer}
            />

            {/* AdSense Non-Intrusive Banner Slot */}
            <AdBannerSlot slotType="responsive" />

            <SleepCountdownTimer />

            <MorningCheckinWidget />

            <SleepEnvironmentWidget />

            <NapCalculatorWidget />

            <SleepCycleVisualizer selectedResult={selectedResult} />

            <SleepDebtCalculator />

            <CaffeineCalculatorWidget />

            <SleepQualityQuiz />

            <ChronotypeTestWidget />

            <SleepHygieneChecklist />

            <SoundPlayerWidget />

            <SEOSection />
          </div>
        )}

        {/* Tab 2: Horas por Edad (/calculadora-horas-de-sueno) */}
        {currentTab === 'age-calculator' && (
          <AgeCalculatorView
            onSyncToMainCalculator={() => setCurrentTab('home')}
          />
        )}

        {/* Tab 3: Siestas & Power Naps */}
        {currentTab === 'nap' && (
          <div className="py-6 space-y-8">
            <NapCalculatorWidget />
            <SleepDebtCalculator />
          </div>
        )}

        {/* Tab 4: Diario de Sueño y Eficiencia */}
        {currentTab === 'diary' && (
          <div className="py-6 space-y-8">
            <SleepDiaryWidget />
          </div>
        )}

        {/* Tab 5: Reseña Apps (/app-calculadora-de-sueno) */}
        {currentTab === 'app-reviews' && <AppReviewsView />}

        {/* Tab 6: Blog & Guías */}
        {currentTab === 'blog' && <ArticlesView />}

        {/* Tab 7: Sonidos & Ruido Blanco */}
        {currentTab === 'sounds' && (
          <div className="py-6 space-y-8">
            <SoundPlayerWidget />
          </div>
        )}

        {/* Institutional & Legal Pages */}
        {currentTab === 'about' && <AboutUsView setCurrentTab={setCurrentTab} />}
        {currentTab === 'methodology' && <MethodologyView />}
        {currentTab === 'contact' && <ContactView setCurrentTab={setCurrentTab} />}
        {currentTab === 'privacy' && <PrivacyPolicyView setCurrentTab={setCurrentTab} />}
        {currentTab === 'terms' && <TermsView setCurrentTab={setCurrentTab} />}
        {currentTab === '404' && <NotFoundView />}
        </Suspense>

      </main>

      {/* Master Sleep Report Modal */}
      <SleepSummaryReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Floating Quick Navigation & Back-To-Top Button */}
      <FloatingQuickNav onNavigateTab={handleQuickNavigate} />

      {/* GDPR & Google AdSense Cookie Consent CMP Banner */}
      <CookieConsentBanner setCurrentTab={setCurrentTab} />

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
