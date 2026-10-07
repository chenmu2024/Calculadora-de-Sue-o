import React, { useState } from 'react';
import { Moon, Sun, Clock, Smartphone, BookOpen, Volume2, HelpCircle, Menu, X, Zap, BookMarked, Compass, Coffee, Info, Mail } from 'lucide-react';

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
                Herramientas de sueño en español
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

