import React, { useEffect } from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentTab, setCurrentTab }) => {
  const getTabInfo = () => {
    switch (currentTab) {
      case 'home':
        return { category: 'Calculadoras', name: 'Calculadora Principal de Sueño' };
      case 'chronotype':
        return { category: 'Diagnóstico', name: 'Test de Cronotipo (León, Oso, Lobo, Delfín)' };
      case 'caffeine':
        return { category: 'Herramientas', name: 'Calculadora de Cafeína y Melatonina' };
      case 'diary':
        return { category: 'Salud TCC-I', name: 'Diario de Sueño y Eficiencia' };
      case 'blog':
        return { category: 'Educación', name: 'Guías de Higiene de Sueño y Cronobiología' };
      case 'sounds':
        return { category: 'Herramientas', name: 'Generador de Ruido Blanco y Sonidos' };
      case 'about':
        return { category: 'Institucional', name: 'Sobre Nosotros' };
      case 'contact':
        return { category: 'Institucional', name: 'Contacto y Soporte' };
      case 'privacy':
        return { category: 'Legal', name: 'Política de Privacidad' };
      case 'terms':
        return { category: 'Legal', name: 'Términos y Condiciones de Uso' };
      default:
        return { category: 'Sección', name: 'Calculadora de Sueño' };
    }
  };

  const info = getTabInfo();

  useEffect(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Inicio',
          'item': 'https://calculadoradesueno.org/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': info.category,
          'item': `https://calculadoradesueno.org/#${currentTab}`
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': info.name,
          'item': `https://calculadoradesueno.org/#${currentTab}`
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumbs-json-ld';
    script.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('breadcrumbs-json-ld');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, [currentTab, info]);

  return (
    <nav aria-label="Navegación de migas de pan" className="mb-6 pt-2">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2.5">
        <li className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-1 hover:text-white transition-colors text-slate-300 font-medium"
            aria-label="Ir a Inicio"
          >
            <Home className="w-3.5 h-3.5 text-amber-300" />
            <span>Inicio</span>
          </button>
        </li>

        <li className="flex items-center gap-1.5 text-slate-600">
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-400 font-semibold">{info.category}</span>
        </li>

        <li className="flex items-center gap-1.5 text-slate-600">
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-300 font-bold truncate max-w-[200px] sm:max-w-none">
            {info.name}
          </span>
        </li>
      </ol>
    </nav>
  );
};
