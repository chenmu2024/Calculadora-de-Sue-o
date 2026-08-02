import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, Smartphone, BookOpen, Volume2, HelpCircle, Menu, X, Zap, BookMarked, Compass, Coffee, Info, Mail, Globe } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  isDarkMode,
  setIsDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('es-ES');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  useEffect(() => {
    // Dynamically sync HTML lang attribute and head meta canonical/og:locale
    document.documentElement.lang = selectedRegion.split('-')[0] || 'es';
    
    const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
    if (ogLocaleMeta) {
      ogLocaleMeta.setAttribute('content', selectedRegion.replace('-', '_'));
    }
  }, [selectedRegion]);

  const regions = [
    { code: 'es-ES', label: 'España (es-ES)', flag: '🇪🇸' },
    { code: 'es-MX', label: 'México (es-MX)', flag: '🇲🇽' },
    { code: 'es-AR', label: 'Argentina (es-AR)', flag: '🇦🇷' },
    { code: 'es-CO', label: 'Colombia (es-CO)', flag: '🇨🇴' },
    { code: 'es-US', label: 'EE.UU. (es-US)', flag: '🇺🇸' },
  ];

  const navItems = [
    { id: 'home', label: 'Calculadora', icon: Clock },
    { id: 'age-calculator', label: 'Horas por Edad', icon: Clock },
    { id: 'nap', label: 'Siestas Power Nap', icon: Zap },
    { id: 'caffeine', label: 'Cafeína y Sueño', icon: Coffee },
    { id: 'cronotipo', label: 'Test Cronotipo', icon: Compass },
    { id: 'diary', label: 'Diario de Sueño', icon: BookMarked },
    { id: 'app-reviews', label: 'Apps', icon: Smartphone },
    { id: 'blog', label: 'Guías', icon: BookOpen },
    { id: 'sounds', label: 'Ruido Blanco', icon: Volume2 },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'about', label: 'Sobre Nosotros', icon: Info },
    { id: 'contact', label: 'Contacto', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
            tabIndex={0}
            role="button"
            aria-label="Calculadora de Sueño - Volver al Inicio"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Moon className="w-5 h-5 fill-current text-amber-200" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                Calculadora de Sueño
              </span>
              <span className="hidden sm:block text-xs text-indigo-400 font-medium">
                xn--calculadoradesueo-uxb.org
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentTab === item.id || (currentTab === 'home' && ['caffeine', 'cronotipo', 'faq'].includes(item.id));
              
              let href = '/';
              if (item.id === 'age-calculator') href = '/calculadora-horas-de-sueno';
              else if (item.id === 'nap') href = '/siestas';
              else if (item.id === 'diary') href = '/diario-sueno';
              else if (item.id === 'app-reviews') href = '/app-calculadora-de-sueno';
              else if (item.id === 'blog') href = '/blog';
              else if (item.id === 'sounds') href = '/sonidos';
              else if (item.id === 'about') href = '/sobre-nosotros';
              else if (item.id === 'contact') href = '/contacto';
              else if (item.id === 'caffeine') href = '/#calculadora-cafeina';
              else if (item.id === 'cronotipo') href = '/#test-cronotipo';
              else if (item.id === 'faq') href = '/#faq';

              return (
                <a
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!href.includes('#')) {
                      window.history.pushState(null, '', href);
                    }
                    setCurrentTab(item.id);
                  }}
                  aria-label={item.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* International Region Switcher */}
            <div className="relative">
              <button
                id="btn-region-select"
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                title="Seleccionar Región e Idioma (Hreflang)"
                aria-label="Seleccionar Región de habla hispana"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>{regions.find(r => r.code === selectedRegion)?.flag || '🇪🇸'}</span>
                <span className="hidden sm:inline">{selectedRegion.split('-')[1]}</span>
              </button>

              {showRegionDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-indigo-400 uppercase tracking-wider border-b border-slate-800">
                    Región (Google SEO)
                  </div>
                  {regions.map((reg) => (
                    <button
                      key={reg.code}
                      onClick={() => {
                        setSelectedRegion(reg.code);
                        setShowRegionDropdown(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800 transition-colors ${
                        selectedRegion === reg.code ? 'text-amber-300 font-bold bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <span>{reg.flag}</span>
                      <span>{reg.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Cambiar tema"
              aria-label="Cambiar entre modo claro y oscuro"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-indigo-400" />}
            </button>

            {/* Mobile Hamburger */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-4 space-y-1" role="navigation" aria-label="Menú móvil">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id || (currentTab === 'home' && ['caffeine', 'cronotipo', 'faq'].includes(item.id));
            
            let href = '/';
            if (item.id === 'age-calculator') href = '/calculadora-horas-de-sueno';
            else if (item.id === 'nap') href = '/siestas';
            else if (item.id === 'diary') href = '/diario-sueno';
            else if (item.id === 'app-reviews') href = '/app-calculadora-de-sueno';
            else if (item.id === 'blog') href = '/blog';
            else if (item.id === 'sounds') href = '/sonidos';
            else if (item.id === 'about') href = '/sobre-nosotros';
            else if (item.id === 'contact') href = '/contacto';
            else if (item.id === 'caffeine') href = '/#calculadora-cafeina';
            else if (item.id === 'cronotipo') href = '/#test-cronotipo';
            else if (item.id === 'faq') href = '/#faq';

            return (
              <a
                key={item.id}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  if (!href.includes('#')) {
                    window.history.pushState(null, '', href);
                  }
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-400" />
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

