import React from 'react';
import { Home, AlertCircle } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertCircle className="w-20 h-20 text-indigo-500 mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">404 - Página No Encontrada</h1>
      <p className="text-lg text-slate-400 max-w-2xl mb-8">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <a 
        href="/"
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
      >
        <Home className="w-5 h-5" />
        <span>Volver a la Portada</span>
      </a>
    </div>
  );
};
