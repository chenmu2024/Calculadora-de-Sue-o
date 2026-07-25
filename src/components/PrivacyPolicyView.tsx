import React from 'react';
import { ShieldCheck, Lock, Eye, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

interface PrivacyPolicyViewProps {
  setCurrentTab: (tab: string) => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ setCurrentTab }) => {
  return (
    <div id="politica-privacidad" className="space-y-10 py-6 max-w-5xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Protección de Datos y Cumplimiento RGPD / CCPA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Última actualización: <strong>23 de Julio de 2026</strong> | Dominio: <strong>calculadoradesueño.org</strong>
        </p>
      </div>

      {/* Main Privacy Guarantee Badge */}
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Compromiso de Privacidad por Diseño (Privacy by Design)</h2>
            <p className="text-xs text-slate-400">Tus datos fisiológicos y horarios personales son tuyos y nunca salen de tu dispositivo.</p>
          </div>
        </div>

        <p>
          En <strong>calculadoradesueño.org</strong> (denominación técnica de dominio <em>xn--calculadoradesueo-uxb.org</em>), respetamos profundamente tu intimidad. Toda la suite de herramientas (incluyendo el diario de sueño TCC-I, el calculador de cafeína, el test de cronotipo y la calculadora de ciclos) procesa la información de forma exclusivamente local en tu propio navegador web mediante JavaScript y almacenamiento web local (HTML5 <code>localStorage</code>).
        </p>
      </div>

      {/* Structured Sections */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>1. Responsable del Tratamiento de Datos</span>
          </h2>
          <p>
            El responsable del tratamiento de los datos en esta web es el equipo gestor de <strong>calculadoradesueño.org</strong>. Puedes contactar con nuestro Delegado de Protección de Datos (DPD) a través del correo electrónico: <a href="mailto:privacidad@calculadoradesueño.org" className="text-indigo-400 hover:underline font-mono">privacidad@calculadoradesueño.org</a>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>2. Datos recopilados y Finalidad</span>
          </h2>
          <p>
            Dividimos la interacción con nuestro portal en dos categorías:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
            <li>
              <strong>Cálculos y Registros de Sueño (Diario, Cafeína, Edad):</strong> Se procesan de forma efímera en la memoria RAM y en el almacenamiento local de tu navegador. <em>No se transmiten a ningún servidor externo.</em>
            </li>
            <li>
              <strong>Formulario de Contacto:</strong> Si decides contactarnos voluntariamente, recopilamos tu nombre, correo electrónico y mensaje para atender tu consulta. Estos datos nunca se ceden a terceros.
            </li>
            <li>
              <strong>Métricas Anónimas de Tráfico:</strong> Utilizadas exclusivamente con fines estadísticos para optimizar el rendimiento técnico del sitio web, sin identificación individual.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>3. Uso de Cookies, Google AdSense y Almacenamiento Local</span>
          </h2>
          <p>
            Utilizamos almacenamiento local (<code>localStorage</code>) para guardar tus registros del diario TCC-I y tus preferencias de interfaz sin enviar información a servidores externos.
          </p>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-white">Nombre de Clave</span>
              <span className="font-bold text-white">Función</span>
              <span className="font-bold text-white">Duración</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-indigo-300">sleep_diary_entries</span>
              <span>Guardar historial del Diario de Sueño TCC-I</span>
              <span>Persistente en navegador</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-mono text-indigo-300">cookie_consent_preferences</span>
              <span>Recordar tus preferencias de cookies y anuncios</span>
              <span>12 Meses</span>
            </div>
          </div>

          {/* AdSense Clause Requirement */}
          <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 space-y-2 text-xs text-slate-300">
            <h3 className="font-bold text-indigo-200 text-sm">Política de Publicidad de Google AdSense y Galletas DART</h3>
            <ul className="list-disc list-inside space-y-1.5 pl-1 text-slate-300">
              <li>
                Proveedores de terceros, incluido <strong>Google</strong>, utilizan cookies para mostrar anuncios basados en las visitas anteriores del usuario a este sitio web o a otros sitios web.
              </li>
              <li>
                El uso de cookies de publicidad por parte de Google le permite a él y a sus socios mostrar anuncios a los usuarios en función de sus visitas a sus sitios y/o a otros sitios en Internet.
              </li>
              <li>
                Los usuarios pueden inhabilitar la publicidad personalizada dirigiéndose a la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-bold">Configuración de anuncios de Google</a>.
              </li>
              <li>
                Alternativamente, puedes inhabilitar el uso de cookies de un proveedor de terceros para la publicidad personalizada visitando <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline font-bold">www.aboutads.info</a>.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>4. Derechos del Usuario (Derechos ARCO / RGPD)</span>
          </h2>
          <p>
            De acuerdo con el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y la LOPDGDD, tienes derecho a:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
            <li>Acceder a los datos personales que tengamos sobre ti (ej. mensajes de contacto sent).</li>
            <li>Solicitar la rectificación o supresión inmediata de los mismos.</li>
            <li>Oponerte al tratamiento o solicitar la limitación de su procesamiento.</li>
          </ul>
          <p className="pt-1">
            Para ejercer cualquiera de estos derechos, envía un correo formal a <a href="mailto:privacidad@calculadoradesueño.org" className="text-indigo-400 hover:underline font-mono">privacidad@calculadoradesueño.org</a>.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white text-indigo-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>5. Enlaces a Sitios de Terceros</span>
          </h2>
          <p>
            Nuestro sitio web puede contener enlaces a publicaciones médicas de referencia (como Pubmed, AASM, NSF) o aplicaciones recomendadas. No nos hacemos responsables del contenido o las políticas de privacidad de sitios externos.
          </p>
        </section>

      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentTab('terms')}
          className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline"
        >
          <span>Ver Términos y Condiciones de Uso</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
