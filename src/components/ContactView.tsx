import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, ShieldCheck, Clock, MapPin, HelpCircle, ArrowRight } from 'lucide-react';

interface ContactViewProps {
  setCurrentTab: (tab: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ setCurrentTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Consulta General',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      alert('Por favor, completa todos los campos requeridos y acepta la política de privacidad.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Store mock lead locally
      try {
        const saved = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        saved.push({ ...formData, date: new Date().toISOString() });
        localStorage.setItem('contact_submissions', JSON.stringify(saved));
      } catch (e) {}
    }, 800);
  };

  return (
    <div id="contacto" className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>Atención al Usuario y Colaboraciones</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Contacto - Calculadora de Sueño
        </h1>
        <p className="text-slate-300 text-base leading-relaxed">
          ¿Tienes preguntas, sugerencias de mejora o deseas colaborar con <strong>calculadoradesueño.org</strong>? Estamos a tu disposición.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Direct Info & Channels */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>Canales Directos</span>
            </h2>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Correo Electrónico Principal:</span>
                <a 
                  href="mailto:contacto@calculadoradesueño.org" 
                  className="text-indigo-400 hover:underline font-mono font-bold block text-sm"
                >
                  contacto@calculadoradesueño.org
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block">Soporte Técnico y SEO:</span>
                <a 
                  href="mailto:soporte@calculadoradesueño.org" 
                  className="text-slate-300 hover:underline font-mono block text-xs"
                >
                  soporte@calculadoradesueño.org
                </a>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  Tiempo de Respuesta:
                </span>
                <p className="text-slate-300">Respondemos a todas las consultas en menos de 24 a 48 horas laborables.</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  Sede y Cobertura:
                </span>
                <p className="text-slate-300">Madrid, España | Servicio Digital Global en Español.</p>
              </div>
            </div>
          </div>

          {/* FAQ Shortcut Box */}
          <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>¿Respuesta Rápida?</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consulta nuestro Centro de Preguntas Frecuentes para resolver dudas instantáneas sobre ciclos de 90 minutos, cafeína y cronotipos.
            </p>
            <button
              onClick={() => {
                setCurrentTab('home');
                setTimeout(() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Ir al Centro FAQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:col-span-2 space-y-6">
          <h2 className="text-xl font-extrabold text-white">
            Formulario de Contacto
          </h2>

          {submitted ? (
            <div className="bg-emerald-950/80 border border-emerald-800 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600/30 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                Hemos recibido tu solicitud correctamente. Nuestro equipo revisará tu mensaje y te responderá al correo <strong>{formData.email}</strong> a la brevedad.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Consulta General', message: '', consent: false });
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-300">
                    Nombre Completo <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    aria-label="Nombre Completo"
                    type="text"
                    required
                    placeholder="Ej. María García"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-300">
                    Correo Electrónico <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    aria-label="Correo Electrónico"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-bold text-slate-300">
                  Asunto de la Consulta
                </label>
                <select
                  id="contact-subject"
                  aria-label="Asunto de la consulta"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Consulta General">Consulta General sobre el Sueño</option>
                  <option value="Sugerencia o Feedback">Sugerencia o Feedback de la Calculadora</option>
                  <option value="Colaboración Médica">Colaboración Médica o Académica</option>
                  <option value="Prensa y Medios">Prensa, Medios o Citación</option>
                  <option value="Reporte de Error">Reporte de Error Técnico</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-300">
                  Mensaje <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  aria-label="Mensaje"
                  required
                  rows={5}
                  placeholder="Escribe aquí tu consulta o comentario detallado..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  aria-label="Acepto la política de privacidad"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="consent" className="text-[11px] text-slate-400 leading-snug">
                  He leído y acepto la <button type="button" onClick={() => setCurrentTab('privacy')} className="text-indigo-400 hover:underline">Política de Privacidad</button>. Entiendo que mis datos solo se utilizarán para responder a esta consulta.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Enviando mensaje...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensaje de Contacto</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
