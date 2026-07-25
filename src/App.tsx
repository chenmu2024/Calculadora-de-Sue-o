import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SleepCalculatorWidget } from './components/SleepCalculatorWidget';
import { SleepCycleVisualizer } from './components/SleepCycleVisualizer';
import { SleepDebtCalculator } from './components/SleepDebtCalculator';
import { SoundPlayerWidget } from './components/SoundPlayerWidget';
import { AgeCalculatorView } from './components/AgeCalculatorView';
import { AppReviewsView } from './components/AppReviewsView';
import { ArticlesView } from './components/ArticlesView';
import { SEOSection } from './components/SEOSection';
import { Footer } from './components/Footer';
import { NapCalculatorWidget } from './components/NapCalculatorWidget';
import { SleepDiaryWidget } from './components/SleepDiaryWidget';
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
import { AboutUsView } from './components/AboutUsView';
import { ContactView } from './components/ContactView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { TermsView } from './components/TermsView';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { AdBannerSlot } from './components/AdBannerSlot';
import { SleepCycleResult } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedResult, setSelectedResult] = useState<SleepCycleResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Dynamic Document Meta Engine (Title, Description, Canonical, OG, Path Routing & Schema)
  useEffect(() => {
    const seoData: { [key: string]: { title: string; desc: string; path: string } } = {
      home: {
        title: 'Calculadora de Sueño | Ciclos de 90 Minutos',
        desc: 'Calculadora de ciclos de sueño de 90 minutos. Descubre tu hora ideal para despertar con energía, calcula tu descanso y test de cronotipo.',
        path: '/'
      },
      'age-calculator': {
        title: 'Horas de Sueño por Edad - Calculadora Científica Recomendada',
        desc: 'Descubre cuántas horas de sueño necesitas según tu edad con la tabla oficial de la National Sleep Foundation. Recomendaciones de 0 a 65+ años.',
        path: '/calculadora-horas-de-sueno'
      },
      nap: {
        title: 'Calculadora de Siestas y Power Naps - Evita la Inercia del Sueño',
        desc: 'Calcula el tiempo ideal para tu siesta de 20 o 90 minutos. Evita despertar aturdido y recarga energía al máximo sin alterar tu sueño nocturno.',
        path: '/siestas'
      },
      diary: {
        title: 'Diario de Sueño TCC-I - Calcula tu Eficiencia de Sueño Real',
        desc: 'Herramienta de Registro y Diario de Sueño para Terapia Cognitivo Conductual del Insomnio (TCC-I). Mide tu eficiencia de sueño y genera informes para médicos.',
        path: '/diario-sueno'
      },
      'app-reviews': {
        title: 'Las Mejores Apps de Sueño Comparativa - Adidas Runtastic y Alternativas',
        desc: 'Análisis detallado y comparativa de las mejores aplicaciones para monitorizar el sueño en 2026: Adidas Runtastic Sleep Better, Sleep Cycle y calculadores online.',
        path: '/app-calculadora-de-sueno'
      },
      blog: {
        title: 'Guías de Higiene del Sueño y Cronobiología - Artículos Médicos',
        desc: 'Artículos científicos sobre insomnio, apnea del sueño, ritmos circadianos, cafeína y cronotipo revisados por neurólogos y especialistas en medicina del sueño.',
        path: '/blog'
      },
      sounds: {
        title: 'Reproductor de Ruido Blanco, Rosa y Marrón para Dormir Mejor',
        desc: 'Generador y reproductor de sonido relajante para inducir el sueño. Escucha ruido blanco, lluvia, olas del mar y ruido rosa sin anuncios.',
        path: '/sonidos'
      },
      about: {
        title: 'Sobre Nosotros - Misión y Rigor Científico | Calculadora de Sueño',
        desc: 'Conoce al equipo de cronobiología y médicos especialistas detrás de CalculadoraDeSueño.es. Compromiso con la salud circadiana y la divulgación rigurosa.',
        path: '/sobre-nosotros'
      },
      contact: {
        title: 'Contacto y Soporte - Calculadora de Sueño España',
        desc: 'Ponte en contacto con nuestro equipo médico y técnico para consultas, sugerencias de funcionalidades o reportes de usabilidad.',
        path: '/contacto'
      },
      privacy: {
        title: 'Política de Privacidad y Proteccion de Datos | calculadoradesueño.org',
        desc: 'Garantía de privacidad total. Todos tus datos del diario de sueño y cálculos se guardan 100% de forma local en tu dispositivo.',
        path: '/politica-privacidad'
      },
      terms: {
        title: 'Términos y Condiciones de Uso | calculadoradesueño.org',
        desc: 'Términos de servicio de la aplicación web Calculadora de Sueño. Información médica de carácter divulgativo e informativo.',
        path: '/terminos-de-uso'
      }
    };

    const currentSeo = seoData[currentTab] || seoData['home'];

    // Update Page Title
    document.title = currentSeo.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentSeo.desc);

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.desc);

    // Update Canonical & OG URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const baseUrl = 'https://calculadoradesueno.org';
    const targetUrl = currentSeo.path === '/' ? `${baseUrl}/` : `${baseUrl}${currentSeo.path}`;
    canonical.setAttribute('href', targetUrl);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', targetUrl);

    // Clean Path Routing without #
    const targetPath = currentSeo.path;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }

    // Dynamic Breadcrumb & WebPage Schema JSON-LD Injection for Google Rich Snippets
    const dynamicSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Inicio',
              'item': `${baseUrl}/`
            },
            ...(currentTab !== 'home' ? [
              {
                '@type': 'ListItem',
                'position': 2,
                'name': currentSeo.title.split('|')[0].trim(),
                'item': targetUrl
              }
            ] : [])
          ]
        },
        {
          '@type': 'MedicalWebPage',
          '@id': targetUrl,
          'url': targetUrl,
          'name': currentSeo.title,
          'description': currentSeo.desc,
          'inLanguage': 'es-ES',
          'reviewedBy': {
            '@type': 'Person',
            'name': 'Dra. Elena Gómez',
            'jobTitle': 'Especialista en Neurofisiología Clínica y Medicina del Sueño',
            'medicalSpecialty': 'SleepMedicine'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Calculadora de Sueño España',
            'url': `${baseUrl}/`
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

  // Sync with window.location.pathname & hash (for backward compatibility)
  useEffect(() => {
    const handleUrlChange = () => {
      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      const hash = window.location.hash.replace('#', '');

      // Legacy Hash Migration
      if (hash === 'calculadora-horas-de-sueno') { setCurrentTab('age-calculator'); return; }
      if (hash === 'app-calculadora-de-sueno') { setCurrentTab('app-reviews'); return; }
      if (hash === 'siestas' || hash === 'calculadora-siestas') { setCurrentTab('nap'); return; }
      if (hash === 'diario-sueno' || hash === 'diario') { setCurrentTab('diary'); return; }
      if (hash === 'blog' || hash.includes('como-calcular') || hash.includes('insomnio')) { setCurrentTab('blog'); return; }
      if (hash === 'sonidos' || hash === 'ruido-blanco') { setCurrentTab('sounds'); return; }
      if (hash === 'sobre-nosotros' || hash === 'about') { setCurrentTab('about'); return; }
      if (hash === 'contacto' || hash === 'contact') { setCurrentTab('contact'); return; }
      if (hash === 'politica-privacidad' || hash === 'privacy') { setCurrentTab('privacy'); return; }
      if (hash === 'terminos-de-uso' || hash === 'terms') { setCurrentTab('terms'); return; }

      // Clean Pathname Match
      if (pathname === '/calculadora-horas-de-sueno') setCurrentTab('age-calculator');
      else if (pathname === '/app-calculadora-de-sueno') setCurrentTab('app-reviews');
      else if (pathname === '/siestas') setCurrentTab('nap');
      else if (pathname === '/diario-sueno') setCurrentTab('diary');
      else if (pathname === '/blog') setCurrentTab('blog');
      else if (pathname === '/sonidos') setCurrentTab('sounds');
      else if (pathname === '/sobre-nosotros') setCurrentTab('about');
      else if (pathname === '/contacto') setCurrentTab('contact');
      else if (pathname === '/politica-privacidad') setCurrentTab('privacy');
      else if (pathname === '/terminos-de-uso') setCurrentTab('terms');
      else if (pathname === '/' || pathname === '/calculadora') setCurrentTab('home');
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

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
        {currentTab === 'contact' && <ContactView setCurrentTab={setCurrentTab} />}
        {currentTab === 'privacy' && <PrivacyPolicyView setCurrentTab={setCurrentTab} />}
        {currentTab === 'terms' && <TermsView setCurrentTab={setCurrentTab} />}

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
